class Secret
{
	constructor(theRoom)
	{
		//3 types of secret: rock, light, nothing
		this.type = getRandomInt(0, 2);
		this.hasRock = getRandomInt(0,1);
		this.hasLight = getRandomInt(0,1);
		switch(this.type)
		{
			case 0: //rock
				this.hasRock = 1;
				break;
			case 1:
				this.hasLight = 0;
				break;
			default: break;
		}

		this.reward = [];

		//legendary sword or armor
		if(checkSuccessRate(50)) //50% have legendary
		{
			if(getRandomInt(0,1))
				this.reward.push(5); //legend sword
			else
				this.reward.push(11); //legend armor
			return;
		}

		this.reward2 = new Chest();
	}

	action()
	{
		if(this.type == 0) //rock type
			this.getReward();

		if(this.type == 1) //light type
			this.getReward();

		if(this.type == 2) //nothing type just gotta inspect more
			this.actionInspect();
	}

	getReward()
	{
		if(this.reward.length == 0)
		{
			$("#outputInfo").append("You found a chest hidden in the room!\n");
			this.reward2.action();
		}
		else
		{
			$("#outputInfo").append("You found something emitting strong, divine energy. You reach for it...\n");
			backpack[this.reward[0]].count += 1;
		}
		calculateStat();
		currentRoom.customRoomType(0);
		currentRoom.roomContent.hasRock = this.hasRock;
		currentRoom.roomContent.hasLight = this.hasLight;
		updateNavigation();
	}

	actionInspect()
	{
		if(this.hasLight == 0)
			return;

		if(this.hasRock)
			if(checkSuccessRate(25)) //success rate each inspect 25% w rock
				this.getReward();
		else
			if(checkSuccessRate(50)) //success rate each inspect 50% w/o rock
				this.getReward();
	}

	checkPlayer(){}

	info()
	{
		var aString = "";
		if(this.hasLight == 0)
			aString += "A compelety dark room, voided of any source of light. In front of you, only an omnious darkness exists.\n";
		else
		{
			if(this.hasRock == 1)
			{
				aString += "An seemingly empty room, scratthered with large chunks of rocks, stones, and collapsed structures of the past.\n"
			}
			else
			{
				aString += "A seemingly empty room.\n"
			}
		}
		return aString;
	}
}
