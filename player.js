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
var completeMap = 0;

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

	//enable item action
	if(currentRoom.roomType() != 9)
	{
		$('#inspect').slideDown(0);
		for(var i = 0; i < backpack.length; i++)
		{
			switch(backpack[i].name)
			{
				default: break;
				case 'arrow': if(backpack[i].count > 0) $('#arrow').slideDown(0); break;
				case 'torch': if(backpack[i].count > 0) $('#torch').slideDown(0); break;
				case 'bomb': if(backpack[i].count > 0) $('#bomb').slideDown(0); break;
				case 'potion1': if(backpack[i].count > 0) $('#potion1').slideDown(0); break;
				case 'potion2': if(backpack[i].count > 0) $('#potion2').slideDown(0); break;
				case 'grapplingHook': if(backpack[i].count > 0) $('#grapplingHook').slideDown(0); break;
				case 'fireResistantCloak': if(backpack[i].count > 0) $('#fireResistantCloak').slideDown(0); break;
				case 'shield': if(backpack[i].count > 0) $('#shield').slideDown(0); break;
				case 'springLoadedBoots': if(backpack[i].count > 0) $('#springLoadedBoots').slideDown(0); break;
				case 'flightSpell': if(backpack[i].count > 0) $('#flightSpell').slideDown(0); break;
				case 'waterSpell': if(backpack[i].count > 0) $('#waterSpell').slideDown(0); break;
				case 'fireSpell': if(backpack[i].count > 0) $('#fireSpell').slideDown(0); break;
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
			default: break;
			case 0: //empty
			case 2: //secret
				if(currentRoom.roomContent.hasLight == 0)
					$('#blindWalk').slideDown(0);
				break;
			case 1: $('#openShop').slideDown(0); break;
			case 3:
				if(currentRoom.roomContent.open == 0) 
					$('#openChest').slideDown(0);
				break;
			case 4: $('#openRiddle').slideDown(0); break;
			case 5: $('#openGamble').slideDown(0); break;
			case 6: $('#melee').slideDown(0); break;
			case 7: break; //trap
			case 8: $('#melee').slideDown(0); break;
		}	
	}
	else
	{
		$('#rescuePrincess').slideDown(0);
	}

	updateHeroInfo(); //can be found in init.js
}

function inspect()
{
	showDescription();

	if(currentRoom.roomType() == 2) //secret
		if(currentRoom.roomContent.type == 2) //if its nothing room
			currentRoom.roomContent.action();
}

function blinkWalk()
{
	var possiblePath = [0,1,2,3]; // 0 = left, 1 = up, 2 = right, 3 = down
	var index = 0;
	if(posX == 0)
	{
		index = possiblePath.indexOf(0);
		possiblePath.splice(index, 1);
	}
	if(posX == column-1)
	{
		index = possiblePath.indexOf(2);
		possiblePath.splice(index, 1);
	}
	if(posY == 0)
	{
		index = possiblePath.indexOf(3);
		possiblePath.splice(index, 1);
	}
	if(posY == row-1)
	{
		index = possiblePath.indexOf(1);
		possiblePath.splice(index, 1);
	}

	if(currentRoom.roomContent.hasRock)
	{
		if(checkSuccessRate(60)) //theres a 60% chance you get out in random available direction
		{
			$('#outputInfo').append("You trace your way in the dark and you find a door leading to another room.\n");
			goInDirection(possiblePath[getRandomInt(0, possiblePath.length-1)]);
			return;
		}

		if(checkSuccessRate(50)) //theres 20% chance you didnt find your way
		{
			$('#outputInfo').append("You search and search in the dark but you do not find any way out.\n");
			return;
		}
		else //theres 20% chance you hurt urself tripping on rock
		{
			$('#outputInfo').append("You trips on something and falls over. Something seems to pierce through your body.\n");
			$('#outputInfo').append("You lose 5 HP\n");
			HP -= 5;
			if(HP <= 0)
				endGame(0);
		}
	}
	else
	{
		if(checkSuccessRate(80))
		{
			$('#outputInfo').append("You trace your way in the dark and you find a door leading to another room.\n");
			goInDirection(possiblePath[getRandomInt(0, possiblePath.length-1)]);
			return;
		}
	}
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

function openRiddle()
{
	$($('.riddleWindow')[0]).css('visibility', 'visible');
	currentRoom.roomContent.action();
}

function openGamble()
{
	$($('.gambleTable')[0]).css('visibility', 'visible');
	currentRoom.roomContent.action();
}

function melee()
{
	var aString = "";
	var dmgDealt = Math.floor(dmg*getRandom(0.75, 1.25));
	if(isInvi)
		isInvi = 0;

	//if monster room
	if(currentRoom.roomType() == 6)
	{
		var aMonster = currentRoom.roomContent;
		
		
		if(aMonster.sleep == 0)
			if(aMonster.flying == 1) //if its flying its evasion x2
				if(checkSuccessRate(60)) //60% chance of dodging if flying
				{
					aString += "The monster flies high, dodging your strike.";
					dmgDealt = 0;
				}
			else if(aMonster.evasion > getRandomInt(0,99))
			{
				aString += "The monster on its quick feet lurches forward, dodging your strike.";
				dmgDealt = 0;
			}
				
		aMonster.HP -= dmgDealt;
		aString += "You hit the monster for " + dmgDealt + " dmg. "

		if(!aMonster.isAlive())
			aString += "The monster collapses and releases its last breath in front of you. "
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
	}

	//if boss room
	if(currentRoom.roomType() == 8)
	{
		var theBoss = currentRoom.roomContent;
		if(theBoss.invi == 1)
		{
			aString += "The demon trace has all vanished. You swings your sword blindly in the air but to no avail. None of your swings connects.\n";
			dmgDealt = 0;
		}

		if(theBoss.fly == 1)
		{
			if(checkSuccessRate(60)) //60% chance of dodging if flying
			{
				aString += "The demon wings flap tirelessly. He flies up high, avoiding the tip of your sword.\n";
				dmgDealt = 0;
			}
		}
		else if(theBoss.evasion > getRandomInt(0,99))
		{
			aString += "The Demon is too quick. He dodges your strike without breaking a sweat.\n";
			dmgDealt = 0;
		}

		theBoss.HP -= dmgDealt;
		aString += "You hit the monster for " + dmgDealt + " dmg. ";

		if(!theBoss.isAlive())
		{
			aString += "The Demon finally crumbles on his knee. You take the chance and swing hard down on your sword. You severed the Demon's head.\n";
			aString += "The Demon lies dead in his own bloody mess.\n";
		}
		else
		{
			aString += "The Demon now has " + theBoss.HP + " HP. ";
		}

		$("#outputInfo").append(aString);
		if(theBoss.isAlive())
			$("#outputInfo").append(theBoss.action());

	}
	action();
	updateNavigation();
	updateHeroInfo();
}

function shootArrow()
{
	if(backpack[14].count <= 0) //14 is arrow
		return;

	backpack[14].execute();
	var aString = "";
	var dmgDealt = Math.floor(dmg*getRandom(0.75, 1.25)/2);
	if(isInvi)
		isInvi = 0;

	//monster room
	if(currentRoom.roomType() == 6)
	{
		var aMonster = currentRoom.roomContent;
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
			aString += "The monster collapses and releases its last breath in front of you. "
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

	//boss room
	if(currentRoom.roomType() == 8)
	{
		var theBoss = currentRoom.roomContent;
		if(theBoss.invi == 1)
		{
			aString += "The demon trace has all vanished. You fires your arrow blindly to open spaces to no avail. None of arrows seems to hit anything.\n";
			dmgDealt = 0;
		}

		if(theBoss.evasion > getRandomInt(0,99))
		{
			aString += "The Demon is too quick. He dodges your strike without breaking a sweat.\n";
			dmgDealt = 0;
		}

		theBoss.HP -= dmgDealt;
		aString += "You hit the monster for " + dmgDealt + " dmg. ";

		if(!theBoss.isAlive())
		{
			aString += "Your arrow strikes the Demon right in his vital spot. His blood comes gushing out of his body.\n";
			aString += "The Demon finally crumbles on his knee. You take the chance and swing hard down on your sword. You severed the Demon's head.\n";
			aString += "The Demon lies dead in his own bloody mess.\n";
		}
		else
		{
			aString += "The Demon now has " + theBoss.HP + " HP. ";
		}

		$("#outputInfo").append(aString);
		if(theBoss.isAlive())
			$("#outputInfo").append(theBoss.action());
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
	var aString = "";
	var dmgDealt = Math.floor(20*getRandom(0.75, 1.25));
	if(isInvi)
		isInvi = 0;

	//secret room
	if(currentRoom.roomType() == 2) //if secret room
	{
		if(currentRoom.roomContent.hasRock)
		{
			currentRoom.roomContent.hasRock = 0;
			$("#outputInfo").append("The explosion wipes out all objects insight. The room is flat and truly empty now.\n");
		}
		if(currentRoom.roomContent.type == 0) //if rock secret
			currentRoom.roomContent.action();
	}

	//monster room
	if(currentRoom.roomType() == 6) //if monster room
	{

		var aMonster = currentRoom.roomContent;
		aMonster.HP -= dmgDealt;
		aString += "The bomb explodes, damaging the monster for " + dmgDealt + " dmg.\n"
		if(!aMonster.isAlive())
			aString += "The monster flesh has been blown away. It is nothing more than a pile of bloody mess. "
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

	//trap room
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

	//boss room
	if(currentRoom.roomType() == 8)
	{
		var theBoss = currentRoom.roomContent;

		aString += "The bomb explodes! The Demon gets pushed away by the blast.\n";
		theBoss.HP -= dmgDealt;
		aString += "You hit the monster for " + dmgDealt + " dmg. ";

		if(!theBoss.isAlive())
		{
			aString += "The Demon weakly gets up, but the explosion took away half of his body. His flesh is melting.\n";
			aString += "The Demon finally crumbles on his knee. You take the chance and swing hard down on your sword. You severed the Demon's head.\n";
			aString += "The Demon lies dead in his own bloody mess.\n";
		}
		else
		{
			aString += "The Demon now has " + theBoss.HP + " HP. ";
		}

		$("#outputInfo").append(aString);
		if(theBoss.isAlive())
			$("#outputInfo").append(theBoss.action());
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

	//if its secret room
	if(currentRoom.roomType() == 2 && (itemName == 'torch' || itemName == 'fireSpell'))
		if(currentRoom.roomContent.type == 1) //if its light room
			currentRoom.roomContent.action();

	//if its monster room then you have 50% chance of getting hit after using item
	if(currentRoom.roomType() == 6 && checkSuccessRate(50))
		$("#outputInfo").append(currentRoom.roomContent.action());

	action();
	updateHeroInfo();
	updateNavigation(); //can be found in map.js
	showDescription(); //can be found in map.js
}

function rest()
{
	HP += Math.floor(0.25*maxHP*getRandom(0.75,1.75));
	if(HP > maxHP)
		HP = maxHP;
	var aString = "\nYou lay down on the cold, stony floor of the castle and slowly close your eyes. ";
	aString += "Everything turns to darkness and you drifts into an uncomfortable sleep...\n...\n";
	aString += "...You wake up to what feels like morning in this dank, cold place. You feels somewhat refreshed; your wound causes less pain now.\n"
	aString += "You now have " + HP + " HP.\n"

	if(checkSuccessRate(30)) //30% maze will get reshuffle
	{
		reshuffleMaze();
		aString += "It feels like in the night, everything moved and changed.\n";
	}
	$("#outputInfo").append(aString);
	updateHeroInfo();
	drawMap();
}

