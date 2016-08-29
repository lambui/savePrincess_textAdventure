class Monster
{
	/*variables:
		HP
		dmg
		attPrior
		sleep
		flying
		evasion
		alive
	*/
	constructor(hardness, sleep, flying)
	{
		var hardnessConstant = 50; //just because
		this.HP = hardness*getRandomInt(5, 15);
		this.evasion = Math.floor(hardness*getRandomInt(1,4)*getRandom(1, 2));
		this.dmg = Math.floor((hardnessConstant*hardness*hardness)/this.HP);
		this.sleep = sleep;
		this.flying = flying;
		this.alive = true;
		this.gold = hardness*getRandomInt(0,100);
		this.reward = getRandomInt(0, backpack.length-1);
		this.count = hardness*getRandomInt(1,3);
	}

	checkPlayer(){}

	isAlive()
	{
		this.alive = (this.HP > 0? true : false);
		if(this.alive == false)
		{
			gold += this.gold;
			if(backpack[this.reward].itemType == 'ability' && backpack[this.reward].count <= 0)
				backpack[this.reward].count = 1;
			else
				backpack[this.reward].count += this.count;

			currentRoom.customRoomType(0);
			currentRoom.roomContent.hasLight = 1;

			updateNavigation();
			updateHeroInfo();
		}
		return this.alive;
	}

	action()
	{
		var aString = "";
		if(evasion > getRandomInt(0,99))
			return aString + "The beast strikes you. You skillfully jump aside, leaving you scratchless.\n"

		var dmgDealt = Math.floor(this.dmg*getRandom(0.75,1.25));
		HP -= dmgDealt;
		aString += "The beast strikes you, doing " + dmgDealt + " dmg. ";
		if(HP <= 0)
		{
			$('#outputInfo').append(aString + "You are dead!\n");
			endGame(0);
			return;
		}
		aString += "You have " + HP + " HP left.";
		aString += "\n";
		return aString;
	}

	info()
	{
		var aString = "monster room with " + this.HP + "HP and " + this.dmg + "dmg. It ";
		aString += (this.flying == 0? "cannot " : "can ");
		aString += "fly. It is currently ";
		aString += (this.sleep == 0? "awake." : "sleeping.");
		aString += "\n";
		return aString;
	}
}