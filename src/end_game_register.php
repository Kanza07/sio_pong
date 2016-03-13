<?php
	session_start(); // On démarre la session.

	$nbr_win = null;
	$nbr_lose = null;

	$player_A 	= $_POST['player_a'];
	$player_B 	= $_POST['player_b'];
	$winner		= $_POST['winner'];
	$score_a	= $_POST['score_a'];
	$score_b	= $_POST['score_b'];

	if($player_A == $winner){
		$looser = $player_B;
		$score_win = $score_a;
		$score_lose = $score_b;
	} else {
		$looser = $player_A;
		$score_win = $score_b;	
		$score_lose = $score_a;
	}

	$mysqli = new mysqli("localhost","pong_user",'pong.mdp',"ALPHA_PONG");
	
	$sql_get_win = "SELECT nbre_victoire,scorejoueur FROM joueur WHERE pseudo_j = '".$winner."'";
	$sql_get_lose = "SELECT nbre_defaite,scorejoueur FROM joueur WHERE pseudo_j = '".$looser."'";

	// Interroger la bdd, avec en paramètre la requete preparee
	$result_win_nbr = $mysqli->query($sql_get_win);
	$result_lose_nbr = $mysqli->query($sql_get_lose);

	while ($row = $result_win_nbr->fetch_assoc()) {
	 	$nbr_win = $row['nbre_victoire'];
	 	$old_score_win = $row['scorejoueur'];
	 	/*echo $nbr_win;
	 	echo $old_score_a;*/
    }

    while ($row = $result_lose_nbr->fetch_assoc()) {
	 	$nbr_lose = $row['nbre_defaite'];
	 	$old_score_lose = $row['scorejoueur'];
		/*echo $nbr_win;
	 	echo $old_score_a;*/
    }

    if($player_A == $winner){
		$score_win = $score_a;
		$score_lose = $score_b;
	} else {
		$score_win = $score_b;	
		$score_lose = $score_a;
	}

	$sql_upt_win = "UPDATE joueur SET scorejoueur = ?,nbre_victoire = ? WHERE pseudo_j = ?";
	$sql_upt_lose = "UPDATE joueur SET scorejoueur = ?,nbre_defaite = ? WHERE pseudo_j = ?";
	
	if($stmt= $mysqli->prepare($sql_upt_win)){	
		$nbr_win = $nbr_win + 1;
		$score_win = $old_score_win + $score_win;

		$stmt->bind_param("iis",$score_win,$nbr_win,$winner);
		$stmt->execute();
		$stmt->close();
	}

	if($stmt= $mysqli->prepare($sql_upt_lose)){	
		$nbr_lose = $nbr_lose + 1;
		$score_lose = $old_score_lose + $score_lose;

		$stmt->bind_param("iis",$score_lose,$nbr_lose,$looser);
		$stmt->execute();
		$stmt->close();
	}

	sleep(3);

	header("Location: ../web/index.php");