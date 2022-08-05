let buttonColor=['red' , 'green' , 'blue' , 'yellow'];
let gamePattern=[];
let userClickedPattern=[];

let level=0;
let started=false;

function playSound(random){
    let audio=new Audio('sounds/' + random + '.mp3');
    audio.play();
}

function nextSequence(){
    ++level;
    userClickedPattern=[];
    let random=Math.floor(Math.random() * 4);
    let randomButton=buttonColor[random];
    gamePattern.push(randomButton);
    $('#level-title').text('Level ' + level);
    $('#' + buttonColor[random]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomButton);
}


function animate(chosenColor){
    $('.' + chosenColor).addClass('pressed');

    setTimeout(function(){
        $('#' + chosenColor).removeClass('pressed');
    } , 100);
}


function check(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            } , 100);
        }
    }
    else{
        playSound("wrong");
        $('#level-title').text('Game Over , Press Any Key To Restart The Game');
        $('body').attr('class' , 'game-over');
        setTimeout(function(){
            $('body').removeAttr('class');
        } , 100);

        gameOver();
    }
}


function gameOver(){
    gamePattern=[];
    started=!(started);
    level=0;
}


$(document).keypress(function(){

    if(!started){
        nextSequence();
        started=true;
    }
});





$('.btn').click(function(){
    let userChosenColor=$(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animate(userChosenColor);
    check(userClickedPattern.length-1);
})



















