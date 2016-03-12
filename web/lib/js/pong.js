window.onload = function() {
    var canvas = document.getElementById('pong-canvas');
        if(!canvas)
        {
            alert("Impossible de récupérer Poong");
            return;
        }

    var context = canvas.getContext('2d');
        if(!context)
        {
            alert("Impossible de récupérer le context de Poong");
            return;
        }

    /*canvas.width = $(window).width();
    canvas.height = $(window).height();*/
    canvas.width = window.innerWidth - 25;
    canvas.height = window.innerHeight;

    /*On défini quelques variables*/
    var diamBall = 10;
    var widthPad = 100;
    var heightPad = 10;
    var posBallX = 30+diamBall/2;
    var posBallY = 30+diamBall/2;
    var posPadXA = 2;
    var posPadYA = 5;
    var posPadXB = canvas.width-12;
    var posPadYB = 5;
    var vitesseBallX = 10;
    var vitesseBallY = 10;
    var vitessePadY = 20;
    var scorePlayA = 0;
    var scorePlayB = 0;
	var decompte = 3;
    var player_A = "Guest 1";
    var player_B = "Guest 2";

    $.get('../src/player_in_session.php',function(data){
        player_A = data.player_a;
        player_B = data.player_b;
    },"json");

    /* Handle keyboard controls */
    var keysDown = {};

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    /*var decompteInterval = setInterval(decompte, 1000);

    function decompte() {
	    context.clearRect(0, 0, canvas.width, canvas.height);
		context.font = "bold 30px Arial";
        context.fillStyle = "rgb(255,0,0)";
        context.fillText(decompte, canvas.width/2, canvas.height/2);
	
		decompte--;
		if(decompte < 0){
		   clearInterval(decompteInterval);
		   
		   var gameInterval = setInterval(animate, 1000/40);
		}	
	}*/

    var gameInterval = setInterval(animate, 1000/40);

	function animate() {  
        context.clearRect(0, 0, canvas.width, canvas.height);/*Cette fonction permet de réinitialiser notre canvas. Plus rien n'y est affiché.*/

        /*Tracé de la balle*/
        context.beginPath();
        context.fillStyle = "rgb(255,255,255)"
        context.arc(posBallX, posBallY, diamBall/2, 0, Math.PI*2);
        context.fill();

        context.fillStyle = "rgb(255,255,255)";
        context.fillRect(posPadXA, posPadYA, heightPad, widthPad);

        context.fillStyle = "rgb(0,255,0)";
        context.fillRect(posPadXB, posPadYB, heightPad, widthPad);

        context.font = "bold 30px Arial";
        context.fillStyle = "rgb(255,255,255)";
        context.fillText(scorePlayA,canvas.width/2-20,30);

        context.fillStyle = "rgb(0,255,0)";
        context.fillText(scorePlayB,canvas.width/2+20,30);

        if (scorePlayA >= 5) {
            context.font = "bold 30px Arial";
            context.fillStyle = "rgb(255,255,255)";
            context.fillText(player_A + " a gagné",canvas.width/2,canvas.height/2 );
            $.post('../src/end_game_register.php', { 
                player_a    : player_A, 
                player_b    : player_B, 
                winner      : player_A,
                score_a     : scorePlayA,
                score_b     : scorePlayB
            });
            clearInterval(gameInterval);    
        }
                
        if (scorePlayB >= 5) {
            context.font = "bold 30px Arial";
            context.fillStyle = "rgb(0,255,0)";
            context.fillText(player_B + " a gagné",canvas.width/2,canvas.height/2 );
            $.post('../src/end_game_register.php', { 
                player_a    : player_A, 
                player_b    : player_B, 
                winner      : player_B,
                score_a     : scorePlayA,
                score_b     : scorePlayB
            });
            clearInterval(gameInterval);
        }

        if (posBallX <= 5) {
            vitesseBallX *= -1;/*On inverse la vitesse de déplacement sur l'axe horizontal.*/
            vitesseBallX = (vitesseBallX < 0) ? -6 : 6;
            vitesseBallY = (vitesseBallY < 0) ? -6 : 6;
            posBallX = canvas.width/2;
            posBallY = canvas.height/2;
            scorePlayB++;
        }

        if (posBallX >= canvas.width-5) {
            vitesseBallX *= -1;/*On inverse la vitesse de déplacement sur l'axe horizontal.*/
            vitesseBallX = (vitesseBallX < 0) ? -6 : 6;
            vitesseBallY = (vitesseBallY < 0) ? -6 : 6;
            posBallX = canvas.width/2;
            posBallY = canvas.height/2;
            scorePlayA++;
        }

        /*if(scorePlayA>=7 || scorePlayB>=7){
            clearInterval(gameInterval);
        }*/

        /* On verifie si la balle à toucher le pad du joueur A*/
        if (posBallX <= posPadXA + heightPad + 5) {
            if (posBallY >= posPadYA && posBallY <= posPadYA + widthPad) {
                vitesseBallX *= -1;/*On inverse la vitesse de déplacement sur l'axe horizontal.*/
                /*vitesseBallX += (vitesseBallX < 0) ? -1 : 1;
                vitesseBallY += (vitesseBallY < 0) ? -1 : 1;*/
                //Vitesse de la baballe
            }
        }
        /* On verifie si la balle à toucher le pad du joueur B*/
        if (posBallX >= posPadXB - diamBall/2) {
            if (posBallY >= posPadYB && posBallY <= posPadYB + widthPad) {
                vitesseBallX *= -1;/*On inverse la vitesse de déplacement sur l'axe horizontal.*/
                /*vitesseBallX += (vitesseBallX < 0) ? -1 : 1;
                vitesseBallY += (vitesseBallY < 0) ? -1 : 1;*/
                //Vitesse de la baballe                     
            }
        }  

        if (posBallY+diamBall/2 >= canvas.height || posBallY <= 0+diamBall/2)/*Si on touche le bord du bas ou du haut*/
        {
            vitesseBallY *= -1;/*On inverse la vitesse de déplacement sur l'axe vertical.*/
            
        }           

        if (90 in keysDown && posPadYA > 5) { // Player A holding up
            posPadYA -= vitessePadY ;
        }
        if (83 in keysDown && posPadYA + widthPad + 5 < canvas.height) { // Player A holding down
            posPadYA += vitessePadY ;
        }

        if (38 in keysDown && posPadYB > 5) { // Player B holding up
            posPadYB -= vitessePadY ;
        }
        if (40 in keysDown && posPadYB + widthPad + 5 < canvas.height) { // Player B holding down
            posPadYB += vitessePadY ;
        }

        //On additionne les vitesses de déplacement avec les positions
        posBallX += vitesseBallX;
        posBallY += vitesseBallY;
    } 
}