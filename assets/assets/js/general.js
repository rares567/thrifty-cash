/*Various Sizes*/

document.body.style.height = window.innerHeight + "px";
document.getElementById('main_body').style.height = window.innerHeight*0.9 + "px";

var ico = document.getElementsByClassName('ico');
var icoHeight = window.innerHeight*0.065;
var marginSize = (screen.width - 3*icoHeight)/6 - 7; /*for settings icon (screen.width - 4*icoHeight)/8 - 7*/

for (var i = 0; i < 3; i++) {
    ico[i].style.height = icoHeight + "px";
    ico[i].style.top = window.innerHeight*0.0175 + "px";
    ico[i].style.marginLeft = marginSize + "px";
    ico[i].style.marginRight = marginSize + "px";
}
document.getElementsByTagName('nav')[0].style.height = window.innerHeight*0.1 + "px";
document.getElementById('calc_list').style.width = screen.width*0.5 + "px";


/*Font Size*/

var width = window.innerWidth;
var height = window.innerHeight;
var fontSize = ((height/1200)+(width/540))*12;
document.body.style.fontSize = fontSize + "px";

/*Calculator List*/

var calculator = document.getElementById('calc_ico');
var calculatorList = document.getElementById('calc_list');
var mainBody = document.getElementById('main_body');
calculator.addEventListener('click', function() {
    calculatorList.style.display = "block";
});
mainBody.addEventListener('click', function() {
    calculatorList.style.display = "none";
});

/*Icon Click*/

document.getElementById('note_ico').addEventListener('click', function() {
    window.location.href = "tipsTricks.html";
});
document.getElementById('manager_ico').addEventListener('click', function() {
    window.location.href = "moneyManager.html";
});
/*document.getElementById('profile_ico').addEventListener('click', function() {
    window.location.href = "settings.html";
});*/