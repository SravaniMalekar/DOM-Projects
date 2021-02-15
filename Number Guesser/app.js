// GAME FUNCTION
// -Player must guess the number between a min and max value
// -Player gets a certain amount of guesses
// -Notify player of guesses remaining
// -Notify player of the correct answer if loose
// -let player choose to play again


//GAME VALUES
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft =3;

//UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Asssign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//PLay again event listener
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if correct number
    if(guess === winningNum){
        gameOver(true, `${winningNum} is correct. YOU WIN!`);
        
    }else{
        //number of guesses left
        guessesLeft -=1;

        if(guessesLeft === 0){
            //game over -lost

            gameOver(false, `Game over..you lost.The correct number was ${winningNum}`);
        }else{
            //game continue
            //change border color
            guessInput.style.borderColor = 'red';

            //clear input
            guessInput.value ='';
            //send message
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    
            
        }

    }
});

//gameover function
function gameOver(won,msg){

    won === true? color = 'green' : color ='red'; 


        //Disable input 
    guessInput.disabled = won;
        //change border color
    guessInput.style.borderColor = color;
        //send message
    setMessage(msg,color);

    //play again

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Set message
function setMessage(msg,color){
    message.textContent = msg;
    message.style.color = color;
}

//get winning number
function getRandomNum(min,max){
    return (Math.floor(Math.random()*(max-min +1)+min));
}

    