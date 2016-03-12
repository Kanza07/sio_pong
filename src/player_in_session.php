<?php
	session_start();

	$player_A = $_SESSION["player_a"];
	$player_B = $_SESSION["player_b"];

	$players =  array(
					'player_a' => $player_A, 
					'player_b' => $player_B, 
				);

	echo json_encode($players);
