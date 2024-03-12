/*Various Sizes*/

for (i = 0; i < 3; i++) {
    document.getElementsByClassName('options_title')[i].style.height = window.innerHeight*0.05 + "px";
}
document.getElementById('check').style.height = fontSize + "px";

/*Options Click*/

var opt = document.getElementsByClassName('options_title');
opt[0].addEventListener('click', function() {
    window.location.href = 'moneyManager.html';
});
opt[1].addEventListener('click', function() {
    window.location.href = 'moneyManagerCharts.html';
});

/*Alert*/

var stg = window.localStorage;

var income = stg.getItem('incomeM');
income = parseInt(income, 10);

var expense = stg.getItem('expenseM');
expense = parseInt(expense, 10);

if (isNaN(income) == true)
    income = 0;
if (isNaN(expense) == true)
    expense = 0;

document.getElementById('income').innerHTML = '$ ' + income;
document.getElementById('expense').innerHTML = '$ ' + expense;

var target = stg.getItem('targetSavings');
if (target == null) {
    target = 25;
    stg.setItem('targetSavings', 25);
}
document.getElementById('savings_pct').value = target;
var expenseTarget;
var aproxAmt;

document.getElementById('savings_pct').addEventListener('keyup', function() {
    target = document.getElementById('savings_pct').value;
    expenseTarget = Math.round((income - expense) * (100 - target))/100;
    aproxAmt = Math.round(expenseTarget/30*100)/100;
    document.getElementById('expense_target').innerHTML = '$ ' + expenseTarget;
    document.getElementById('aprox').innerHTML = '&nbsp;&nbsp;~&nbsp;&nbsp;$&nbsp;' + aproxAmt + '&nbsp;per&nbsp;day';
    console.log(aproxAmt);
    stg.setItem('dailyMaxExpenses', aproxAmt);
    stg.setItem('targetSavings', target);
});

expenseTarget = Math.round((income - expense) * (100 - target))/100;
aproxAmt = Math.round(expenseTarget/30*100)/100;

document.getElementById('expense_target').innerHTML = '$ ' + expenseTarget;
document.getElementById('aprox').innerHTML = '&nbsp;&nbsp;~&nbsp;&nbsp;$&nbsp;' + Math.round(expenseTarget/30*100)/100 + '&nbsp;per&nbsp;day';

var status = stg.getItem('checkStatus');

if (status == 'null' || status == 'false') {
    document.getElementById('alert_status').innerHTML = 'Disabled';
    document.getElementById('alert_status').style.color = 'red';
} else {
    document.getElementById('alert_status').innerHTML = 'Enabled';
    document.getElementById('alert_status').style.color = '#00b300';
    document.getElementById('check').checked = true;
}

document.getElementById('check').addEventListener('click', function() {
    status = document.getElementById('check').checked;
    stg.setItem('checkStatus', status);
    var aproxAmt = document.getElementById('aprox').innerHTML.split(';')[5].split('&')[0];
    if (status == 'true') {
        document.getElementById('alert_status').innerHTML = 'Enabled';
        document.getElementById('alert_status').style.color = '#00b300';
        stg.setItem('dailyMaxExpenses', aproxAmt);
    } else {
        document.getElementById('alert_status').innerHTML = 'Disabled';
        document.getElementById('alert_status').style.color = 'red';
    }
});