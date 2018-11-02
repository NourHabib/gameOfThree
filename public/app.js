var app = angular.module('gameApp',[]);

app.controller('gameCtrl', function($scope,$http,$interval){

    $scope.game = {
        theNumber : 0,
        gameHold : false,
        turn: 0,
        playOn : false,
        gameLose : false,
        gameWin : false
    }
    $scope.divideError = false;
    $scope.gameAlreadyStarted = false;
    var turnCheck = null;


    function checkIntervalStart(){
        turnCheck = $interval(checkTurn,1000);
    }
    function checkIntervalStop(){
        $interval.cancel(turnCheck);
    }
    function checkTurn(){
        $http.get('/api/gameTurn').then(function(res){
            if($scope.game.turn == res.data.turn){
                $scope.game.theNumber = res.data.theNumber;
                if(parseInt(res.data.theNumber) == 1){
                    $scope.game.gameLose = true;
                    $scope.game.gameHold = false;
                    $scope.gameAlreadyStarted = false;
                    $http.get('/api/gameReset').then(function(res){
                        console.log(res.data);
                    });
                }else{
                    $scope.game.playOn = true;
                }
                checkIntervalStop();
            }
        })  
    }
    
    $scope.newgame = function(){
        $http.get('/api/newgame').then(function(res){
            if(!res.data.gameStart){
                if(res.data.gameHold){
                    $scope.game.gameHold = true;
                    $scope.game.theNumber = res.data.theNumber;
                    $scope.game.playOn = true;
                    $scope.game.turn = 0;
                    console.log('Someone has joined the Game, the Game started!');
                    $http.get('/api/gameStart');
                }else{
                    $scope.game.gameHold = true;
                    $scope.game.theNumber = res.data.theNumber;
                    $scope.game.turn = 1;
                    console.log('Game set on Hold!');
                    checkIntervalStart();
                }
            }else{
                $scope.gameAlreadyStarted = true;
            }
        })
    }

    $scope.sendNumber = function(numb){;
       let temp = ($scope.game.theNumber+numb);
        if(temp % 3 == 0){
            $scope.game.theNumber = temp/3;
            $scope.divideError = false;
            $http.put('/api/sendNumber',{ "newNumber" : $scope.game.theNumber });
            if($scope.game.theNumber == 1){
                $scope.game.gameWin = true;
                $scope.game.gameHold = false;
                $scope.gameAlreadyStarted = false;
            }else{
                $scope.game.playOn = false;
                checkIntervalStart();
            }
        }else{
            $scope.divideError = true;
        }
    }
});