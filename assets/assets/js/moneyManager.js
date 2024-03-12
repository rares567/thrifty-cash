/*Various Sizes*/

document.getElementById('main_body').style.height = window.innerHeight*0.9 + "px";
for (i = 0; i < 3; i++) {
    document.getElementsByClassName('options_title')[i].style.height = window.innerHeight*0.05 + "px";
}
document.getElementById('fixed_add').style.bottom = window.innerHeight*0.1 + screen.width*0.07 + "px";
document.getElementById('add_button').style.height = screen.width*0.2 + "px";

/*Options Click*/

var opt = document.getElementsByClassName('options_title');
opt[1].addEventListener('click', function() {
    window.location.href = 'moneyManagerCharts.html';
});
opt[2].addEventListener('click', function() {
    window.location.href = 'moneyManagerAlert.html';
});

/*Add Buttons*/

document.getElementById('add_button').addEventListener('click', function() {
    var list = document.getElementsByClassName('add_popup');
    var tab = document.getElementsByClassName('trans_tab');
    for(var i = 0; i < 2; i++) {
        list[i].style.display = "block";
        tab[i].style.display = "none";
    }
});

document.getElementById('frame').addEventListener('click', function() {
    var list = document.getElementsByClassName('add_popup');
    list[0].style.display = "none";
    list[1].style.display = "none";
});

document.getElementById('income').addEventListener('click', function() {
    var list = document.getElementsByClassName('add_popup');
    list[0].style.display = "none";
    list[1].style.display = "none";
    document.getElementsByClassName('trans_tab')[0].style.display = "block";
    var date = new Date().toLocaleString().split(",");
    var time = date[1].split(":");
    var timeNoSeconds = time[2].split(" ");
    document.getElementsByClassName('date')[0].value = date[0] + ", " + time[0] + ':' + time[1] + " " + timeNoSeconds[1];
});

document.getElementById('expense').addEventListener('click', function() {
    var list = document.getElementsByClassName('add_popup');
    list[0].style.display = "none";
    list[1].style.display = "none";
    document.getElementsByClassName('trans_tab')[1].style.display = "block";
    var date = new Date().toLocaleString().split(",");
    var time = date[1].split(":");
    var timeNoSeconds = time[2].split(" ");
    document.getElementsByClassName('date')[1].value = date[0] + ", " + time[0] + ':' + time[1] + " " + timeNoSeconds[1];
});

document.getElementsByClassName('cancel')[0].addEventListener('click', function() {
    document.getElementsByClassName('trans_tab')[0].style.display = "none";
    document.getElementsByClassName('selected')[0].selected = 'selected';
    document.getElementsByClassName('amount')[0].value = '';
});

document.getElementsByClassName('cancel')[1].addEventListener('click', function() {
    document.getElementsByClassName('trans_tab')[1].style.display = "none";
    document.getElementsByClassName('selected')[1].selected = 'selected';
    document.getElementsByClassName('amount')[1].value = '';
});

/*Load Transactions*/

var stg = window.localStorage;
var last = stg.getItem('lastTransNo')
for (i = 1; i <= last; i++) {
    var item = stg.getItem(i);
    if (item === null) {
        continue;
    }
    item = item.split('*');
    var p = document.createElement('p');
    var spanDate = document.createElement('span');
    var spanType = document.createElement('span');
    var spanAmt = document.createElement('span');
    var spacing = document.getElementById('spacing');
    document.getElementById('frame').insertBefore(p, spacing);
    p.appendChild(spanDate);
    p.appendChild(spanType);
    p.appendChild(spanAmt);
    p.className = 'trans_p';
    p.id = i;
    spanDate.className = 'span_date';
    spanType.className = 'span_type';
    spanAmt.className = 'span_amt';
    spanDate.innerHTML = item[0];
    spanType.innerHTML = item[1];
    spanAmt.innerHTML = item[2];
    if (spanAmt.innerHTML.includes('-') === true) {
        spanAmt.style.color = 'red';
    } else {
        spanAmt.style.color = '#00b300';
    }
}

/*Add transaction*/

function addTransaction(event, arrNo) {
    event.preventDefault();     //no refreshing after form submit
    var dateVal = document.getElementsByClassName('date')[arrNo].value;
    var dateSplit = dateVal.split(',');
    dateVal = dateSplit[0] + '<br>' + dateSplit[1]; //add line break
    dateSplit = dateVal.split(' ');
    dateVal = dateSplit[0] + dateSplit[2] + " " + dateSplit[3]; //remove unnecessary space for minimum size in localStorage
    var select = document.getElementsByClassName('type');
    var type = select[arrNo].options[select[arrNo].selectedIndex].text;
    if (type === 'Self-development') {
        type = 'Self-dev';
    } else if (type === 'Transportation') {
        type = 'Transp';
    }
    var amt = document.getElementsByClassName('amount')[arrNo].value;
    var p = document.createElement('p');
    var spanDate = document.createElement('span');
    var spanType = document.createElement('span');
    var spanAmt = document.createElement('span');
    var spacing = document.getElementById('spacing');
    document.getElementById('frame').insertBefore(p, spacing);
    p.appendChild(spanDate);
    p.appendChild(spanType);
    p.appendChild(spanAmt);
    p.className = 'trans_p';
    spanDate.innerHTML = dateVal;
    spanDate.className = 'span_date';
    spanType.className = 'span_type';
    spanAmt.className = 'span_amt';
    spanType.innerHTML = type;
    spanAmt.innerHTML = '$ ' + amt;
    if (arrNo == 0) {
        spanAmt.style.color = '#00b300';
    } else {
        spanAmt.style.color = 'red';
        spanAmt.innerHTML = '- ' + spanAmt.innerHTML;
    }
    document.getElementsByClassName('trans_tab')[arrNo].style.display = "none";

    /*Save Transaction*/

    var stg = window.localStorage;
    var last = stg.getItem('lastTransNo');
    if (last == null) {
        stg.setItem('lastTransNo', '0');
        last = 0;
    }
    last = parseInt(last, 10);
    stg.setItem(last + 1, spanDate.innerHTML + '*' + spanType.innerHTML + '*' + spanAmt.innerHTML); //* used for separation when loading in transactions
    stg.setItem('lastTransNo', last + 1);

    /*--------------Save multiple sums for charts----------------*/

    if (arrNo === 0) {
        var amt = spanAmt.innerHTML.split(' ');
        amt = amt[1];
        amt = parseInt(amt, 10);
        var nowDate = Date.now()/1000/60/60;
        nowDate = nowDate.toFixed(1);
        nowDate = parseFloat(nowDate, 10);

        /*daily income sums*/

        var allow = stg.getItem('allowanceSumD'); //D = daily
        var pens = stg.getItem('pensionSumD');
        var sal = stg.getItem('salarySumD');
        var bonus = stg.getItem('bonusSumD');
        var oth = stg.getItem('otherIncomeSumD');
        var oldDate = stg.getItem('oldDateD');

        /*accounts for non existing localStorage items (fresh install or deleted app local storage)*/

        if (allow == null)      allow = 0;  else    allow = parseInt(allow, 10);
        if (pens == null)       pens = 0;   else    pens = parseInt(pens, 10);
        if (sal == null)        sal = 0;    else    sal = parseInt(sal, 10);
        if (bonus == null)      bonus = 0;  else    bonus = parseInt(bonus, 10);
        if (oth == null)        oth = 0;    else    oth = parseInt(oth, 10);

        if (oldDate == null)    oldDate = 0;      else    oldDate = parseFloat(oldDate, 10);

        if (nowDate - oldDate > 24) {
            /*if its been over a day it will zero out the sums (both income and expense) and nowDate becomes oldDate*/
            stg.setItem('allowanceSumD', 0);        allow = 0;
            stg.setItem('pensionSumD', 0);          pens = 0;
            stg.setItem('salarySumD', 0);           sal = 0;
            stg.setItem('bonusSumD', 0);            bonus = 0;
            stg.setItem('otherIncomeSumD', 0);      oth = 0;
            stg.setItem('foodSumD', 0);
            stg.setItem('socialSumD', 0);
            stg.setItem('selfSumD', 0);
            stg.setItem('transpSumD', 0);
            stg.setItem('houseSumD', 0);
            stg.setItem('clothingSumD', 0);
            stg.setItem('beautySumD', 0);
            stg.setItem('healthSumD', 0);
            stg.setItem('educationSumD', 0);
            stg.setItem('otherExpenseSumD', 0);

            stg.setItem('oldDateD', nowDate);
            stg.setItem('dayPassed', true);
        }

        if      (spanType.innerHTML == 'Allowance')  {allow += amt;         stg.setItem('allowanceSumD', allow);}
        else if (spanType.innerHTML == 'Pension')    {pens += amt;          stg.setItem('pensionSumD', pens);}
        else if (spanType.innerHTML == 'Salary')     {sal += amt;           stg.setItem('salarySumD', sal);}
        else if (spanType.innerHTML == 'Bonus')      {bonus += amt;         stg.setItem('bonusSumD', bonus);}
        else                                         {oth += amt;           stg.setItem('otherIncomeSumD', oth);}

        /*monthly income sums*/

        var allow = stg.getItem('allowanceSumM'); //M = monthly
        var pens = stg.getItem('pensionSumM');
        var sal = stg.getItem('salarySumM');
        var bonus = stg.getItem('bonusSumM');
        var oth = stg.getItem('otherIncomeSumM');
        var oldDate = stg.getItem('oldDateM');

        if (allow == null)      allow = 0;  else    allow = parseInt(allow, 10);
        if (pens == null)       pens = 0;   else    pens = parseInt(pens, 10);
        if (sal == null)        sal = 0;    else    sal = parseInt(sal, 10);
        if (bonus == null)      bonus = 0;  else    bonus = parseInt(bonus, 10);
        if (oth == null)        oth = 0;    else    oth = parseInt(oth, 10);

        if (oldDate == null)    oldDate = 0;      else    oldDate = parseFloat(oldDate, 10);

        if (nowDate - oldDate > 720) {
            stg.setItem('allowanceSumM', 0);        allow = 0;
            stg.setItem('pensionSumM', 0);          pens = 0;
            stg.setItem('salarySumM', 0);           sal = 0;
            stg.setItem('bonusSumM', 0);            bonus = 0;
            stg.setItem('otherIncomeSumM', 0);      oth = 0;
            stg.setItem('foodSumM', 0);
            stg.setItem('socialSumM', 0);
            stg.setItem('selfSumM', 0);
            stg.setItem('transpSumM', 0);
            stg.setItem('houseSumM', 0);
            stg.setItem('clothingSumM', 0);
            stg.setItem('beautySumM', 0);
            stg.setItem('healthSumM', 0); 
            stg.setItem('educationSumM', 0);
            stg.setItem('otherExpenseSumM', 0);

            stg.setItem('oldDateM', nowDate);
        }

        if      (spanType.innerHTML == 'Allowance')  {allow += amt;         stg.setItem('allowanceSumM', allow);}
        else if (spanType.innerHTML == 'Pension')    {pens += amt;          stg.setItem('pensionSumM', pens);}
        else if (spanType.innerHTML == 'Salary')     {sal += amt;           stg.setItem('salarySumM', sal);}
        else if (spanType.innerHTML == 'Bonus')      {bonus += amt;         stg.setItem('bonusSumM', bonus);}
        else                                         {oth += amt;           stg.setItem('otherIncomeSumM', oth);}

        var income = allow + pens + sal + bonus + oth;
        stg.setItem('incomeM', income);

        /*all time income sums*/

        var allow = stg.getItem('allowanceSum');
        var pens = stg.getItem('pensionSum');
        var sal = stg.getItem('salarySum');
        var bonus = stg.getItem('bonusSum');
        var oth = stg.getItem('otherIncomeSum');

        if (allow == null)  allow = 0;  else    allow = parseInt(allow, 10);
        if (pens == null)   pens = 0;   else    pens = parseInt(pens, 10);
        if (sal == null)    sal = 0;    else    sal = parseInt(sal, 10);
        if (bonus == null)  bonus = 0;  else    bonus = parseInt(bonus, 10);
        if (oth == null)    oth = 0;    else    oth = parseInt(oth, 10);

        if      (spanType.innerHTML == 'Allowance')  {allow += amt;  stg.setItem('allowanceSum', allow);}
        else if (spanType.innerHTML == 'Pension')    {pens += amt;   stg.setItem('pensionSum', pens);}
        else if (spanType.innerHTML == 'Salary')     {sal += amt;    stg.setItem('salarySum', sal);}
        else if (spanType.innerHTML == 'Bonus')      {bonus += amt;  stg.setItem('bonusSum', bonus);}
        else                                         {oth += amt;    stg.setItem('otherIncomeSum', oth);}

    } else {

        var amt = spanAmt.innerHTML.split(' ');
        amt = amt[2];
        amt = parseInt(amt, 10);
        var nowDate = Date.now()/1000/60/60;
        nowDate = nowDate.toFixed(1);
        nowDate = parseFloat(nowDate, 10);

        /*daily expense sum*/

        var food = stg.getItem('foodSumD');
        var social = stg.getItem('socialSumD');
        var self = stg.getItem('selfSumD');
        var transp = stg.getItem('transpSumD');
        var house = stg.getItem('houseSumD');
        var clothing = stg.getItem('clothingSumD');
        var beauty = stg.getItem('beautySumD');
        var health = stg.getItem('healthSumD');
        var education = stg.getItem('educationSumD');
        var oth = stg.getItem('otherExpenseSumD');
        var oldDate = stg.getItem('oldDateD');

        if (food == null)       food = 0;       else    food = parseInt(food, 10);
        if (social == null)     social = 0;     else    social = parseInt(social, 10);
        if (self == null)       self = 0;       else    self = parseInt(self, 10);
        if (transp == null)     transp = 0;     else    transp = parseInt(transp, 10);
        if (house == null)      house = 0;      else    house = parseInt(house, 10);
        if (clothing == null)   clothing = 0;   else    clothing = parseInt(clothing, 10);
        if (beauty == null)     beauty = 0;     else    beauty = parseInt(beauty, 10);
        if (health == null)     health = 0;     else    health = parseInt(health, 10);
        if (education == null)  education = 0;  else    education = parseInt(education, 10);
        if (oth == null)        oth = 0;        else    oth = parseInt(oth, 10);

        if (oldDate == null)    oldDate = 0;      else    oldDate = parseFloat(oldDate, 10);

        if (nowDate - oldDate > 24) {
            stg.setItem('allowanceSumD', 0);
            stg.setItem('pensionSumD', 0);
            stg.setItem('salarySumD', 0);
            stg.setItem('bonusSumD', 0);
            stg.setItem('otherIncomeSumD', 0);
            stg.setItem('foodSumD', 0);         food = 0;
            stg.setItem('socialSumD', 0);       social = 0;
            stg.setItem('selfSumD', 0);         self = 0;
            stg.setItem('transpSumD', 0);       transp = 0;
            stg.setItem('houseSumD', 0);        house = 0;
            stg.setItem('clothingSumD', 0);     clothing = 0;
            stg.setItem('beautySumD', 0);       beauty = 0;
            stg.setItem('healthSumD', 0);       health = 0;
            stg.setItem('educationSumD', 0);    education = 0;
            stg.setItem('otherExpenseSumD', 0); oth = 0;

            stg.setItem('oldDateD', nowDate);
            stg.setItem('dayPassed', true);
        }

        if      (spanType.innerHTML == 'Food')           {food += amt;      stg.setItem('foodSumD', food);}
        else if (spanType.innerHTML == 'Social Life')    {social += amt;    stg.setItem('socialSumD', social);}
        else if (spanType.innerHTML == 'Self-dev')       {self += amt;      stg.setItem('selfSumD', self);}
        else if (spanType.innerHTML == 'Transp')         {transp += amt;    stg.setItem('transpSumD', transp);}
        else if (spanType.innerHTML == 'Household')      {house += amt;     stg.setItem('houseSumD', house);}
        else if (spanType.innerHTML == 'Clothing')       {clothing += amt;  stg.setItem('clothingSumD', clothing);}
        else if (spanType.innerHTML == 'Beauty')         {beauty += amt;    stg.setItem('beautySumD', beauty);}
        else if (spanType.innerHTML == 'Health')         {health += amt;    stg.setItem('healthSumD', health);}
        else if (spanType.innerHTML == 'Education')      {education += amt; stg.setItem('educationSumD', education);}
        else                                             {oth += amt;       stg.setItem('otherExpenseSumD', oth);}

        /*monthly expense sums*/

        var food = stg.getItem('foodSumM');
        var social = stg.getItem('socialSumM');
        var self = stg.getItem('selfSumM');
        var transp = stg.getItem('transpSumM');
        var house = stg.getItem('houseSumM');
        var clothing = stg.getItem('clothingSumM');
        var beauty = stg.getItem('beautySumM');
        var health = stg.getItem('healthSumM');
        var education = stg.getItem('educationSumM');
        var oth = stg.getItem('otherExpenseSumM');
        var oldDate = stg.getItem('oldDateM');

        if (food == null)       food = 0;       else    food = parseInt(food, 10);
        if (social == null)     social = 0;     else    social = parseInt(social, 10);
        if (self == null)       self = 0;       else    self = parseInt(self, 10);
        if (transp == null)     transp = 0;     else    transp = parseInt(transp, 10);
        if (house == null)      house = 0;      else    house = parseInt(house, 10);
        if (clothing == null)   clothing = 0;   else    clothing = parseInt(clothing, 10);
        if (beauty == null)     beauty = 0;     else    beauty = parseInt(beauty, 10);
        if (health == null)     health = 0;     else    health = parseInt(health, 10);
        if (education == null)  education = 0;  else    education = parseInt(education, 10);
        if (oth == null)        oth = 0;        else    oth = parseInt(oth, 10);

        if (oldDate == null)    oldDate = 0;      else    oldDate = parseFloat(oldDate, 10);

        if (nowDate - oldDate > 720) {
            stg.setItem('allowanceSumM', 0);
            stg.setItem('pensionSumM', 0);
            stg.setItem('salarySumM', 0);
            stg.setItem('bonusSumM', 0);
            stg.setItem('otherIncomeSumM', 0);
            stg.setItem('foodSumM', 0);         food = 0;
            stg.setItem('socialSumM', 0);       social = 0;
            stg.setItem('selfSumM', 0);         self = 0;
            stg.setItem('transpSumM', 0);       transp = 0;
            stg.setItem('houseSumM', 0);        house = 0;
            stg.setItem('clothingSumM', 0);     clothing = 0;
            stg.setItem('beautySumM', 0);       beauty = 0;
            stg.setItem('healthSumM', 0);       health = 0;
            stg.setItem('educationSumM', 0);    education = 0;
            stg.setItem('otherExpenseSumM', 0); oth = 0;

            stg.setItem('oldDateM', nowDate);
        }

        if      (spanType.innerHTML == 'Food')           {food += amt;      stg.setItem('foodSumM', food);}
        else if (spanType.innerHTML == 'Social Life')    {social += amt;    stg.setItem('socialSumM', social);}
        else if (spanType.innerHTML == 'Self-dev')       {self += amt;      stg.setItem('selfSumM', self);}
        else if (spanType.innerHTML == 'Transp')         {transp += amt;    stg.setItem('transpSumM', transp);}
        else if (spanType.innerHTML == 'Household')      {house += amt;     stg.setItem('houseSumM', house);}
        else if (spanType.innerHTML == 'Clothing')       {clothing += amt;  stg.setItem('clothingSumM', clothing);}
        else if (spanType.innerHTML == 'Beauty')         {beauty += amt;    stg.setItem('beautySumM', beauty);}
        else if (spanType.innerHTML == 'Health')         {health += amt;    stg.setItem('healthSumM', health);}
        else if (spanType.innerHTML == 'Education')      {education += amt; stg.setItem('educationSumM', education);}
        else                                             {oth += amt;       stg.setItem('otherExpenseSumM', oth);}

        var expense = food + social + self + transp + house + clothing + beauty + health + education + oth;
        stg.setItem('expenseM', expense);

        /*daily max expenses alert*/

        var income = stg.getItem('incomeM');
        income = parseInt(income, 10);
        var status = stg.getItem('checkStatus');
        passed = stg.getItem('dayPassed');
        if (passed == null)     passed = false;
        if (oldDate == null)    oldDate = 0;        else        oldDate = parseInt(oldDate, 10);
        if (status == 'true') {
            var food = stg.getItem('foodSumD');                 food = parseInt(food, 10);
            var social = stg.getItem('socialSumD');             social = parseInt(social, 10);
            var self = stg.getItem('selfSumD');                 self = parseInt(self, 10);
            var transp = stg.getItem('transpSumD');             transp = parseInt(transp, 10);
            var house = stg.getItem('houseSumD');               house = parseInt(house, 10);
            var clothing = stg.getItem('clothingSumD');         clothing = parseInt(clothing, 10);
            var beauty = stg.getItem('beautySumD');             beauty = parseInt(beauty, 10);
            var health = stg.getItem('healthSumD');             health = parseInt(health, 10);
            var education = stg.getItem('educationSumD');       education = parseInt(education, 10);
            var oth = stg.getItem('otherExpenseSumD');          oth = parseInt(oth, 10);

            var target = stg.getItem('targetSavings');      target = parseInt(target, 10);
            var dailyMax = Math.round((Math.round((income - expense) * (100 - target))/100)/30*100)/100;
            var dailySum = food + social + self + transp + house + clothing + beauty + health + education + oth;
            var transAmt;

            if (dailySum > dailyMax) {
                if (passed == 'true') {
                    stg.setItem('dayPassed', false);
                }
                document.getElementById('alert').style.display = 'block';
            } else {
                if (passed == 'true') {
                    stg.setItem('dayPassed', false);
                } else {
                    if      (spanType.innerHTML == 'Food')           transAmt = food;
                    else if (spanType.innerHTML == 'Social Life')    transAmt = social;
                    else if (spanType.innerHTML == 'Self-dev')       transAmt = self;
                    else if (spanType.innerHTML == 'Transp')         transAmt = transp;
                    else if (spanType.innerHTML == 'Household')      transAmt = house;
                    else if (spanType.innerHTML == 'Clothing')       transAmt = clothing;
                    else if (spanType.innerHTML == 'Beauty')         transAmt = beauty;
                    else if (spanType.innerHTML == 'Health')         transAmt = health;
                    else if (spanType.innerHTML == 'Education')      transAmt = education;
                    else                                             transAmt = oth;

                    dailyMax -= transAmt;
                    stg.setItem('dailyMaxExpenses', dailyMax);
                }
            }
        }

        /*all time expense sums*/

        var food = stg.getItem('foodSum');
        var social = stg.getItem('socialSum');
        var self = stg.getItem('selfSum');
        var transp = stg.getItem('transpSum');
        var house = stg.getItem('houseSum');
        var clothing = stg.getItem('clothingSum');
        var beauty = stg.getItem('beautySum');
        var health = stg.getItem('healthSum');
        var education = stg.getItem('educationSum');
        var oth = stg.getItem('otherExpenseSum');

        if (food == null)       food = 0;       else    food = parseInt(food, 10);
        if (social == null)     social = 0;     else    social = parseInt(social, 10);
        if (self == null)       self = 0;       else    self = parseInt(self, 10);
        if (transp == null)     transp = 0;     else    transp = parseInt(transp, 10);
        if (house == null)      house = 0;      else    house = parseInt(house, 10);
        if (clothing == null)   clothing = 0;   else    clothing = parseInt(clothing, 10);
        if (beauty == null)     beauty = 0;     else    beauty = parseInt(beauty, 10);
        if (health == null)     health = 0;     else    health = parseInt(health, 10);
        if (education == null)  education = 0;  else    education = parseInt(education, 10);
        if (oth == null)        oth = 0;        else    oth = parseInt(oth, 10);

        if      (spanType.innerHTML == 'Food')           {food += amt;      stg.setItem('foodSum', food);}
        else if (spanType.innerHTML == 'Social Life')    {social += amt;    stg.setItem('socialSum', social);}
        else if (spanType.innerHTML == 'Self-dev')       {self += amt;      stg.setItem('selfSum', self);}
        else if (spanType.innerHTML == 'Transp')         {transp += amt;    stg.setItem('transpSum', transp);}
        else if (spanType.innerHTML == 'Household')      {house += amt;     stg.setItem('houseSum', house);}
        else if (spanType.innerHTML == 'Clothing')       {clothing += amt;  stg.setItem('clothingSum', clothing);}
        else if (spanType.innerHTML == 'Beauty')         {beauty += amt;    stg.setItem('beautySum', beauty);}
        else if (spanType.innerHTML == 'Health')         {health += amt;    stg.setItem('healthSum', health);}
        else if (spanType.innerHTML == 'Education')      {education += amt; stg.setItem('educationSum', education);}
        else                                             {oth += amt;       stg.setItem('otherExpenseSum', oth);}
    }
    p.id = last + 1;

    /*Remove selected option and input value*/

    document.getElementsByClassName('selected')[arrNo].selected = 'selected';
    document.getElementsByClassName('amount')[arrNo].value = '';

    deletableTrans(); //allows newly added trans to be able to be deleted without page refresh
}

/*Delete Transaction*/

var delBtn = document.getElementById('delete');
var transNo;
var msg = document.getElementById('delete_msg');

function deletableTrans() {
    var p = document.getElementsByClassName('trans_p');
    for (i = 0; i < p.length; i++) {
        var timer;
        p[i].addEventListener('touchstart', function(e) {    
            timer = setTimeout(function() {
                msg.style.display = 'block';
                transNo = e.target.id;
                e.target.style.backgroundColor = 'rgba(190, 190, 190, 0.25)';
            }, 1000);
        });
        p[i].addEventListener('touchend', function() {
            clearTimeout(timer);
        });
        document.getElementById('frame').addEventListener('click', function() {
            if (msg.style.display === 'block') {    //fixes console error if not held down enough
                msg.style.display = 'none';
                document.getElementById(transNo).style.backgroundColor = 'transparent';
            }
        });
    }
}
deletableTrans(); //enables trans loaded from storage to be deletable

delBtn.addEventListener('click', function() {
    var stg = window.localStorage;
    var type = document.getElementById(transNo).children[1].innerHTML;
    var val = document.getElementById(transNo).children[2].innerHTML;
    var transDate = document.getElementById(transNo).children[0].innerHTML;
    var nowDate = [];
    var dayPassed = false;
    var monthPassed = false;

    /*check if day/month passed*/

    nowDate[1] = new Date().getDate();   //day of month
    nowDate[0] = new Date().getMonth() + 1;    //month
    nowDate[2] = new Date().getFullYear(); //year
    transDate = transDate.split('<')[0].split('/');
    for (i = 0; i < 3; i++) {
        transDate[i] = parseInt(transDate[i], 10);
    }
    if (nowDate[0] != transDate[0] || nowDate[2] != transDate[2]) {
        /*day and month passed*/
        dayPassed = true;
        monthPassed = true;
    } else if (nowDate[1] != transDate[1]) {
        /*day passed*/
        dayPassed = true;
    }

    var transType;
    val = val.split(' ');
    if (val.length === 2)   {val = parseInt(val[1], 10); transType = 0}     else    val = parseInt(val[2], 10);
    var sum;

    if (transType === 0) {

        /*remove from sums unles transactions are old*/

        if (type == 'Allowance') {
            sum = stg.getItem('allowanceSum');     sum -= val;     stg.setItem('allowanceSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('allowanceSumD');    sum -= val;     stg.setItem('allowanceSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('allowanceSumM');    sum -= val;     stg.setItem('allowanceSumM', sum);}
        } else if (type == 'Pension') {
            sum = stg.getItem('pensionSum');       sum -= val;     stg.setItem('pensionSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('pensionSumD');       sum -= val;     stg.setItem('pensionSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('pensionSumM');       sum -= val;     stg.setItem('pensionSumM', sum);}
        } else if (type == 'Salary') {
            sum = stg.getItem('salarySum');        sum -= val;     stg.setItem('salarySum', sum);
            if (dayPassed === false)        {sum = stg.getItem('salarySumD');        sum -= val;     stg.setItem('salarySumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('salarySumM');        sum -= val;     stg.setItem('salarySumM', sum);}
        } else if (type == 'Bonus') {
            sum = stg.getItem('bonusSum');         sum -= val;     stg.setItem('bonusSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('bonusSumD');         sum -= val;     stg.setItem('bonusSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('bonusSumM');         sum -= val;     stg.setItem('bonusSumM', sum);}
        } else {
            sum = stg.getItem('otherIncomeSum');   sum -= val;     stg.setItem('otherIncomeSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('otherIncomeSumD');   sum -= val;     stg.setItem('otherIncomeSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('otherIncomeSumM');   sum -= val;     stg.setItem('otherIncomeSumM', sum);}
        }

    } else {

        if (type == 'Food') {
            sum = stg.getItem('foodSum');           sum -= val;     stg.setItem('foodSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('foodSumD');           sum -= val;     stg.setItem('foodSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('foodSumM');           sum -= val;     stg.setItem('foodSumM', sum);}  
        } else if (type == 'Social Life') {
            sum = stg.getItem('socialSum');         sum -= val;     stg.setItem('socialSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('socialSumD');         sum -= val;     stg.setItem('socialSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('socialSumM');         sum -= val;     stg.setItem('socialSumM', sum);}
        } else if (type == 'Self-dev') {
            sum = stg.getItem('selfSum');           sum -= val;     stg.setItem('selfSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('selfSumD');           sum -= val;     stg.setItem('selfSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('selfSumM');           sum -= val;     stg.setItem('selfSumM', sum);}
        } else if (type == 'Transp') {
            sum = stg.getItem('transpSum');         sum -= val;     stg.setItem('transpSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('transpSumD');         sum -= val;     stg.setItem('transpSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('transpSumM');         sum -= val;     stg.setItem('transpSumM', sum);}
        } else if (type == 'Household') {
            sum = stg.getItem('houseSum');          sum -= val;     stg.setItem('houseSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('houseSumD');          sum -= val;     stg.setItem('houseSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('houseSumM');          sum -= val;     stg.setItem('houseSumM', sum);}
        } else if (type == 'Clothing') {
            sum = stg.getItem('clothingSum');       sum -= val;     stg.setItem('clothingSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('clothingSumD');       sum -= val;     stg.setItem('clothingSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('clothingSumM');       sum -= val;     stg.setItem('clothingSumM', sum);}
        } else if (type == 'Beauty') {
            sum = stg.getItem('beautySum');         sum -= val;     stg.setItem('beautySum', sum);
            if (dayPassed === false)        {sum = stg.getItem('beautySumD');         sum -= val;     stg.setItem('beautySumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('beautySumM');         sum -= val;     stg.setItem('beautySumM', sum);}
        } else if (type == 'Health') {
            sum = stg.getItem('healthSum');         sum -= val;     stg.setItem('healthSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('healthSumD');         sum -= val;     stg.setItem('healthSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('healthSumM');         sum -= val;     stg.setItem('healthSumM', sum);}
        } else if (type == 'Education') {
            sum = stg.getItem('eduactionSum');      sum -= val;     stg.setItem('educationSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('eduactionSumD');      sum -= val;     stg.setItem('educationSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('eduactionSumM');      sum -= val;     stg.setItem('educationSumM', sum);}
        } else {
            sum = stg.getItem('otherExpenseSum');   sum -= val;     stg.setItem('otherExpenseSum', sum);
            if (dayPassed === false)        {sum = stg.getItem('otherExpenseSumD');   sum -= val;     stg.setItem('otherExpenseSumD', sum);}
            if (monthPassed === false)      {sum = stg.getItem('otherExpenseSumM');   sum -= val;     stg.setItem('otherExpenseSumM', sum);}
        }

    }

    document.getElementById(transNo).remove();
    stg.removeItem(transNo);
    msg.style.display = 'none';
});

document.getElementById('frame').addEventListener('click', function() {
    document.getElementById('alert').style.display = 'none';
});