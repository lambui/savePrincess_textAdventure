class Trap
{
	/*trap type:
		fire	0
		arrow 	1
		pike 	2
		pitfall 3
	*/
	constructor(type, visible)
	{
		this.type = type;
		this.visible = visible;

		if(this.visible == 1)
			this.canPass = 0;

		this.luckyChance = 0;
		switch(this.type)
		{
			case 0: this.luckyChance = 10; break;
			case 1: this.luckyChance = 10; this.canPass = 1; break;
			case 2: this.luckyChance = 0; break;
			case 3: this.luckyChance = 0; break;
			default: break;
		}
	}

	checkPlayer()
	{
		//if player has revealTrinket
		if(backpack[29].count > 0)
		{
			this.visible = 1;
			this.canPass = 1;
			if(this.type != 1)
				this.canPass = 0;
		}

		//if player has counter for trap
		switch(this.type)
		{
			default: break;
			case 0: if(isFireResis) this.canPass = 1; break;
			case 1: if(isBlock) this.canPass = 1; break;
			case 2: if(isFly) this.canPass = 1; break;
			case 3: if(isFly || isJump) this.canPass = 1; break;
		}
	}

	info()
	{
		var aString = "";
		if(this.visible == 0)
		{
			return "A seemingly empty room.\n";
		}
		
		aString += "A dangerous room. It is filled with ";
		switch(this.type)
		{
			default: break;
			case 0: aString += "fire shooting out from all sides. The entire room is flooded with unbearable heat."; break;
			case 1: aString += "arrow firing out from million holes in the wall. You can hear the constant 'wshhh' sound of arrows narrowly scraching your ears."; break;
			case 2: aString += "sharp pikes protruding everywhere. The entire room looks like a densely packed mineral mines with deadly poles. You can see remnants of past adventurers in between."; break;
			case 3: aString += "a enormous, unfathomable hole scretching across from wall to wall. From the depthless pit, you can hear the wailing of creatures who carelessly fell in from ages ago."; break;
		}

		aString += "\n";
		return aString;
	}

	action() //return 1 == alive, 0 == dead
	{
		if(this.luckyChance > getRandomInt(0,99))
		{
			return 1;
		}
		else
		{
			this.visible = 1; this.canPass = 0; //trap is sprung

			var aString = "";
			switch(this.type)
			{
				default: HP = 0; break;
				case 0: //fire trap
					if(isFireResis == 0)
					{
						HP = 0;
						aString += "You steps on loose rock. Suddenly, fire pours out from everywhere. The room is filled with intense light and heat. ";
						aString += "One second you feels the hot heat lick your skin, the next you feels your skin sizzling under your burning clothes. ";
						aString += "Cannot bear the intense pain, you fall on your knee. You collapse, wither; awaiting death.\n";
					}
					break;
				case 1: //arrow trap
					if(isBlock == 0)
					{
						var HPLoss = 0;
						if(20 < getRandomInt(0,99))
							HPLoss = 5;
						else
							HPLoss = 20;
						HP -= HPLoss;
						aString += "You steps on a loose rock. Suddenly, millions of holes appear along the walls, shooting out endless rounds of arrows. ";
						aString += "With nothing to cover yourself, you tries to sprint to the nearest exit... You lose " + HPLoss + " HP.\n";
					}
					break;
				case 2: //pike
					if(isFly == 0)
					{
						HP = 0;
						aString += "You take your first step forward. Unfortunately, something goes wrong and endless pillars of sharp tusk protrude out from all sides. ";
						aString += "With no time to react, you stand helplessly in the middle of the room, feeling pike after pike impaling your body, skewering your flesh. ";
						aString += "Blood is pouring out of your body like a gushing river. In your final moment, you notice remnants of past adventurers stuck inbetween the bloody pillars. ";
						aString += "Soon you will be one of them.\n"
					}
					break;
				case 3: //pit
					if(isFly == 0) //doesnt have flight
					{
						if(isJump == 0) //doesnt have high jump
						{
							HP = 0;
							aString += "You take a long distance back, attempting a big jump. Maybe you can make it. You believe you can make this hole.\n";
							aString += "And you jump, flying over the endless depth...\n";
							aString += "But it is not enough, your front foot barely touch the other end of the opening. ";
							aString += "You let out a scream so loud it can shake the entire castle. And you start to fall... You falls for so long that your mind starts to calm down after the initial panic.\n";
							aString += "You close your eyes and accept death. None hears the sound of your body hitting the ground.\n"
							break;
						}
						else if(80 < getRandomInt(0,99)) //have high jump but unlucky, fail condition
						{ 
							HP = 0;
							aString += "You take a long distance back, attempting a big jump. You know you can make it. You have the spring-loaded boots to help afterall.\n";
							aString += "And you jump. The boots work it magic. Their machanical gears and spring snap, launching you upward and forward. You fly across the bottomless pit.\n";
							aString += "But the pit is too vile for you and your mechanical tool. It is simply too wide, too big. Your most out-streched foot barely scraches the other end of the deathly hole.\n";
							aString += "You let out big scream while mantically cursing the mechanical boots on your feet.\n"
							aString += "'Was it because they are not loaded proberly? Or was it because they are too heavy?...' ";
							aString += "A thousand questions, curses, prayers simultaneously pop in your head. But none of those matter. None of those can save your life.\n";
							aString += "You let out a deep breath and embrace death.\n"
							break;
						}
					}
					break;
			}
			if(HP <= 0)
			{
				endGame(0);
				$("#outputInfo").append(aString + "You are dead.\n");
				return 0;
			}
			$("#outputInfo").append(aString + "The trap sprung but you are alive.\n");
			return 1;
		}
	}

	specialAction() //when player use Jump
	{
		if(this.type != 3) //should never happen but its here in case
			return action();

		if(isJump == 0) //doesnt have high jump
			if(60 < getRandomInt(0,99)) //still have 60% chance of making it
				HP = 0;
		else if(80 < getRandomInt(0,99)) //have 80% chance of making it
			HP = 0;

		if(HP <= 0)
		{
			$("#outputInfo").append("You do not make the jump. You are dead.\n");
			return 0;
		}
		return 1;
	}
}