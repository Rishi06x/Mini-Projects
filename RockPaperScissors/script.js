const choices = ['rock', 'paper', 'scissor'];
const playerChoice = document.getElementById('playerChoice');
const computerChoice = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');
let playerScore = 0;
let computerScore = 0;
const result = document.getElementById('resultText');


function play(choice){
    const computer = choices[Math.floor(Math.random() * 3)];
   

    let emoji = {
        "rock" : "👊",
        "paper" : "✋",
        "scissor" : "✌️"
    };

    let symbol = ['👊', '✋', '✌️']; 
    
    let index = 0;

    const interval = setInterval(() => {
        playerChoice.innerHTML = `Player Chose: <span class="emoji"> ${symbol[index]} </span>`;
        computerChoice.innerHTML = `Computer Chose: <span class="emoji"> ${symbol[(index + 2) % 3]} </span>`
        index = (index + 1) % 3;
    },200);

    setTimeout(() => {
        clearInterval(interval);
        playerChoice.innerHTML = `Player Chose: <span class="emoji"> ${emoji[choice]} </span>`;
        computerChoice.innerHTML = `Computer Chose: <span class="emoji"> ${emoji[computer]} </span>`;

        //Displaying the result

        if(choice === computer){
            result.textContent = "It's a Tie!";
            result.style.color = "blue";
        }
        else if((choice === 'rock' && computer === 'scissor') || (choice === 'paper' && computer === 'rock') || (choice === 'scissor' && computer === 'paper')){
            result.textContent = "You Scored!";
            result.style.color = "green";
        }
        else{
            result.textContent = "Computer Scored!";
            result.style.color = "red";
        }

        //Displaying the current score

        if(result.textContent === "You Scored!"){
            document.getElementById('playerScore').textContent = `Player Score: ${++playerScore}`;
        } else if(result.textContent === "Computer Scored!"){
            document.getElementById('computerScore').textContent = `Computer Score: ${++computerScore}`;
        } else{
            return;
        }
    },2000);
    
    


    if(playerScore === 10){
        setTimeout( () => {
            window.alert("You win");
            resetGame();
        },500);
    }

    else if(computerScore === 10){
        setTimeout( () => {
            window.alert("You Lose");
            resetGame();
        },500);
    }
    else{
        return;
    }
}

function resetGame(){
    playerScore = 0;
    computerScore = 0;
    playerChoice.textContent = "Player Chose:";
    computerChoice.textContent = "Computer Chose:";
    resultText.textContent = "Let's Play!";
    document.getElementById('playerScore').textContent = "Player Score: 0";
    document.getElementById('computerScore').textContent = "Computer Score: 0";
    result.style.color = "black"; 
}