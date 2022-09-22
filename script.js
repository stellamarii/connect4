

class C4 {
    constructor(place, who){
        this.place = place;
        this.who = who;
    }

    nextPlayer(){return (this.who=="X")?"N":"X";}

    nextMoves(){
        let m = [];
    }

    tekstina(){
        let m=new Array(42).fill("_");
        m[this.place-1]=this.who;
        return m.join(" ");
    }

    click(nr){
        if ((this.place[nr] == ".") && (availableMoves.includes(nr))){
            availableMoves.push(nr-7);
            availableMoves = availableMoves.filter(item => item !== nr);
            return new C4(this.place.substring(0, nr) + this.who + this.place.substring(nr+1) , this.nextPlayer());
            
        } else {
            console.log("ei saa peale käia");
        }
        return this;
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


function show(){
    let v = [];
    for(let i = 0; i < 42; i++){
        v.push(`<span onclick='clicked(${i})'>${currentBoard.place[i]}</span>`);
        if((i > 0) && (i % 7 == 6)){v.push("<br/>");}
    }
    v.push(currentBoard.who + " kord<br>");
    board.innerHTML = v.join("");
    console.log(availableMoves);

}

function clicked(nr){
    console.log(currentBoard.who + " vajutas " + nr);
    currentBoard = currentBoard.click(nr);
    show();
}
