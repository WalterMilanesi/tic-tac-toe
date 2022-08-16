const state= {
    gameElement: document.querySelector(".game"),
    // cells: [null, null, null, null, null, null, null, null, null], Es inviable repetir esto constantemente. Imagina si fueran 64 casillas como el ajedrez
    cells: Array(9).fill(null),
    symbol: ['O','X'],
    winningCOmbinations:[
        [0,1,2], //top row
        [3,4,5], //middle row
        [6,7,8], //botton row
        [0,3,6], //left column
        [1,4,7], //middle column
        [2,5,8], //right column
        [0,4,8], //diagonal to the right
        [2,4,6], //diagonal to the left

        //This is hardcoding

    ],
    gameFinished: false
}

function drawBoard() {
    state.gameElement.innerHTML='';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    if(state.cells[i]){ //does the cell have an x or an o? if so, this code runs

        const cellSymbol= document.createElement('p');
        cellSymbol.classList.add('symbol');
        cellSymbol.innerText = state.cells[i];
        cell.append(cellSymbol);

    } else { //otherwise it must be empty, so run this next section

        cell.addEventListener('click', function(){

            if (state.gameFinished){
                return
            } 

            state.symbol.reverse();
            state.cells[i]= state.symbol[0];
            drawBoard()

            if(checkForWinner()){
                //winner code goes here
                state.gameFinished= true;
                drawMessage(`Player ${state.symbol[0]} won`);
            }
            
            //Para mi orgullo lo arreglé yo solo
            if(checkforDraw()&& state.gameFinished=== false){
                state.gameFinished= true;
                drawMessage("It's a draw!")

            }
        })
    }

    state.gameElement.append(cell);
  }
}

//En el último momento agregamos el parámetro message
function drawMessage(message){
    const banner= document.createElement('div');
    banner.classList.add('banner');

    const h1= document.createElement('h1');
    h1.innerText= message;
    banner.append(h1);

    state.gameElement.append(banner)
}




function checkForWinner(){
    return state.winningCOmbinations.some(function(combo){
        const cells= combo.map(function(index){
            return state.cells[index]
        })

        //the array does not have null AND all of the values are the same (This return True or False)
        return !(cells.includes(null)) && new Set(cells).size === 1 //El objeto Set toma una array y elimina los duplicados devolviendo un array nuevo. Size mide el tamaño del array
    
    })

}

function checkforDraw (){
    return state.cells.every(function(cell){
        return cell !== null
    })
}



drawBoard();
