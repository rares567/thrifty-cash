/*Various sizes*/

document.body.style.height = window.innerHeight + "px";
document.getElementById('main_body').style.height = window.innerHeight*0.89 + "px";
var ico = document.getElementsByClassName('ico');
var icoHeight = window.innerHeight*0.065;
var marginSize = (screen.width - 4*icoHeight)/8 - 7;
for (var i = 0; i < 4; i++) {
    document.getElementsByClassName('ico')[i].style.height = icoHeight + "px";
    document.getElementsByClassName('ico')[i].style.top = window.innerHeight*0.0175 + "px";
    ico[i].style.marginLeft = marginSize + "px";
    ico[i].style.marginRight = marginSize + "px";
}
document.getElementsByTagName('nav')[0].style.height = window.innerHeight*0.1 + "px";
document.getElementById('calc_list').style.width = screen.width*0.5 + "px";

var width = window.innerWidth;
var height = window.innerHeight;
var fontSize = ((height/1200)+(width/540))*12;
document.body.style.fontSize = fontSize + "px";

document.getElementById('file').style.left = document.getElementById('load').getBoundingClientRect().left - screen.width*0.1 + "px";
document.getElementById('file').style.fontSize = document.getElementById('load').offsetHeight*0.8 + "px";

/*save data*/

var stg = window.localStorage;

function saveFile (content, filename, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
  
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();

	URL.revokeObjectURL(a.href);
}

document.getElementById('save').addEventListener('click', function () {
    var stgArr = [];
    for (i = 0; i < stg.length; i++) {
        var key = stg.key(i);
        var value = stg.getItem(key);
        stgArr[i] = key + "|" +  value;
    }
    saveFile(stgArr, 'ThriftyCashData.txt', 'text/plain');
});

/*simulates the active event of button*/
var loadBtn = document.getElementById('load');
document.getElementById('file').addEventListener('touchstart', function() {
    loadBtn.style.backgroundColor = 'white';
    loadBtn.style.color = 'rgb(119, 0, 167)';
});
document.getElementById('file').addEventListener('touchend', function() {
    loadBtn.style.backgroundColor = 'rgb(119, 0, 167)';
    loadBtn.style.color = 'white';
});

/*log in form
document.getElementById('remember').style.height = fontSize + "px";
document.getElementById('remember').style.width = fontSize + "px";

var dist = document.getElementById('pass').getBoundingClientRect().left - document.getElementById('user_label').getBoundingClientRect().right;
document.getElementById('user').style.left = dist + "px";*/