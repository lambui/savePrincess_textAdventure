var name;

//default starting stat
var d_maxHP = 20;
var d_evasion = 10;
var d_dmg = 8;

var maxHP;
var HP;
var evasion;
var gold;
var dmg;

//boolean mordifiers
var isFly = 0;
var isFireResis = 0;
var isBlock = 0;
var isJump = 0;

function init(inputName)
{
	name = inputName;
	HP = maxHP = d_maxHP;
	evasion = d_evasion; //default evasion = 10%
	gold = 500;
	dmg = d_dmg;
}

function resetMordifier()
{
	isFly = 0;
	isFireResis = 0;
	isBlock = 0;
	isJump = 0;
}

function hideAllAction()
{
	var actionOption = $('.action').children();
	for(var i = 0; i < actionOption.length; i++)
		$(actionOption[i]).slideUp(0);
}

function action()
{
	if(HP <= 0)
	{
		hideAllAction();
		return;
	}
	if(currentRoom == undefined)
		return;

	hideAllAction();
	$('#inspect').slideDown(0);

	//enable item action
	for(var i = 0; i < backpack.length; i++)
	{
		switch(backpack[i].name)
		{
			default: break;
			case 'grapplingHook': if(backpack[i].count > 0) $('#grapplingHook').slideDown(0); break;
			case 'fireResistantCloak': if(backpack[i].count > 0) $('#fireResistantCloak').slideDown(0); break;
			case 'shield': if(backpack[i].count > 0) $('#shield').slideDown(0); break;
			case 'springLoadedBoots': if(backpack[i].count > 0) $('#springLoadedBoots').slideDown(0); break;
			case 'flightSpell': if(backpack[i].count > 0) $('#flightSpell').slideDown(0); break;
			case 'waterSpell': if(backpack[i].count > 0) $('#waterSpell').slideDown(0); break;
			case 'animatedWings': if(backpack[i].count > 0) $('#animatedWings').slideDown(0); break;
		}
	}

	switch(currentRoom.roomType())
	{
		/*room type:
			empty 	10 	0
			shop	5 	1
			secret 	5 	2
			chest 	10 	3
			riddle 	10 	4
			gamble 	10 	5
			monster 34 	6
			trap 	15 	7
			boss 	1 	8
		*/

		case 0: break;
		case 1: $('#openShop').slideDown(0); break;
		case 2: break;
		case 3:
			if(currentRoom.roomContent.open == 0) 
				$('#openChest').slideDown(0);
			break;
		case 4: break;
		case 5: $('#openGamble').slideDown(0); break;
		case 6: $('#melee').slideDown(0); break;
		case 7: break;
		case 8: break;
	}

	updateHeroInfo(); //can be found in init.js
}

function inspect()
{
	$("#outputInfo").append(currentRoom.roomContent.info());
}

function openShop()
{
	$($('.shop')[0]).css('visibility', 'visible');
	currentRoom.roomContent.action();
}

function openChest()
{
	if(currentRoom.roomType() != 3)
		return;
	currentRoom.roomContent.action();
	action();
	updateHeroInfo();
}

function openGamble()
{
	$($('.gambleTable')[0]).css('visibility', 'visible');
	currentRoom.roomContent.action();
}

function melee()
{
	if(currentRoom.roomType() != 6)
		return;

	var aMonster = currentRoom.roomContent;
	var aString = "";
	if(aMonster.sleep == 0)
		if(aMonster.evasion > getRandomInt(0,99))
		{
			aString += "The monster on its quick feet lurches forward, dodging your strike.\n";
			$("#outputInfo").append(aString);
			$("#outputInfo").append(aMonster.action());
			return;
		}

	var dmgDealt = Math.floor(dmg*getRandom(0.75, 1.25));
	aMonster.HP -= dmgDealt;
	aString += "You hit the monster for " + dmgDealt + " dmg. "

	if(!aMonster.isAlive())
	{
		aString += "The monster collapses and releases its last breath in front of you."
		currentRoom.customRoomType(0);
	}
	else
	{
		aString += "The monster now has " + aMonster.HP + " HP.";
		if(aMonster.sleep == 1)
		{
			aMonster.sleep = 0;
			aString += "The monster feels the pain and wake up violently. It notices you. "
		}
	}


	aString += '\n';

	$("#outputInfo").append(aString);

	if(aMonster.isAlive())
		$("#outputInfo").append(aMonster.action());

	action();
	updateHeroInfo();
}

function jumpPit() //only available when its a visible trap room and a pit
{
	currentRoom.roomContent.specialAction();
}

function useItem(itemName) //itemName == 'name' property of objects in backpack array
{
	var item = backpack[0];
	for(var i = 0; i < backpack.length; i++)
	{
		if(backpack[i].name == itemName)
			item = backpack[i];
	}

	if(item == backpack[0])
	{
		console.log("couldnt find item");
		return;
	}

	item.execute();
	$("#outputInfo").append(isFly + " " + isBlock + " " + isFireResis + " " + isJump + "\n");
	action();
	updateHeroInfo();
	updateNavigation(); //can be found in map.js
}

function rest()
{
	HP += Math.floor(0.25*maxHP*getRandom(0.75,1.75));
	if(HP > maxHP)
		HP = maxHP;
	var aString = "You lay down on the cold, stony floor of the castle and slowly close your eyes. ";
	aString += "Everything turns to darkness and you drifts into an uncomfortable sleep...\n...\n";
	aString += "...You wake up to what feels like morning in this dank, cold place. You feels somewhat refreshed; your wound causes less pain now.\n"
	aString += "You now have " + HP + " HP.\n"
	$("#outputInfo").append(aString);
	updateHeroInfo();
}

