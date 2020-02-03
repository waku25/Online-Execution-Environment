var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var child_process = require('child_process');
var fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/run', function (req, res) {
  var language = req.body.language;
  var source_code = req.body.source_code;
  var input = req.body.input;

  var filename, execCmd;
  if (language === 'ruby') {
    filename = 'main.rb';
    execCmd = 'ruby main.rb';
  } else if (language === 'c') {
    filename = 'Main.cpp';
    execCmd = 'gcc -Wall -o Main Main.cpp && ./Main';
  }else if (language === 'c_plus') {
    filename = 'Main.cpp';
    execCmd = 'g++ -Wall -o Main Main.cpp && ./Main';
  }


  // Create a container
  var dockerCmd =
    'docker create -i ' +
    '--net none ' + //Don't use internet
    '--memory 512m --memory-swap 512m ' + //memory limit
    '--ulimit nproc=10:10 ' +
    '--ulimit fsize=1000000 ' + //Filesize limit 
    '-w /workspase ' + //Docker workspace
    'ubuntu-dev ' + //Name of using Docker image
    '/usr/bin/time -q -f "%e" -o /time.txt ' + //Measure execution time 
    'timeout 60 ' + // timeout 3 sec
    'su nobody -s /bin/bash -c "' + //Resist root
    execCmd + '"'; 
  console.log("Running: " + dockerCmd);
  var containerId = child_process.execSync(dockerCmd).toString().substr(0, 12);
  console.log("ContainerId: " + containerId);


  // Copy the user code to the Container
  child_process.execSync('rm -rf /tmp/workspase && mkdir /tmp/workspase && chmod 777 /tmp/workspase');
  fs.writeFileSync('/tmp/workspase/' + filename, source_code);
  //console.log("Filename: "+ filename + "\n" + source_code +"\n"); // For File Check
  dockerCmd = "docker cp /tmp/workspase " + containerId + ":/";
  console.log("Running: " + dockerCmd);
  child_process.execSync(dockerCmd);

  //Start container
  dockerCmd = "docker start -i " + containerId;
  console.log("Running: " + dockerCmd);
  var child = child_process.exec(dockerCmd, {}, function(error, stdout, stderr) {
    // Copy time command result
    dockerCmd = "docker cp " + containerId + ":/time.txt /tmp/time.txt";
    console.log("Running: " + dockerCmd);
    child_process.execSync(dockerCmd);
    var time = fs.readFileSync("/tmp/time.txt").toString();

    // Remove the container
    dockerCmd = "docker rm -f " + containerId;
    console.log("Runnning: " + dockerCmd);
    child_process.execSync(dockerCmd);

    console.log("Result: ", error, stdout, stderr);
    res.send({
      stdout: stdout,
      stderr: stderr,
      exit_code: error && error.code || 0,
      time: time,
    });
  });
  child.stdin.write(input);
  child.stdin.end();
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});


