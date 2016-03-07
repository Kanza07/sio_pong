DROP TABLE IF EXISTS JOUEUR;
CREATE TABLE JOUEUR
(
	njoueur int (2) not null PRIMARY KEY auto_increment,
	pseudo_j varchar(50) not null,
	mdp varchar(20),
	nbre_victoire int(2),
	nbre_defaite int(2)
)engine=innodb character set utf8 collate utf8_unicode_ci;