function changeText(id, text){
    var display = document.getElementById(id);
    display.innerHTML = "&nbsp;";
    display.innerHTML = text;
}

function changeBack(id){
    var display = document.getElementById(id);
    display.innerHTML = "&nbsp;";
}