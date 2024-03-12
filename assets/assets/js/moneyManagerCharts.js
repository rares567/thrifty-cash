/*Various Sizes*/

for (i = 0; i < 3; i++) {
    document.getElementsByClassName('options_title')[i].style.height = window.innerHeight*0.05 + "px";
}
document.getElementById('spacing').style.height = window.innerHeight*0.08 + "px";
var stats = document.getElementsByClassName('stats');
for (i = 0; i < stats.length; i++) {
    stats[i].style.top = fontSize*2.5 + "px";
}

/*Options Click*/

var opt = document.getElementsByClassName('options_title');
opt[0].addEventListener('click', function() {
    window.location.href = 'moneyManager.html';
});
opt[2].addEventListener('click', function() {
    window.location.href = 'moneyManagerAlert.html';
});

/*Charts*/

var canvas = document.getElementsByClassName('chart');

/*create chart function & create data function*/

var chartRadius = screen.width*0.144;

function createChart (data, canvas, text, aspect) {
    var chart = new Chart(canvas, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            aspectRatio: aspect,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: fontSize/2,
                            family: " 'Rubik' , 'sans-serif' "
                        },
                        boxWidth: fontSize/2
                    }
                },
                tooltip: {
                    bodyFont: {
                        size: fontSize/2,
                        family: " 'Rubik' , 'sans-serif' "
                    }
                },
                title: {
                    display: true,
                    text: text,
                    font: {
                        size: fontSize,
                        family: " 'Rubik' , 'sans-serif' "
                    }
                }
            }
        }
    });
    return chart;
}

function createData(data, type) {
    var bgColor;
    if (type == 0) {
        bgColor = [
            'rgb(255,165,0)',
            'rgb(255, 236, 0)',
            'rgb(27, 170, 47)',
            'rgb(0, 126, 214)',
            'rgb(255, 0, 0)'
        ];
        label = ['Allowance', 'Pension', 'Salary', 'Bonus', 'Other'];
    } else if (type == 1) {
        bgColor = [
            'rgb(255, 0, 0)',
            'rgb(255, 155, 0)',
            'rgb(255, 236, 0)',
            'rgb(213, 243, 11)',
            'rgb(82, 215, 38)',
            'rgb(42, 203, 117)',
            'rgb(124, 221, 221)',
            'rgb(0, 216, 214)',
            'rgb(142, 108, 239)',
            'rgb(224, 30, 132)'
        ];
        label = ['Food', 'Social Life', 'Self-dev', 'Transportation', 'Household', 'Clothing', 'Beauty', 'Health', 'Education', 'Other'];
    }

    var dataObj = {
        labels: label,
        datasets: [{
            data: data,
            backgroundColor: bgColor,
            hoverOffset: fontSize/2,
            radius: chartRadius
        }]
    };

    return dataObj;
}

/*------Load Charts with transactions-------*/

var income = document.getElementsByClassName('income');
var expense = document.getElementsByClassName('expense');
var savings = document.getElementsByClassName('savings');

var stg = window.localStorage;

/*Daily charts*/

var allow = stg.getItem('allowanceSumD');
var pens = stg.getItem('pensionSumD');
var sal = stg.getItem('salarySumD');
var bonus = stg.getItem('bonusSumD');
var oth = stg.getItem('otherIncomeSumD');
var data;

if (allow == null)        allow = 0;      else        allow = parseInt(allow, 10);
if (pens == null)         pens = 0;       else        pens = parseInt(pens, 10);
if (sal == null)          sal = 0;        else        sal = parseInt(sal, 10);
if (bonus == null)        bonus = 0;      else        bonus = parseInt(bonus, 10);
if (oth == null)          oth = 0;        else        oth = parseInt(oth, 10);

data = [allow, pens, sal, bonus, oth];

createChart(createData(data, 0), canvas[0], 'Income', 0.6);

income[0].innerHTML = '$ ' + (allow + pens + sal + bonus + oth);

var food = stg.getItem('foodSumD');
var social = stg.getItem('socialSumD');
var self = stg.getItem('selfSumD');
var transp = stg.getItem('transpSumD');
var house = stg.getItem('houseSumD');
var clothing = stg.getItem('clothingSumD');
var beauty = stg.getItem('beautySumD');
var health = stg.getItem('healthSumD');
var education = stg.getItem('educationSumD');
oth = stg.getItem('otherExpenseSumD');

if (food == null)          food = 0;           else        food = parseInt(food, 10);
if (social == null)         social = 0;        else        social = parseInt(social, 10);
if (self == null)          self = 0;           else        self = parseInt(self, 10);
if (transp == null)        transp = 0;         else        transp = parseInt(transp, 10);
if (house == null)         house = 0;          else        house = parseInt(house, 10);
if (clothing == null)      clothing = 0;       else        clothing = parseInt(clothing, 10);
if (beauty == null)         beauty = 0;        else        beauty = parseInt(beauty, 10);
if (health == null)        health = 0;         else        health = parseInt(health, 10);
if (education == null)     education = 0;      else        education = parseInt(education, 10);
if (oth == null)           oth = 0;            else        oth = parseInt(oth, 10);

data = [food, social, self, transp, house, clothing, beauty, health, education, oth];

createChart(createData(data, 1), canvas[1], 'Expense', 0.5);

expense[0].innerHTML = '$ ' + (food + social + self + transp + house + clothing + beauty + health + education + oth);

savings[0].innerHTML = '$ ' + (parseInt(income[0].innerHTML.split(' ')[1], 10) - parseInt(expense[0].innerHTML.split(' ')[1], 10));

/*Monthly charts*/

allow = stg.getItem('allowanceSumM');
pens = stg.getItem('pensionSumM');
sal = stg.getItem('salarySumM');
bonus = stg.getItem('bonusSumM');
oth = stg.getItem('otherIncomeSumM');

if (allow == null)        allow = 0;      else        allow = parseInt(allow, 10);
if (pens == null)         pens = 0;       else        pens = parseInt(pens, 10);
if (sal == null)          sal = 0;        else        sal = parseInt(sal, 10);
if (bonus == null)        bonus = 0;      else        bonus = parseInt(bonus, 10);
if (oth == null)          oth = 0;        else        oth = parseInt(oth, 10);

data = [allow, pens, sal, bonus, oth];

createChart(createData(data, 0), canvas[2], 'Income', 0.6);

income[1].innerHTML = '$ ' + (allow + pens + sal + bonus + oth);

food = stg.getItem('foodSumM');
social = stg.getItem('socialSumM');
self = stg.getItem('selfSumM');
transp = stg.getItem('transpSumM');
house = stg.getItem('houseSumM');
clothing = stg.getItem('clothingSumM');
beauty = stg.getItem('beautySumM');
health = stg.getItem('healthSumM');
education = stg.getItem('educationSumM');
oth = stg.getItem('otherExpenseSumM');

if (food == null)          food = 0;           else        food = parseInt(food, 10);
if (social == null)        social = 0;         else        social = parseInt(social, 10);
if (self == null)          self = 0;           else        self = parseInt(self, 10);
if (transp == null)        transp = 0;         else        transp = parseInt(transp, 10);
if (house == null)         house = 0;          else        house = parseInt(house, 10);
if (clothing == null)      clothing = 0;       else        clothing = parseInt(clothing, 10);
if (beauty == null)        beauty = 0;         else        beauty = parseInt(beauty, 10);
if (health == null)        health = 0;         else        health = parseInt(health, 10);
if (education == null)     education = 0;      else        education = parseInt(education, 10);
if (oth == null)           oth = 0;            else        oth = parseInt(oth, 10);

data = [food, social, self, transp, house, clothing, beauty, health, education, oth];

createChart(createData(data, 1), canvas[3], 'Expense', 0.5);

expense[1].innerHTML = '$ ' + (food + social + self + transp + house + clothing + beauty + health + education + oth);

savings[1].innerHTML = '$ ' + (parseInt(income[1].innerHTML.split(' ')[1], 10) - parseInt(expense[1].innerHTML.split(' ')[1], 10));

/*All time*/

allow = stg.getItem('allowanceSum');
pens = stg.getItem('pensionSum');
sal = stg.getItem('salarySum');
bonus = stg.getItem('bonusSum');
oth = stg.getItem('otherIncomeSum');

if (allow == null)        allow = 0;      else        allow = parseInt(allow, 10);
if (pens == null)         pens = 0;       else        pens = parseInt(pens, 10);
if (sal == null)          sal = 0;        else        sal = parseInt(sal, 10);
if (bonus == null)        bonus = 0;      else        bonus = parseInt(bonus, 10);
if (oth == null)          oth = 0;        else        oth = parseInt(oth, 10);

data = [allow, pens, sal, bonus, oth];

createChart(createData(data, 0), canvas[4], 'Income', 0.6);

income[2].innerHTML = '$ ' + (allow + pens + sal + bonus + oth);

food = stg.getItem('foodSum');
social = stg.getItem('socialSum');
self = stg.getItem('selfSum');
transp = stg.getItem('transpSum');
house = stg.getItem('houseSum');
clothing = stg.getItem('clothingSum');
beauty = stg.getItem('beautySum');
health = stg.getItem('healthSum');
education = stg.getItem('educationSum');
oth = stg.getItem('otherExpenseSum');

if (food == null)          food = 0;           else        food = parseInt(food, 10);
if (social == null)        social = 0;         else        social = parseInt(social, 10);
if (self == null)          self = 0;           else        self = parseInt(self, 10);
if (transp == null)        transp = 0;         else        transp = parseInt(transp, 10);
if (house == null)         house = 0;          else        house = parseInt(house, 10);
if (clothing == null)      clothing = 0;       else        clothing = parseInt(clothing, 10);
if (beauty == null)        beauty = 0;         else        beauty = parseInt(beauty, 10);
if (health == null)        health = 0;         else        health = parseInt(health, 10);
if (education == null)     education = 0;      else        education = parseInt(education, 10);
if (oth == null)           oth = 0;            else        oth = parseInt(oth, 10);

data = [food, social, self, transp, house, clothing, beauty, health, education, oth];

createChart(createData(data, 1), canvas[5], 'Expense', 0.5);

expense[2].innerHTML = '$ ' + (food + social + self + transp + house + clothing + beauty + health + education + oth);

savings[2].innerHTML = '$ ' + (parseInt(income[2].innerHTML.split(' ')[1], 10) - parseInt(expense[2].innerHTML.split(' ')[1], 10));

if (parseInt(income[2].innerHTML.split(' ')[1], 10) === 0 && parseInt(expense[2].innerHTML.split(' ')[1], 10) === 0) {
    //if all time income sum and expense sum are 0, there are no transactions
    document.getElementById('main_body').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}