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
let InitTimer=60;
let seconds=InitTimer;
let countdown=null;
let scoreLetter=document.getElementById('score');
let timerLetter=document.getElementById('tiempo');
let firstId=null;
let secondId=null;

let cards = [
    { value: '(P n Q)'},//a
    { value: '[(P n Q) n R]'},//b
    { value: '[P n (Q u R)]'},//c
    { value: '(P n P)'},//d
    { value: '(Q u Q)'},//e
    { value: '(P n F)'},//f
    { value: '(Q u V)'},//g
    { value: '(P -> Q)'},//h
    { value: '(Q n P)'},//1
    { value: '[P n (Q n R)]'},//2
    { value: '[(P n Q)u(P n R)]'},//3
    { value: 'P'},//4
    { value: 'Q'},//5
    { value: 'F'},//6
    { value: 'V'},//7
    { value: '(~P u Q)'},//8
];


function Restart() {
    clearInterval(countdown); // Detiene el temporizador si está activo
    timer=false;
    seconds = InitTimer; // Reinicia el contador de segundos
    timerLetter.innerHTML = `Tiempo: ${seconds} segundos`; // Actualiza la visualización del tiempo

    uncoveredCards = 0; // Reinicia el conteo de cartas descubiertas
    movements = 0; // Reinicia el contador de movimientos
    success = 0; // Reinicia el contador de aciertos

    movLetter.innerHTML = `Movimientos: ${movements}`; // Actualiza la visualización de movimientos
    successLetter.innerHTML = `Aciertos: ${success}`; // Actualiza la visualización de aciertos

    // Habilita todas las cartas y limpia su contenido
    for (let i = 0; i < 16; i++) {
        let currentCard = document.getElementById(i);
        currentCard.innerHTML = ' ';
        currentCard.disabled = false;
    }

    shuffleCards(cards); // Vuelve a mezclar las cartas
}

function shuffleCards(cards) {
    cards = cards.sort(()=>{return Math.random()-0.5});
}

//establecer pares
let pairs = {
    '(P n Q)': '(Q n P)', '[(P n Q) n R]': '[P n (Q n R)]', '[P n (Q u R)]': '[(P n Q)u(P n R)]', '(P n P)': 'P', '(Q u Q)': 'Q', '(P n F)': 'F', '(Q u V)': 'V', '(P -> Q)': '(~P u Q)',
    '(Q n P)':'(P n Q)','[P n (Q n R)]':'[(P n Q) n R]','[(P n Q)u(P n R)]':'[P n (Q u R)]','P':'(P n P)','Q':'(Q u Q)','F':'(P n F)','V':'(Q u V)','(~P u Q)':'(P -> Q)'
};

// Desordenar las cartas
shuffleCards(cards);


function countTime()
{
    countdown=setInterval(()=>{
        seconds--;
        timerLetter.innerHTML = `Tiempo: ${seconds} segundos`;
        if(seconds==0)
        {
            clearInterval(countdown);
            blockCards();
            var score=CalculateScore(success,movements,seconds);
            //console.log('seconds:',seconds,'aciertos:',success,'movimientos:',movements,'tiempo:',seconds);
            scoreLetter.innerHTML=`PUNTAJE: ${score}`;
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
    console.log(uncoveredCards);
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
                let timeFinished=calculateTime(seconds);
                var score=CalculateScore(success,movements,seconds);  
                timerLetter.innerHTML=`GANASTE!!! en ${timeFinished} segundos`;
                scoreLetter.innerHTML=`PUNTAJE: ${score}`;
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


function CalculateScore(finalSucces, finalmovements, tiemeLeft) {
    const weigthSucces = 10; // Peso de los aciertos en el puntaje
    const weigthMovements = 1; // Peso de los movimientos en el puntaje
    const weigthTime = 5; // Peso del tiempo en el puntaje

    // Calcular el puntaje basado en los parámetros recibidos y los pesos asignados
    let score = (finalSucces * weigthSucces) - (finalmovements * weigthMovements) + (tiemeLeft * weigthTime);

    // Asegurar que el puntaje mínimo sea 0 si no hay aciertos
    score = Math.max(0, score);

    return score;
}

function calculateTime(time)
{
    let timeLeft=InitTimer-time;
    return timeLeft;
}