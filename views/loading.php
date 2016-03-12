<?php
	session_start(); // On démarre la session AVANT toute chose

	echo $_SESSION["player_a"];
	echo $_SESSION["player_b"];
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>

		<title>PageAcceuil</title>
		<link href="../web/css/loading.css" rel="stylesheet"/>
	</head>
	<body>

		<div id="load">
		  <img src="../web/img/loading/38.gif"/>
		  <meta http-equiv="refresh" content="3; URL=game.php">
		</div>
	</body>
</html>