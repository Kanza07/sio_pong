drop table if exists joueur;

	create table joueur
( 
	njoueur int (2) not null primary key auto_increment,
	pseudo_j varchar(50) not null,
    mdp varchar(20) ,
	nbre_victoire int(2),
	nbre_defaite int(2),
	scorejoueur integer(10)	
)engine=innodb character set utf8 collate utf8_unicode_ci;	
