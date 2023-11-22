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

let propositions=['a','b','c','d','e','f','g','h'];
let equivalence=['1','2','3','4','5','6','7','8'];

// Función para crear pares de elementos
function createPairs(arr1, arr2) {
    let pairs = [];
    for (let i = 0; i < arr1.length; i++) {
        pairs.push([arr1[i], arr2[i]]);
    }
    return pairs;
}
//crear pares de proposiciones y equivalencias
let pairs = createPairs(propositions, equivalence);

// Función para desordenar manteniendo la relación entre los pares
function shufflePairs(pairs) {
    let currentIndex = pairs.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Intercambiar elementos mientras se mantiene la relación de pares
        [pairs[currentIndex], pairs[randomIndex]] = [pairs[randomIndex], pairs[currentIndex]];
    }
    return pairs;
}

// Desordenar los pares manteniendo la relación
pairs = shufflePairs(pairs);

// Separar los pares desordenados en sus arreglos respectivos
for (let i = 0; i < pairs.length; i++) {
    propositions[i] = pairs[i][0];
    equivalence[i] = pairs[i][1];
}
console.log(propositions);
console.log(equivalence);



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
