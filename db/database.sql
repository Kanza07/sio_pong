CREATE DATABASE IF NOT EXISTS ALPHA_PONG CHARACTER SET utf8 collate utf8_unicode_ci;
use ALPHA_PONG;

grant all privileges on ALPHA_PONG.*to 'pong_user'@'localhost' identified by 'pong.mdp';