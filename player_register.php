<?php
$mysqli = new mysqli("localhost","pong_user",'pong.mdp',"ALPHA_PONG");
$player1 = $_POST['player1'];
$player2 = $_POST['player2'];
$sql = "INSERT into joueur(pseudo_j) values (?)";
if($stmt= $mysqli->prepare($sql)){
	
	$stmt->bind_param("s",$player1);
	$stmt->execute();
	$stmt->bind_param("s",$player2);
	$stmt->execute();
	$stmt->close();
	}
header("Location: loading.php");