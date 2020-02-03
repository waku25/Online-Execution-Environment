var aceEditor = ace.edit("source_code");
/* Set ACE Editor options */
aceEditor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    enableEmmet: true,
});

$("#run_oee_btn").on("click", function (event) {
    runCode();
});

/*aceEditor.commands.addCommand({
    bindKey: { 
        win: "Ctrl-Enter", 
        mac: "Ctrl-Enter"
    },
    exec: runCode,
});*/

function setEditorLanguage(language) {
    /*var languageToMode = {
        // 原語(表示名): 原語モード(AceEditor)
        ruby: "ruby",
        c: "c_cpp",
        c_plus:"c_cpp",
    };
    var mode = languageToMode[language];*/
    //aceEditor.getSession().setMode("ace/mode/" + mode);
    aceEditor.getSession().setMode("ace/mode/c_cpp");
    //aceEditor.setTheme("ace/theme/monokai");
    aceEditor.setFontSize(20);
    aceEditor.setValue("#include <stdio.h>\n"+
    "int main(){\n"+
    "    float water_amount = 700;   // Amount of water [Unit : mL]\n"+
    "    float water_temp = 20.0;    // Default temp\n"+
    "    float water_measure = 0;\n"+
    "    float heater_power = 1000; //Use erectric power by heater [Unit : W]\n"+
    "    float water_specific = 4.184;   // !!NOT CHANGE!! Specific heat of water [Unit : J/g*K (Joule/gram*kelvin)]\n"+
    "    //bool water_bool = false;    // Whether there is water\n"+
    "    for(int t = 1; water_measure<100.0; t++){\n"+
    "        water_measure = heater_power*t/(water_amount*water_specific)+water_temp;\n"+
    "        if(t%5==1 ||water_measure>=100.0){\n"+
    "            if(water_measure>=100.0){\n"+
    "                water_measure = 100.0;\n"+
    "                printf(\"%.3f\",water_measure);\n"+
    "            }else{\n"+
    "                printf(\"%.3f,\",water_measure);\n"+
    "            }\n"+
    "         }\n"+
    "     }\n"+
    "}\n");

}
$("#language").val("c");
setEditorLanguage("c_cpp");
$("#language").on("change", function (event) {
    setEditorLanguage(this.value);
});
