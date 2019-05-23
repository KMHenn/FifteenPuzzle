let letters = ["a", "b", "c", "d"];

/* Reset the board */
function reset(){
    //console.log("Clicked reset");
    let count = 1;
    for (let i = 0; i <= 3; i++){
        for (let j = 0; j <= 3; j++){
            let id = letters[i] + j;
            if (id !== "d3")
                document.getElementById(id).innerHTML = count;
            else
                document.getElementById(id).innerHTML = " ";
            document.getElementById(id).style.backgroundColor = "white";
            count++;
        }
    }
}

/* Scramble the board */
function scramble(){
    //console.log("Clicked scramble");
    // Try a loop to simulate an idiot player
    let iterations = Math.random() * (200) + 10;
    for (let i = 0; i < iterations; i++){
        let row = Math.floor(Math.random() * 4);
        let col = Math.floor(Math.random() * 4);
        let scrambleid = letters[row] + col;
        let text = document.getElementById("puzzle").rows[row].cells.namedItem(scrambleid).innerHTML;
        console.log("Row: " + row + "\tCol: " + col + "\tText: " + text + "\n");
        //let text = document.getElementById(scrambleid).innerHTML;
        movePiece(scrambleid, text, true);
    }
    // TODO
}

/* Process a tile click */
function movePiece(id, text, scramble){
    let row = id.charAt(0);
    let col = parseInt(id.charAt(1), 10);
    let ind;
    let minRow;
    let maxRow;
    let minCol;
    let maxCol;

    // Convert letter row to number
    switch(row){
        case "a":
            ind = 0;
        break;

        case "b":
            ind = 1;
        break;

        case "c":
            ind = 2;
        break;

        case "d":
            ind = 3;
        break;
    }

    // Find upper and lower bounds on the rows we can check
    if (ind === 0){
        minRow = 0;
        maxRow = 1;
    }
    else if (ind === 3){
        minRow = 2;
        maxRow = 3;
    }
    else{
        minRow = ind - 1;
        maxRow = ind + 1;
    }

    // Find upper and lower bounds on the columns we can check
    if (col === 0){
        minCol = 0;
        maxCol = 1;
    }
    else if (col === 3){
        minCol = 2;
        maxCol = 3;
    }
    else{
        minCol = col - 1;
        maxCol = col + 1;
    }

    for (let i = minRow; i <= maxRow; i++){
        //console.log("i: " + i);
        for (let j = minCol; j <= maxCol; j++){
            let tempId = letters[i] + j;
            if (tempId !== id){
                //console.log("\tj: " + j);
                //console.log("\t\ttempId: " + tempId + "\tid: " + id);
                if (((ind !== i) && (col === j)) || ((ind === i) && (col !== j))){ // Check if the move is legal
                    if (document.getElementById(tempId).innerHTML === " "){ // Check if the neighbor cell is empty
                        console.log("\t\t\tswapping [" + ind + ", " + col + "] with [" + i + ", " + j + "]");
                        document.getElementById("puzzle").rows[ind].cells.namedItem(id).innerHTML = " ";
                        document.getElementById("puzzle").rows[i].cells.namedItem(tempId).innerHTML = text;
                        if (!scramble)
                            checkWin();
                        return;
                    }
                }
            }
        }
    }
}

/* Check if the board is solved */
function checkWin(){
    let winString = "123456789101112131415 ";
    let boardString = "";
    for (let i = 0; i <= 3; i++){
        for (let j = 0; j <= 3; j++){
            let id = letters[i] + j;
            boardString += document.getElementById(id).innerHTML;
        }
    } 
    console.log("Board string: " + boardString);
    if (winString === boardString){
        for (let i = 0; i <= 3; i++){
            for (let j = 0; j <= 3; j++){
                let id = letters[i] + j;
                document.getElementById(id).style.backgroundColor = "yellow";
            }
        }
        return true;
    }
    return false;
}