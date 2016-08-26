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
var isInvi = 0;

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
	isInvi = 0;
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
			case 'arrow': if(backpack[i].count > 0) $('#arrow').slideDown(0); break;
			case 'bomb': if(backpack[i].count > 0) $('#bomb').slideDown(0); break;
			case 'potion1': if(backpack[i].count > 0) $('#potion1').slideDown(0); break;
			case 'potion2': if(backpack[i].count > 0) $('#potion2').slideDown(0); break;
			case 'grapplingHook': if(backpack[i].count > 0) $('#grapplingHook').slideDown(0); break;
			case 'fireResistantCloak': if(backpack[i].count > 0) $('#fireResistantCloak').slideDown(0); break;
			case 'shield': if(backpack[i].count > 0) $('#shield').slideDown(0); break;
			case 'springLoadedBoots': if(backpack[i].count > 0) $('#springLoadedBoots').slideDown(0); break;
			case 'flightSpell': if(backpack[i].count > 0) $('#flightSpell').slideDown(0); break;
			case 'waterSpell': if(backpack[i].count > 0) $('#waterSpell').slideDown(0); break;
			case 'invisibleCloak': if(backpack[i].count > 0) $('#invisibleCloak').slideDown(0); break;
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

	if(isInvi)
		isInvi = 0;

	var aMonster = currentRoom.roomContent;
	var aString = "";

	var dmgDealt = Math.floor(dmg*getRandom(0.75, 1.25));
	if(aMonster.sleep == 0)
		if(aMonster.flying == 1) //if its flying its evasion x2
			if(checkSuccessRate(60)) //60% chance of dodging if flying
			{
				aString += "The monster on its quick feet lurches forward, dodging your strike.";
				dmgDealt = 0;
			}
		else 
			if(aMonster.evasion > getRandomInt(0,99))
			{
				aString += "The monster on its quick feet lurches forward, dodging your strike.";
				dmgDealt = 0;
			}
	aMonster.HP -= dmgDealt;
	aString += "You hit the monster for " + dmgDealt + " dmg. "

	if(!aMonster.isAlive())
	{
		aString += "The monster collapses and releases its last breath in front of you."
		currentRoom.customRoomType(0);
	}
	else
	{
		aString += "The monster now has " + aMonster.HP + " HP. ";
		if(aMonster.sleep == 1)
		{
			aMonster.sleep = 0;
			updateNavigation();
			aString += "The monster feels the pain and wake up violently. It notices you."
		}
	}


	aString += '\n';
	$("#outputInfo").append(aString);

	if(aMonster.isAlive())
		$("#outputInfo").append(aMonster.action());

	action();
	updateHeroInfo();
}

function shootArrow()
{
	if(backpack[14].count <= 0) //14 is arrow
		return;

	backpack[14].execute();
	if(currentRoom.roomType() == 6) //if shoot in monster room
	{
		if(isInvi)
			isInvi = 0;

		var aMonster = currentRoom.roomContent;
		var aString = "";

		var dmgDealt = Math.floor(dmg*getRandom(0.75, 1.25)/2);
		if(aMonster.sleep == 0)
			if(aMonster.evasion > getRandomInt(0,99))
			{
				aString += "The monster quickly moves away from its posititon, dodging your arrow.";
				dmgDealt = 0;
			}
		aMonster.HP -= dmgDealt;
		aString += "You hit the monster for " + dmgDealt + " dmg. "

		//if a monster is flying and you hit it, theres 50% chance it will not fly
		if(aMonster.flying == 1 && dmgDealt > 0 && checkSuccessRate(50))
		{
			aString += "The arrow strikes the beast in it vital spot causing it to lose balance in the air. It crashes hard against the stone floor. "
			aMonster.flying = 0;
		}

		if(!aMonster.isAlive())
		{
			aString += "The monster collapses and releases its last breath in front of you. "
			currentRoom.customRoomType(0);
		}
		else
		{
			aString += "The monster now has " + aMonster.HP + " HP. ";
			if(aMonster.sleep == 1)
			{
				aMonster.sleep = 0;
				updateNavigation();
				aString += "The monster feels the pain and wake up violently. It notices you. "
			}
		}

		aString += '\n';
		$("#outputInfo").append(aString);

		if(aMonster.isAlive())
			$("#outputInfo").append(aMonster.action());
	}

	action();
	updateHeroInfo();
	updateNavigation();
}

function useBomb()
{
	if(backpack[16].count <= 0) //16 is bomb
		return;

	backpack[16].execute();
	if(currentRoom.roomType() == 6) //if monster room
	{
		if(isInvi)
			isInvi = 0;

		var aMonster = currentRoom.roomContent;
		var aString = "";
		var dmgDealt = Math.floor(20*getRandom(0.75, 1.25));
		aMonster.HP -= dmgDealt;
		aString += "The bomb explodes, damaging the monster for " + dmgDealt + " dmg.\n"
		if(!aMonster.isAlive())
		{
			aString += "The monster flesh has been blown away. It is nothing more than a pile of bloody mess. "
			currentRoom.customRoomType(0);
		}
		else
		{
			aString += "The monster now has " + aMonster.HP + " HP. ";
			if(aMonster.sleep == 1)
			{
				aMonster.sleep = 0;
				updateNavigation();
				aString += "The monster feels the pain and wake up violently. It notices you. "
			}
		}
		aString += '\n';
		$("#outputInfo").append(aString);

		if(aMonster.isAlive())
			$("#outputInfo").append(aMonster.action());
	}

	if(currentRoom.roomType() == 7) //if trap room
	{
		var aTrap = currentRoom.roomContent;
		if(aTrap.visible == 0)
		{
			aTrap.visible = 1
			$("#outputInfo").append("Fortunately, the explosion sprung the trap set in this room.\n");
			$("#outputInfo").append(aTrap.info());
		}
	}

	action();
	updateHeroInfo();
	updateNavigation();
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
	if(currentRoom.roomType() == 6 && checkSuccessRate(50)) //if its monster room then you have 50% chance of getting hit after using item
		$("#outputInfo").append(currentRoom.roomContent.action());
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

