var name;

//default starting stat
var const d_maxHP = 10;
var const d_evasion = 10;
var const d_dmg = 5;

var maxHP;
var HP;
var evasion;
var gold;
var dmg;

function init(inputName)
{
	name = inputName;
	HP = maxHP = d_maxHP;
	evasion = d_evasion; //default evasion = 10%
	gold = 0;
	dmg = d_dmg;
	alert("create " + name + " hero successfully!");
}

