<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">    
        
        <title>Pong</title>

		<link href="web/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="web/css/styles.css" rel="stylesheet">
	</head>
    <body> 
        <div class="container">                    
            <header>  
			<a><img src="web/img/pngs/Calque6.png"/></a>					
            </header>
            <section>
            <div class="modal fade" id="inscription" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog">
				<div class="modal-content">
				  <div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hideden="true">&times;</span></button>
				  </div>
				  <div class="modal-body">
					<form name="" method="post" action="" class="form-horizontal">
						
						<div class="form-group">
							<label class="col-sm-3 control-label required" for="description">Pseudo</label>
							<div class="col-sm-7">
								<input type="text" id="nickname" name="nickname" required="required" class="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label required" for="description">Mot de passe</label>
							<div class="col-sm-7">
								<input type="password" id="password" name="password" required="required" class="form-control" />
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss=modal">Annuler</button>
							<input type="submit" class="btn btn-primary"value="Valider" />
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	</div>
				<h2 class="text-center"><font color="White">Identifiez-vous</font></h2>
                <div class="">
                    <form class="form-signin form-horizontal" role="form" action="formulair.php" method="post">
                        <div class="form-group">
                            <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                            <input name="player1" class="form-control input-lg" required="required" type="text" placeholder="player1">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                            <input name="player2" class="form-control input-lg" required="required" type="text" placeholder="player2">
                            </div>
                        <div class="form-group">
                            <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                                <input type="image" src="web\img\pngs\play.png">
                            </div>
                        </div>
                    </form>
                    <p><font color="White">Pas encore inscrit ?</font><a href="#inscription" data-toggle="modal">Cliquez ici</a>.</p>
                </div>
            </section>
        </div>
        <footer class="mastfoot">
          <div class="inner">                       
              <p><font color="White">&copy; Mis en ligne par <a href="http://josephgaillardweb.fr/">BTS - SIO </a> - Tous droits réservés - <a href="/contact">Coordonnées</font></a></p>
          </div>
        </footer>
		
		<!-- jQuery -->
		<script src="jquery/jquery-2.2.0.js"></script>
		
		<!-- JavaScript Bootstrap plugin -->
		
		<script src="bootstrap/js/bootstrap.min.js"></script>
	</body>
</html>
