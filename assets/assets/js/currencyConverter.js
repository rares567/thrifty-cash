/*Various Sizes*/

document.getElementById('frame').style.width = screen.width*0.7 + "px";
document.body.style.height = window.innerHeight*0.97 + "px";
document.getElementById('main_body').style.height = window.innerHeight*0.89 + "px";
document.getElementsByClassName('curr_amt')[0].style.width = screen.width*0.39 - 6 + "px";
document.getElementsByClassName('curr_amt')[1].style.width = screen.width*0.39 - 6 + "px";
document.getElementsByClassName('curr_type')[0].style.width = screen.width*0.26 - 6 + "px";
document.getElementsByClassName('curr_type')[1].style.width = screen.width*0.26 - 6 + "px";
document.getElementsByTagName('nav')[0].style.height = window.innerHeight*0.1 + "px";

var ico = document.getElementsByClassName('ico');
var icoHeight = window.innerHeight*0.065;
var marginSize = (screen.width - 3*icoHeight)/6 - 7;
for (var i = 0; i < 3; i++) {
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

/*Currency Dropdown*/

var currAmt = document.getElementsByClassName('curr_amt');
var currType = document.getElementsByClassName('curr_type');
currType[0].style.backgroundSize = window.innerHeight*0.02 + "px";
currType[1].style.backgroundSize = window.innerHeight*0.02 + "px";
if (window.innerHeight <= 900) {
    currAmt[0].style.borderWidth = '2px';
    currType[0].style.borderWidth = '2px';
    currAmt[1].style.borderWidth = '2px';
    currType[1].style.borderWidth = '2px';
}

currType[0].addEventListener('change', function() {
    var value = currType[0].options[currType[0].selectedIndex].value;
    var hidOpt = document.createElement('option');
    currType[0].appendChild(hidOpt);
    hidOpt.innerHTML = value;
    hidOpt.selected = 'selected';
    hidOpt.style.display = 'none';
});
currType[1].addEventListener('change', function() {
    var value = currType[1].options[currType[1].selectedIndex].value;
    var hidOpt = document.createElement('option');
    currType[1].appendChild(hidOpt);
    hidOpt.innerHTML = value;
    hidOpt.selected = 'selected';
    hidOpt.style.display = 'none';
});

/*Add all currency options*/

var requestURL = 'https://api.exchangerate.host/symbols';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  var curr = Object.keys(response.symbols);
  var currDesc = Object.values(response.symbols);
  for (var i = 0; i < currDesc.length; i++) {
    currDesc[i] = currDesc[i].description;
  }
  for (i = 0; i < curr.length; i++) {
      var opt = document.createElement('option');
      currType[0].appendChild(opt);
      opt.innerHTML = curr[i] + " - " + currDesc[i];
      opt.value = curr[i];
  }
  for (i = 0; i < curr.length; i++) {
    var opt = document.createElement('option');
    currType[1].appendChild(opt);
    opt.innerHTML = curr[i] + " - " + currDesc[i];
    opt.value = curr[i];
  }
}

/*Swap Button*/

var btn = document.getElementById('swap');
btn.addEventListener('click', function() {
  var val1 = currType[0].options[currType[0].selectedIndex].value;
  var val2 = currType[1].options[currType[1].selectedIndex].value;
  var hidOpt1 = document.createElement('option');
  var hidOpt2 = document.createElement('option');
  currType[0].appendChild(hidOpt1);
  currType[1].appendChild(hidOpt2);
  hidOpt1.selected = 'selected';
  hidOpt2.selected = 'selected';
  hidOpt1.style.display = 'none';
  hidOpt2.style.display = 'none';
  hidOpt1.value = val2;
  hidOpt2.value = val1;
  hidOpt1.innerHTML = val2;
  hidOpt2.innerHTML = val1;
});

/*Exchange*/

var exch = document.getElementById('exchange');
exch.addEventListener('click', function() {
  var val1 = currType[0].options[currType[0].selectedIndex].value;
  var val2 = currType[1].options[currType[1].selectedIndex].value;
  var inputVal = document.getElementsByClassName('curr_amt')[0].value;
  var requestURL = 'https://api.exchangerate.host/convert?from=' + val1 + '&to=' + val2 + '&amount=' + inputVal + '&places=2';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    var response = request.response;
    document.getElementsByClassName('curr_amt')[1].value = response.result;
  }
});