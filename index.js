let form = document.getElementById( "deck" );
let win = document.getElementById( "w" );
let lose = document.getElementById( "l" );
let element = document.getElementById( "div1" );
let decks = JSON.parse( localStorage.getItem( "decksList" ) ) || [];

class Deck{
    constructor( deckname, winc, losc ){ 
        this.deckname = deckname;
        this.winc = winc;
        this.losc = losc;
    }
}

function showDetails(){
    element.innerHTML = "" ;
    JSON.parse( localStorage.getItem( "decksList" ) );

    for( let i = 0; i < decks.length; i++ ) {
        const tp = decks[ i ].winc + decks[ i ].losc;
        const wr = decks[ i ].winc * 100 / tp;
        const wrFixed = Math.round( wr * 10 ) /10;
        element.innerHTML += '<button class="un" id= '+ i +' onclick="remove( ' + i +' )">x</button><h2>' + decks[ i ].deckname + "</h2><p>TP: " + tp +" WR: " + wrFixed +"%</p><br>";
    }
}


function addWin(){
    addResult( true );
}

function addLose(){
    addResult( false )
}

//determina si existe el objeto dentro del array decks
function deckExists( d ){
    //mapea el array para buscar elementos dentro del objeto
    return decks.map( deck => deck.deckname ).includes( d )
}

function addResult( isWin ){
    
    if ( !deckExists( form.value ) ){ 
        decks.push( new Deck( form.value,isWin ? 1 : 0, isWin ? 0 : 1 ) );
        
    } else {
        let i = decks.map( deck => deck.deckname ).indexOf( form.value );
        const sumWin = isWin ? 1 : 0;
        const sumLose = isWin ? 0 : 1;
        decks[ i ].winc += sumWin;
        decks[ i ].losc += sumLose;
    }
    
    refreshData();
}

function remove( i ){
    //splice(index, cantidad de elementos que se eliminaran a partir del index)
    decks.splice( i,1 );
    refreshData();
}

function refreshData(){
    localStorage.setItem( "decksList", JSON.stringify( decks ) );
    form.value = "";
    showDetails();
}


window.onload = showDetails();