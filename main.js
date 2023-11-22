let uncoveredCards=0;
let card1=null;
let card2=null;
let firstResult=null;
let secondResult=null;
let movements=0;
let movLetter=null;
let success=0;
let successLetter=null;
let timer=false;
let seconds=60;
let countdown=null;
let timerLetter=document.getElementById('tiempo');

let propositions=['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h'];
propositions = propositions.sort(()=>{return Math.random()-0.5});
console.log(propositions);


function countTime()
{
    countdown=setInterval(()=>{
        seconds--;
        timerLetter.innerHTML = `Tiempo: ${seconds} segundos`;
        if(seconds==0)
        {
            clearInterval(countdown);
            blockCards();
        }
    },1000);
}

function blockCards()
{
    for(var i=0;i<=15;i++)
    {
        let blockedCard=document.getElementById(i);
        blockedCard.innerHTML = propositions[i];
        blockedCard.disabled=true;
    }
}

function uncover(id)
{
    if(timer==false)
    {
        countTime();
        timer=true;
    }
    uncoveredCards++;
    if(uncoveredCards==1){
        card1=document.getElementById(id);
        firstResult=propositions[id];
        card1.innerHTML = firstResult;

        card1.disabled=true;
    }else if(uncoveredCards==2){
        card2=document.getElementById(id);
        secondResult = propositions[id];
        card2.innerHTML = secondResult;
        card2.disabled=true;
        IncreaseMovement();
        if(firstResult==secondResult)
        {
            uncoveredCards=0;
            IncreaseSuccess();
        }
        else{
            setTimeout(()=>{
                card1.innerHTML=' ';
                card2.innerHTML=' ';
                card1.disabled=false;
                card2.disabled= false;
                uncoveredCards=0;
            },800);
        }
    }
}

function IncreaseSuccess()
{
    success++;
    successLetter=document.getElementById('aciertos');
    successLetter.innerHTML = `Aciertos: ${success}`;
}

function IncreaseMovement()
{
    movements++;
    movLetter=document.getElementById('movimientos');
    movLetter.innerHTML = `Movimientos: ${movements}`;
}
