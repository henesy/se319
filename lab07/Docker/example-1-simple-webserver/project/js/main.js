var index = 0;
function change() {
    var colors = ["red", "blue", "black"];
    var element = document.getElementById("message");
    element.style.color = colors[index++];
    if (index >= 3) index = 0;
}
