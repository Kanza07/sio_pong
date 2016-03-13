<?php
	session_start(); // On démarre la session.

	$mysqli = new mysqli("localhost","pong_user",'pong.mdp',"ALPHA_PONG");
	$player1 = $_POST['player1'];
	$player2 = $_POST['player2'];
	
	$sql = "INSERT into joueur(pseudo_j) values (?),(?)";
	if($stmt= $mysqli->prepare($sql)){
		
		$stmt->bind_param("ss",$player1,$player2);
		/*$stmt->execute();
		$stmt->bind_param("s",$player2);*/
		$stmt->execute();
		$stmt->close();
	}

	// Une fois les utilisateurs enregistrés en BDD, on les met en session
	$_SESSION['player_a'] = $player1;
	$_SESSION['player_b'] = $player2;

	header("Location: ../views/loading.php");