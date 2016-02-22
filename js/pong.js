window.onload = function() {
    var canvas = document.getElementById('pong-canvas');
        if(!canvas)
        {
            alert("Impossible de récupérer le canvas");
            return;
        }

    var context = canvas.getContext('2d');
        if(!context)
        {
            alert("Impossible de récupérer le context du canvas");
            return;
        }

    canvas.width = 1792;
	canvas.height = 960;

	var countdownInterval = setInterval(countDown,1000);

    //var myInterval = setInterval(animate, 1000/40);

    //On défini quelques variables
    var diamBall = 20;
    var widthPad = 60;
    var heightPad = 10;
    var posBallX = 30+diamBall/2;
    var posBallY = 30+diamBall/2;
    var posPadXA = 2;
    var posPadYA = 5;
    var posPadXB = 628;
    var posPadYB = 5;
    var vitesseBallX = 4;
    var vitesseBallY = 4;
    var vitessePadY = 6;
    var scorePlayA = 0;
    var scorePlayB = 0;
    var countdown = 3;

    // Handle keyboard controls
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	function countDown() {
		context.clearRect(0, 0, canvas.width, canvas.height);//Cette fonction permet de réinitialiser notre canvas. Plus rien n'y est affiché.

		context.font = "bold 100px Arial";
        context.fillStyle = "rgb(255,0,255)";
        context.fillText(countdown,canvas.width/2,canvas.height/2);

        countdown--;
        if(countdown < 0){
        	clearInterval(countdownInterval);

        	var myInterval = setInterval(animate, 1000/40);
        }
	}

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);//Cette fonction permet de réinitialiser notre canvas. Plus rien n'y est affiché.

        //Tracé de la balle
        context.beginPath();
        context.fillStyle = "rgb(255,255,255)"
        context.arc(posBallX, posBallY, diamBall/2, 0, Math.PI*2);
        context.fill();

        context.fillStyle = "rgb(255,0,0)";
        context.fillRect(posPadXA, posPadYA, heightPad, widthPad);

        context.fillStyle = "rgb(0,0,255)";
        context.fillRect(posPadXB, posPadYB, heightPad, widthPad);

        context.font = "bold 30px Arial";
        context.fillStyle = "rgb(255,0,0)";
        context.fillText(scorePlayA,280,30);

        context.fillStyle = "rgb(0,0,255)";
        context.fillText(scorePlayB,320,30);

        if (posBallX <= 10) {
        	vitesseBallX *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
            vitesseBallX = (vitesseBallX < 0) ? -4 : 4;
            vitesseBallY = (vitesseBallY < 0) ? -4 : 4;
            posBallX = 320;
        	posBallY = 180;
    		scorePlayB++;
    	}

    	if (posBallX >= 630) {
    		vitesseBallX *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
            vitesseBallX = (vitesseBallX < 0) ? -4 : 4;
            vitesseBallY = (vitesseBallY < 0) ? -4 : 4;
            posBallX = 320;
        	posBallY = 180;
    		scorePlayA++;
    	}

        // On verifie si la balle à toucher le pad du joueur A
        if (posBallX <= posPadXA + heightPad + 5) {
        	if (posBallY >= posPadYA && posBallY <= posPadYA + widthPad) {
        		vitesseBallX *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
        		vitesseBallX += (vitesseBallX < 0) ? -1 : 1;
            	vitesseBallY += (vitesseBallY < 0) ? -1 : 1;
        	}
        }
        // On verifie si la balle à toucher le pad du joueur B
        if (posBallX >= posPadXB - diamBall/2) {
        	if (posBallY >= posPadYB && posBallY <= posPadYB + widthPad) {
        		vitesseBallX *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
        		vitesseBallX += (vitesseBallX < 0) ? -1 : 1;
            	vitesseBallY += (vitesseBallY < 0) ? -1 : 1;		        		
        	}
        }  

        if (posBallY+diamBall/2 >= canvas.height || posBallY <= 0+diamBall/2)//Si on touche le bord du bas ou du haut
        {
            vitesseBallY *= -1;//On inverse la vitesse de déplacement sur l'axe vertical.
            
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

		if(scorePlayA >= 5 || scorePlayB >= 5){
			context.fillStyle = "rgb(0,0,255)";
        	context.fillText("Victoire",320,100);
			clearInterval(myInterval);
		}

        //On additionne les vitesses de déplacement avec les positions
        posBallX += vitesseBallX;
        posBallY += vitesseBallY;
    } 
}