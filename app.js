/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,activePlayer,gamePlaying,endGame,diceNo;


// document.querySelector('#current-' + activePlayer).textContent= dice;

// reset game
resetGame()

endGame = 100;
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // get random number
        var  dice0 = Math.floor(Math.random()*6 + 1);
        var dice1  = (diceNo === 2)?Math.floor(Math.random()*6 + 1):0  ;
        //display the result
        var diceDom0 = document.getElementById('dice0');

        var diceDom1 = document.getElementById('dice1');
        console.log(diceDom1);
        console.log(diceDom0.parentElement);
        diceDom0.src = 'dice-'+ dice0 +'.png';
        if(diceNo === 2)diceDom1.src = 'dice-'+ dice1 +'.png';
        // diceDom0.style.display = 'block';
        
   
        // update roundScore if result isn't 1
        if(diceNo === 1){
            if(dice0 !==  1){
                roundScore += dice0 + dice1;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
            else{
                nextPlayer();
            }  
        }
        if(diceNo === 2){
            if(dice0 === dice1 ){
                nextPlayer();
            }
            else{
                roundScore += dice0 + dice1;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }  
        }
        

 
        
    }
})

// hold button event handler
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
// update the players global score
scores[activePlayer] += roundScore 

// update the ui of the global score
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

// check if the player won
if(scores[activePlayer] >= endGame){
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
    gamePlaying = false;
}
else{
    // next player
nextPlayer();
}
    }  
});

document.querySelector('.btn-new').addEventListener('click', function(){
 resetGame()
});
document.querySelector('.btn-settings').addEventListener('click',function(){
    gamePlaying = false;
    document.getElementById('settings-pane').style.display = 'block'
})
document.getElementById('save').addEventListener('click',function(){
    endGame =  document.querySelector('.endgame').value;
    var e = document.getElementById('dice-no');
    console.log(e.options[e.selectedIndex].value);
    switch(e.options[e.selectedIndex].value){
        case 'one':
            diceNo = 1;
            document.querySelector('.dice0').parentNode.classList.remove('dice-container-2');
            document.querySelector('.dice0').parentNode.classList.add('dice');
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice0').style.width = '100%';
            document.querySelector('.dice0').style.float = 'none';

            break;
        case 'two':
            diceNo = 2;
            document.querySelector('.dice0').parentNode.classList.add('dice-container-2');
            document.querySelector('.dice0').parentNode.classList.remove('dice');
            document.querySelector('.dice1').style.display = 'block';
            document.querySelector('.dice0').style.width = '50%';
            document.querySelector('.dice0').style.float = 'left';
            break;
    }
    document.getElementById('settings-pane').style.display = 'none';
    gamePlaying = true;
    resetGame();
    console.log(diceNo);
})


// function next player
function nextPlayer(){
    activePlayer = (activePlayer === 0)? 1:0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
// function reset game
function resetGame(){    
    scores = [0,0];
    roundScore = 0;
    activePlayer != undefined? document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1):
    activePlayer = 0;
    // document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-' + activePlayer +'-panel').classList.add('active');
    document.querySelector('.player-' + activePlayer +'-panel').classList.remove('winner');
    gamePlaying = true;
}