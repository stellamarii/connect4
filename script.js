

class C4 {
    static winningDeals = [[0,1,2,3], [1,2,3,4], [2,3,4,5], [3,4,5,6], [7,8,9,10], [8,9,10,11], [9,10,11,12], [10,11,12,13], [14,15,16,17], [15,16,17,18], [16,17,18,19], [17,18,19,20], [21,22,23,24], [22,23,24,25], [23,24,25,26], [24,25,26,27], [28,29,30,31], [29,30,31,32], [30,31,32,33], [31,32,33,34], [35,36,37,38], [36,37,38,39], [37,38,39,40], [38,39,40,41], [0,7,14,21], [7,14,21,28], [14,21,28,35], [1,8,15,22], [8,15,22,29], [15,22,29,36], [2,9,16,23], [9,16,23,30], [16,23,30,37], [3,10,17,24], [10,17,24,31], [17,24,31,38], [4,11,18,25], [11,18,25,32], [18,25,32,39], [5,12,19,26], [12,19,26,33], [19,26,33,40], [6,13,20,27], [13,20,27,34], [20,27,34,41], [3,11,19,27], [2,10,18,26], [10,18,26,34], [1,9,17,25], [9,17,25,33], [17,25,33,41], [0,8,16,24], [8,16,24,32], [16,24,32,40], [7,15,23,31], [15,23,31,39], [14,22,30,38], [3,9,15,21], [4,10,16,22], [10,16,22,28], [5,11,17,23], [11,17,23,29], [17,23,29,35], [6,12,18,24], [12,18,24,30], [18,24,30,36], [13,19,25,31], [19,25,31,37], [20,26,32,38]];
    static ratings = {};
    constructor(place, who){
        this.place = place;
        this.who = who;
    }

    nextPlayer(){return (this.who=="X")?"N":"X";}

    nextMoves(){
        let a=[];
        for(let i=0; i<7; i++){
            let move = availableMoves[i]
                a.push(new C4(this.place.substring(0, move)+this.who+this.place.substring(move+1), this.nextPlayer()));
        }
        return a;

    }

    click(nr){
        
        if ((this.place[nr] == ".") && (availableMoves.includes(nr))){
            if(nr-7 >= 0){
                availableMoves.push(nr-7);
            }
            availableMoves = availableMoves.filter(item => item !== nr);

            return new C4(this.place.substring(0, nr) + this.who + this.place.substring(nr+1), this.nextPlayer());
            
        } else {
            console.log("ei saa peale käia");
        }
        
        return this;
    }

    ifWin(){
        let win = false;
        let whoWon = this.nextPlayer();
        const self = this;
        C4.winningDeals.forEach(function(winningArrays){
            if(self.place[winningArrays[0]]==whoWon &&
                self.place[winningArrays[1]]==whoWon &&
                self.place[winningArrays[2]]==whoWon &&
                self.place[winningArrays[3]]==whoWon){
                win=true;
            }
        });
        return win;
    }

    ifTie(){
        if(this.ifWin() && length(availableMoves) == 0){
            return false;
        } else {
            return this.place.indexOf(".") == -1;
        }
    }

    boardRating(){
/*         //not working, because nextmoves doesnt work
        if(this.ifWin()){return this.who == "X"?-1:1;}
        
        let h = this.nextMoves().map(places => places.boardRating());
        return (this.who =="X"?Math.max(...h):Math.min(...h)); */

        if(this.ifWin()){return this.who == "X"?-1:1;}
        if(this.ifTie()){return 0;}
        //let h = this.alamseisud().map(seis => seis.seisuHinnang());
        let r2si = JSON.stringify(this);
        if(!(r2si in C4.ratings)){
            let a = this.nextMoves();
            let h = [];
            let bestMove = (this.who == "X")?1:-1;
            for(let i = 0; i<a.length; i++){
                let sh = a[i].boardRating();
                if(sh == bestMove){
                    return bestMove;
                }
                h.push(sh);
            }
            ratings[r2si] = (this.who =="X"?Math.max(...h):Math.min(...h));
        }
        return C4.ratings[r2si];
    }

    compMove(){
        //doesnt work
        var randomValue = availableMoves[Math.floor(availableMoves.length * Math.random())];
        return randomValue;
    }
}

let availableMoves = [41, 40, 39, 38, 37, 36, 35];
let currentBoard = new C4  ("......."+
                            "......."+
                            "......."+
                            "......."+
                            "......."+
                            ".......",
                            "X");



function compButton(){
    //doesnt work
    currentBoard=currentBoard.compMove();
    show();
}

function show(){
    let v = [];
    for(let i = 0; i < 42; i++){
        v.push(`<span onclick='clicked(${i})'>${currentBoard.place[i]}</span>`);
        if((i > 0) && (i % 7 == 6)){v.push("<br/>");}
    }
    if(currentBoard.ifWin()){
        v.push(currentBoard.nextPlayer() + " võit");
        availableMoves = [];
    } else if (currentBoard.ifTie()){
        v.push("viik");
    } else {
        v.push(currentBoard.who + " kord<br>");
    }
    board.innerHTML = v.join("");
    console.log(currentBoard);
    console.log(availableMoves);
    console.log(currentBoard.nextMoves());
    nextmoves.innerText = currentBoard.boardRating();
}

function clicked(nr){
    if(availableMoves.includes(nr)){
        console.log(currentBoard.who + " vajutas " + nr);
        currentBoard = currentBoard.click(nr);
    } else {
        console.log("lubamatu käik");
    }
    show();
}
