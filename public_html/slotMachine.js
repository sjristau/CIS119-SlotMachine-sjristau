function rng() {
    for (i = 0; i < 3; i++){
    var slotVal = Math.floor(Math.random() * 6) + 0;
    slotSel.push(slotName[slotVal]);
    }
}

function find(value){
    var matches = 0;
    for (i = 0; i < 3; i++){
        if(slotSel[i] === value){
            matches++;
        }
    }
    return matches;
}

/*MAIN*/
var slotName = ['Cherries', 'Oranges', 'Plums', 'Bells', 'Melons', 'Bars'];
var playAgain = true;
var betWinnings = false;
var totalEarnings = 0;
var totalWage = 0;
var roundsPlayed = 0;

while (playAgain === true){
    roundsPlayed++;
    var slotSel = [];
    var slotOccur = [];
    rng();
    
    if (totalEarnings > 0){
        var betWinnings = confirm("Do you want to bet from your winnings? Currently: $" + totalEarnings + ".");
        if (betWinnings === true){
            bet = 0;
            bet = Number(prompt("Winnings: $" + totalEarnings + ". Enter an amount. To add money, press 'Cancel'."));
            while (bet > totalEarnings){
                bet = Number(prompt("Error: Cannot bet more than earned. Winnings: $" + totalEarnings + ". Enter an amount. To add money, press 'Cancel'."));
            }
            if (bet >= 1){
                totalEarnings -= bet;
            } else {
                betWinnings === false;
            }
        }
    }
    if (betWinnings === false || bet === 0){
        var bet = Number(prompt("Place your bet:"));
    }
    
    while (isNaN(bet) === true){
        bet = Number(prompt("Error: Must be a number!"));
        if (betWinnings === true) {
            totalEarnings -= bet;
        }
    }
    while (bet < 0){
        bet = Number(prompt("Error: Bet cannot be negative!"));
        if (betWinnings === true) {
            totalEarnings -= bet;
        }
    }
    totalWage += bet;
    for (a = 0; a < 6; a++){
        slotOccur[a] = find(slotName[a]);
    }
    var largestOccur = Math.max.apply(Math, slotOccur);
    alert(slotSel[0] + " | " + slotSel[1] + " | " + slotSel[2]);
    if (largestOccur === 1){
        totalEarnings -= bet;
        alert("You lost $" + (bet)+ ".");
    } else if (largestOccur === 2){
        totalEarnings += (bet * 2);
        alert("You won $" + (bet * 2) + "!");
    } else if (largestOccur === 3){
        totalEarnings += (bet * 3);
        alert("You won $" + (bet * 3) + "!");
    }
    if (totalEarnings >= 1){
        playAgain = confirm("Do you want to play another round?");
    } else {
        playAgain = confirm("Bankrupt! Click 'OK' to insert more money, or 'Cancel' to quit.");
    }
}

document.write("You bet $" + totalWage + " over " + roundsPlayed + " rounds.<br>");
if (totalEarnings < 0){
    document.write("You lost a total of $" + (-1 * totalEarnings) + ".<br>");
}
else {
    document.write("You won a total of $" + totalEarnings + ".<br>");
}
document.write("Thanks for playing!");