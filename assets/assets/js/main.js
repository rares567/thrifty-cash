/*Word Spacing*/

document.getElementById('fact_title').style.wordSpacing = fontSize*0.3 + "px";

/*Fun Facts*/

var arrText = [
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Worn out coins are melted down and used to make new coins.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Worn out bills are shredded, recycled, and then made into roof shingles or fireplace logs.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;So the next time you buy one of those starter logs for your fireplace, you could literally be burning money!",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;While the lifespan of a $100 bill is close to 9 years. And you thought dogs aged fast!<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Here is a total breakdown:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;$1 bill: 18 months<br>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;$5 bill: 2 years<br>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;$10 bill: 3 years<br>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;$20 bill: 4 years<br>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;$50 bill: 9 years<br>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;$100 bill: 9 years<br>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;Coins: 30 years",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;We’ve all heard how dirty money is and how reportedly there are traces of cocaine on 90% of paper money, but did you know that money is dirtier than a household toilet?<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;How about the fact that the flu virus can live on a bill for up to 17 days!",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;After World War I, hyperinflation wreaked havoc on the German currency, causing it to lose almost all of its value.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;As a result, people would give money to kids to play with, and many people used it as wallpaper.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Around the start of the 2000s, Zimbabwe experienced hyperinflation that peaked in 2008.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Just how bad was the hyperinflation?<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;At the peak, a single U.S. Dollar was worth around 2.6 billion Zimbabwe Dollars.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;So if you had just a $1 bill and moved to Zimbabwe, you would be a billionaire.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Unfortunately, a loaf of bread cost around 10.5 billion Zimbabwe Dollars.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;No, the rest isn’t Bitcoin.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;The majority of transactions are all done digitally so no physical currency exchanges hands.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Think about how often you pay for things with your credit or debit card, or online using PayPal.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;This is why only 8% of currency is physical money.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;So high tech that it has trackable, magnetic, and color changing properties.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;The largest bill ever produced (no not the $10 trillion dollar bill) was the $100,000 gold certificate.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;It was made to be used between banks and not for the general public.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;She was on paper money back in 1886, 1891, and 1896.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Since then, no woman has been featured on paper money.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;But women have been featured on coins a number of times.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Pennies buried in a garden will repel slugs, which get electric shocks from touching copper and zinc.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;It costs the government roughly $0.02 to make a single penny.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;In Old English “pygg” was a type of clay that was used for making jars and dishes that held money.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Over the generations, the word eventually morphed into “piggy bank.”",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;There are over 1.6 million ATMs in the world, and there is even one in Antarctica.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;When are ATMs used most?<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Friday is the most popular day at the ATM.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;A study discovered that women who wait until age 30 or older to marry earn more money.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;In fact, the average difference is over $18,000 a year.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;This is because marrying younger means starting a family earlier and missing out on years of income and potential raises at work.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;A person who drives 10 miles (16&nbsp;km) to buy a lottery ticket is 3 times more likely to die in a car accident while driving to buy the ticket than they are in winning the lottery.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Just another reason why you are better off saving and investing your money instead.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;The 1913 Liberty Head nickel sold for $43.7 million dollars.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;It is a rare coin made by a rogue Mint employee.<br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Apparently, there are only 5 known to be in existence.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;In other words, you are wealthier than close to 81 million people.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;The UK's official unit of currency was introduced in the eighth century during the reign of Anglo Saxon King Offa of Mercia.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;This wise piece of advice featured on the first one cent 'Fugio' coin designed by Benjamin Franklin in 1787. The famous “In God We Trust” motto didn't appear on American coins until 1864.",
"<br><br><br>&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;You can arrange the newer 1p, 2p, 5p, 10p, 20p and 50p coins to reveal an esoteric shield design that mimics the coat of arms on the £1 coin. This clever feature was created by designer Matthew Dent in 2008."
];

var arrTitle = [
"FUN FACT #1:<br>MONEY IS RECYCLED WHEN WORN OUT",
"FUN FACT #2:<br>THE TYPICAL LIFESPAN OF A $1 BILL IS JUST 18 MONTHS",
"FUN FACT #3:<br>MONEY IS DIRTY",
"FUN FACT #4:<br>GERMANS USED MONEY AS WALLPAPER",
"FUN FACT #5:<br>MOVE TO ZIMBABWE TO BE A BILLIONAIRE OVERNIGHT",
"FUN FACT #6:<br>ONLY 8% OF THE WORLD’S CURRENCY IS ACTUAL PHYSICAL MONEY",
"FUN FACT #7:<br>THE INK USED TO PRINT MONEY IS HIGH TECH",
"FUN FACT #8:<br>THE U.S. ONCE MADE A $100,000 BILL",
"FUN FACT #9:<br>MARTHA WASHINGTON IS THE ONLY WOMAN TO APPEAR ON A U.S. CURRENCY NOTE",
"FUN FACT #10:<br>PENNIES IN YOUR GARDEN DETER PESTS",
"FUN FACT #11:<br>A PENNY COSTS MORE TO MANUFACTURE THAN IT IS WORTH",
"FUN FACT #12:<br>CURIOUS WHERE PIGGY BANKS ORIGINATED FROM?",
"FUN FACT #13:<br>THERE ARE ATMS ON EVERY CONTINENT ON EARTH",
"FUN FACT #14:<br>WOMEN WHO WAIT TO MARRY EARN MORE",
"FUN FACT #15:<br>THE LOTTERY KILLS YOU",
"FUN FACT #16:<br>A COIN ONCE SOLD FOR OVER $40 MILLION DOLLARS",
"FUN FACT #17:<br>IF YOU HAVE $10 IN YOUR POCKET AND YOU HAVE NO DEBT, YOU ARE WEALTHIER THAN 25% OF AMERICANS",
"FUN FACT #18:<br>POUND STERLING IS THE WORLD'S OLDEST CURRENCY STILL IN USE",
"FUN FACT #19:<br>THE MOTTO ON THE FIRST US COIN WAS “MIND YOUR BUSINESS”",
"FUN FACT #20:<br>UK COINS CAN BE COMBINED TO REVEAL A SECRET SHIELD DESIGN"
];

/*var ranNum;
function noRepeatRNG(numFacts) {
    let arrNum = []
    let i;
    for (i = 0; i < numFacts; i++) {
        arrNum[i] = i; 
    }
    ranNum = [];
    i = arrNum.length;
    let j = 0;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        ranNum.push(arrNum[j]);
        arrNum.splice(j,1);
    }
    return ranNum;
}*/
var random = 0;
function funFact() {
    random = Math.floor(Math.random()*20);
    document.getElementById('fact_p').innerHTML = arrText[random];
    document.getElementById('fact_title').innerHTML = arrTitle[random];
    if (random == 19) {
        var img = document.createElement('img');
        img.src = "assets/images/shield.jpg";
        img.style.width = screen.width/2 + "px";
        img.style.height = screen.width/2 + "px";
        img.style.position = "relative";
        img.style.left = "25%";
        img.style.top = "3%";
        document.getElementById('frame').appendChild(img);
    }
}
document.addEventListener('load', funFact());

/*Icon Click*/

document.getElementById('note_ico').addEventListener('click', function() {
    window.location.href = "assets/html/tipsTricks.html";
});
document.getElementById('manager_ico').addEventListener('click', function() {
    window.location.href = "assets/html/moneyManager.html";
});