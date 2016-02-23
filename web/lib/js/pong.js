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

    canvas.width = 640;
    canvas.height = 360;

    var myInterval = setInterval(animate, 1000/40);

    /*On défini quelques variables*/
    var diamBall = 10;
    var widthPad = 100;
    var heightPad = 10;
    var posBallX = 30+diamBall/2;
    var posBallY = 30+diamBall/2;
    var posPadXA = 2;
    var posPadYA = 5;
    var posPadXB = 628;
    var posPadYB = 5;
    var vitesseBallX = 10;
    var vitesseBallY = 10;
    var vitessePadY = 20;
    var scorePlayA = 0;
    var scorePlayB = 0;

    /* Handle keyboard controls */
    var keysDown = {};

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

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
        context.fillText(scorePlayA,280,30);

        context.fillStyle = "rgb(0,255,0)";
        context.fillText(scorePlayB,320,30);
        
        /*On va vérifier si la balle à toucher l'un des bords du canvas.*/
        /*if(posBallX+diamBall/2 >= canvas.width || posBallX <= 0+diamBall/2)//Si on touche le bord gauche ou droit
        {
            vitesseBallX *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
            vitesseBallX = (vitesseBallX < 0) ? -4 : 4;
            vitesseBallY = (vitesseBallY < 0) ? -4 : 4;
            posBallX = 320;
            posBallY = 180;

        }*/

        if (posBallX <= 5) {
            vitesseBallX *= -1;/*On inverse la vitesse de déplacement sur l'axe horizontal.*/
            vitesseBallX = (vitesseBallX < 0) ? -10 : 10;
            vitesseBallY = (vitesseBallY < 0) ? -10 : 10;
            posBallX = 320;
            posBallY = 180;
            scorePlayB++;
            if (scorePlayB ==7){
                diamBall = 0;
                widthPad = 0;
                heightPad = 0;
                vitesseBallX=0;
                vitesseBallY=0;
            }
        }

        if (posBallX >= 650) {
            vitesseBallX *= -1;/*On inverse la vitesse de déplacement sur l'axe horizontal.*/
            vitesseBallX = (vitesseBallX < 0) ? -10 : 10;
            vitesseBallY = (vitesseBallY < 0) ? -10 : 10;
            posBallX = 320;
            posBallY = 180;
            scorePlayA++;
            if (scorePlayA ==7){
                diamBall = 0;
                widthPad = 0;
                heightPad = 0;
                vitesseBallX=0;
                vitesseBallY=0;
            }
        }

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