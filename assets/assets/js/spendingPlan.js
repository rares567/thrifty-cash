document.getElementById('frame').style.width = screen.width*0.7 + "px";

/*Spending Plan Calculator*/ 

var button = document.getElementById('calc_button');
button.addEventListener('click', function() {
    var earn = [];
    var essExp = [];
    var persExp = [];
    earn[0] = document.getElementById('salary').value;
    earn[1] = document.getElementById('bonus').value;
    earn[2] = document.getElementById('dividends').value;
    earn[3] = document.getElementById('interest').value;
    earn[4] = document.getElementById('other_earn').value;
    var earnSum = 0;
    for (var i = 0; i < earn.length; i++) {
        if (earn[i] == "") {
            earn[i] = 0;
        }
        earn[i] = parseFloat(earn[i], 10);
        earnSum += earn[i];
    }
    essExp[0] = document.getElementById('installment').value;
    essExp[1] = document.getElementById('phone').value;
    essExp[2] = document.getElementById('water').value;
    essExp[3] = document.getElementById('electricity').value;
    essExp[4] = document.getElementById('gas').value;
    essExp[5] = document.getElementById('property').value;
    essExp[6] = document.getElementById('food').value;
    essExp[7] = document.getElementById('vehicle').value;
    essExp[8] = document.getElementById('health').value;
    essExp[9] = document.getElementById('other_ess_exp').value;
    var essExpSum = 0;
    for (i = 0; i < essExp.length; i++) {
        if (essExp[i] == "") {
            essExp[i] = 0;
        }
        essExp[i] = parseFloat(essExp[i], 10);
        essExpSum += essExp[i];
    }
    persExp[0] = document.getElementById('free').value;
    persExp[1] = document.getElementById('holiday').value;
    persExp[2] = document.getElementById('clothes').value;
    persExp[3] = document.getElementById('hobby').value;
    persExp[4] = document.getElementById('other_pers_exp').value;
    var persExpSum = 0;
    for (i = 0; i < persExp.length; i++) {
        if (persExp[i] == "") {
            persExp[i] = 0;
        }
        persExp[i] = parseFloat(persExp[i], 10);
        persExpSum += persExp[i];
    }
    var pctEssExp = essExpSum/earnSum*100;
    pctEssExp = pctEssExp.toFixed(1);
    pctEssExp = parseFloat(pctEssExp, 10);
    if (pctEssExp%1 == 0) {
        pctEssExp = pctEssExp.toFixed(0);
    }
    if (isNaN(pctEssExp)) {
        pctEssExp = 0;
    }
    var pctPersExp = persExpSum/earnSum*100;
    pctPersExp = pctPersExp.toFixed(1);
    pctPersExp = parseFloat(pctPersExp, 10);
    if (pctPersExp%1 == 0) {
        pctPersExp = pctPersExp.toFixed(0);
    }
    if (isNaN(pctPersExp)) {
        pctPersExp = 0;
    }
    var totalSave = earnSum - essExpSum - persExpSum;
    var pctTotalSave = totalSave/earnSum*100;
    pctTotalSave = pctTotalSave.toFixed(1);
    pctTotalSave = parseFloat(pctTotalSave, 10);
    if (pctTotalSave%1 == 0) {
        pctTotalSave = pctTotalSave.toFixed(0);
    }
    if (isNaN(pctTotalSave)) {
        pctTotalSave = 0;
    }
    document.getElementById('total_earn').innerHTML = earnSum;
    document.getElementById('total_ess_exp').innerHTML = essExpSum + '<br>' + pctEssExp + '% earnings';
    document.getElementById('total_pers_exp').innerHTML = persExpSum + '<br>' + pctPersExp + '% earnings';
    document.getElementById('total_savings').innerHTML = totalSave + '<br>' + pctTotalSave + '% earnings';
    document.getElementById('results').style.display = "block";
    document.getElementById('results').scrollIntoView({
        behavior: 'smooth'
    });
});