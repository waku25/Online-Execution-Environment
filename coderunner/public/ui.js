var aceEditor = ace.edit("source_code");
/* Set ACE Editor options */
aceEditor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutoCompletion: true,
    enableSnippets: true,
    enableEmmet: true,
});

$("#run_button").on("click", function (event) {
    runCode();
});

aceEditor.commands.addCommand({
    bindKey: { win: "Ctrl-Enter", mac: "Ctrl-Enter" },
    exec: runCode,
});

function setEditorLanguage(language) {
    var languageToMode = {
        // 原語(表示名): 原語モード(AceEditor)
        ruby: "ruby",
        c: "c_cpp",
        c_plus:"c_cpp",
    };
    var mode = languageToMode[language];
    //aceEditor.getSession().setMode("ace/mode/" + mode);
    aceEditor.getSession().setMode("ace/mode/c_cpp");
    //aceEditor.setTheme("ace/theme/monokai");
    aceEditor.setFontSize(20);
}
$("#language").val("c");
setEditorLanguage("c_cpp");
$("#language").on("change", function (event) {
    setEditorLanguage(this.value);
});
