function runSimu(){
    $("#run_simu_btn").html("実行中...").prop("disabled", true);

    var str = document.getElementById("stdout").innerHTML;
    var result = str.split(',');
    //document.getElementById("simulator").innerHTML = result.length;
    var count = 0;
    var countup = function(){
        var i = count++
    //console.log(i);
    document.getElementById("simulator").innerHTML = result[i] +" ℃";
    }
    var id = setInterval(function(){
    countup();
    if(count > result.length-1){
      clearInterval(id);//idをclearIntervalで指定している
        }
    }, 1000);
    $("#run_simu_btn").html("結果から<br>シミュレーション").prop("disabled", false);

    /*
    for(var i=0;i<result.length;i++){
    var msg = result[n];
    document.getElementById("simulator").innerHTML = msg;
    }

    if(oeeresult==null){
        alert("Simulation Failed: " + "プログラムを実行してください");
        $("#run_simu_btn").text("実行").prop("disabled", false);
    }
*/

}