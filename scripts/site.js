$( document ).ready(function() {
var game = true,
    playing = true,
    display = '<i class="fa fa-circle-o fa-5x text-red" aria-hidden="true"></i>',
    message = 'Player <span class="text-red">O</span>  Starts',
    playerTurn = $("#player-turn"),
    player = "O",
    count = 0,
    board = {"cell-0": "",
             "cell-1": "",
             "cell-2": "",
             "cell-3": "",
             "cell-4": "",
             "cell-5": "",
             "cell-6": "",
             "cell-7": "",
             "cell-8": ""};


var playGame = function(){
    if(game && (count < 8)){
        display = '<i class="fa fa-circle-o fa-5x text-red" aria-hidden="true"></i>';
        player = "O";
        message = 'Player <span class="text-blue">X</span> Turn';
    } else if(playing && (count < 8)){
        display = '<i class="fa fa-times fa-5x text-blue" aria-hidden="true"></i>';
        player = "X";
        message = 'Player <span class="text-red">O</span> Turn';
    } else{
        message = '<span>STALEMATE!!</span>';
        playerTurn.html(message);
    }
    game = !game;
    count += 1;
    playerTurn.html(message);
}

var check = function(item1, item2, item3){
    if((board["cell-"+item1] === "O") 
        && (board["cell-"+item2] === "O" )
        && (board["cell-"+item3] === "O")){ 
        message = '<span class="text-red">O</span> Wins!!';
        playing = false;
    } else if((board["cell-"+item1] === "X") 
        && (board["cell-"+item2] === "X" )
        && (board["cell-"+item3] === "X")){ 
        message = '<span class="text-blue">X</span> Wins!!';
        playing = false;
    } else{
        return false;
    }
    playerTurn.html(message);
}

var checkBoard = function(){
    var rowO = 0,
        rowX = 0,
        colCount = 0;
   
    check(0, 4, 8);
    check(2, 4, 6);

    for(var item = 0; item<9; item++){
        if(colCount < 3){
            check(colCount, colCount+3, colCount+6);
        } else if(item % 3 === 0) {
            check(item-3, item-2, item-1);
        }
        colCount += 1;
    }
}

playerTurn.html(message);
$(".cell").click(function(event) {
    if ($(".cell").is(':empty') && playing === true){
        var id = $(this).attr('id');
        console.log(id + " was clicked\ncount: " + count);
        if ($("#"+id+"").is(':empty') && playing === true){
            playGame();
            $("#"+id+"").html(display);
            board[""+id] = player;
            console.log(board);
            if(count >= 5){
                checkBoard();
            }
        }
    }
});

$('#new-game').click(function() {
    location.reload();
});

});


