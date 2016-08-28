class Boss
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
	constructor()
	{
		this.HP = 100;
		this.dmg = 30;
		this.evasion = 15;

		//boolean for special move
		this.fly = 0;
		this.invi = 0;
		this.slammed = 0;

		this.alive = true;
	}

	checkPlayer(){}

	isAlive()
	{
		this.alive = (this.HP > 0? true : false);
		if(this.alive == false)
		{
			currentRoom.customRoomType(0);
			currentRoom.roomContent.hasLight = 1;
			updateNavigation();
		}
		return this.alive;
	}

	action()
	{
		var aString = "";

		//invi and fly acti-deactivation
		if(this.invi == 0 && this.fly == 0) 
		{
			if(checkSuccessRate(25)) //25% it will turn invi if it can
			{
				aString += "The Demon casts his spell. His body slowly fades away. He is now completely out of sight.\n";
				this.invi = 1;
			}
			else if(checkSuccessRate(25))//25% it will turn fly if it can
			{
				aString += "The Demon flexes his wings. They open wide and with one fluid motion, he takes to the ceiling, flying.\n";
				this.fly = 1;
			}
		}
		else
		{
			if(this.invi == 1)
			{
				aString += "The Demon's spell is fading. He reappears.\n";
				this.invi = 0;
			}
			if(this.fly == 1)
			{
				aString += "The Demon lands on his feet. He folds back his wings.\n";
				this.fly = 0;
			}
		}

		//slam activation
		var dmgDealt = 0;
		if(this.slammed == 0)
		{
			if(checkSuccessRate(40)) //40% cast slam
			{
				dmgDealt = 25;
				aString += "The Demon suddenly slams down his large hammer causing a small quake, doing " + dmgDealt + " dmg. ";
				HP -= dmgDealt;
				this.slammed = 1;
				return aString;
			}
		}
		else
		{
			if(evasion > getRandomInt(0,99))
				return aString + "The Demon swings hit heavy hammer toward you. You skillfully jump aside, dodging his strike.\n"

			dmgDealt = Math.floor(this.dmg*getRandom(0.75,1.25));
			HP -= dmgDealt;
			aString += "The Demon slams his hammer sparely on your chest, doing " + dmgDealt + " dmg. ";
			if(HP <= 0)
				return aString + "you are dead.\n";
			aString += "You have " + HP + " HP left.";
			aString += "\n";
			return aString;
		}
	}

	info()
	{
		var aString = "Demon room with " + this.HP + "HP and " + this.dmg + "dmg.\n";
		return aString;
	}
}