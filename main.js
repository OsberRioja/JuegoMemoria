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
let firstId=null;
let secondId=null;

let cards = [
    { value: 'a'},
    { value: 'b'},
    { value: 'c'},
    { value: 'd'},
    { value: 'e'},
    { value: 'f'},
    { value: 'g'},
    { value: 'h'},
    { value: '1'},
    { value: '2'},
    { value: '3'},
    { value: '4'},
    { value: '5'},
    { value: '6'},
    { value: '7'},
    { value: '8'},
];

function shuffleCards(cards) {
    cards = cards.sort(()=>{return Math.random()-0.5});
}

//establecer pares
let pairs = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8,
     '1':'a','2':'b','3':'c','4':'d','5':'e','6':'f','7':'g','8':'h'
};

// Desordenar las cartas
shuffleCards(cards);
console.log(cards);


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
        blockedCard.innerHTML = cards[i].value;
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
        firstResult=cards[id].value;
        card1.innerHTML = firstResult;
        card1.disabled=true;
    }else if(uncoveredCards==2){
        card2=document.getElementById(id);
        secondResult = cards[id].value;
        card2.innerHTML = secondResult;
        card2.disabled=true;
        IncreaseMovement();
        if(pairs[secondResult]==firstResult)
        {
            uncoveredCards=0;
            IncreaseSuccess();
            if(success==8)
            {
                clearInterval(countdown);
                timerLetter.innerHTML=`GANASTE!!!`;
            }
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
