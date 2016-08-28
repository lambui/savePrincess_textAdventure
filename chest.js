class Chest
{
	constructor(danger)
	{
		this.danger = danger; // 0 == real chest, 1 == mimic
		this.magic = getRandomInt(0, 1); //if magic chest then it may heal player (1 == magical)
		this.open = 0;

		//init drop
		this.gold = getRandomInt(0, 1000);
		this.heal = 0;
		this.content = [];
		this.amount = [];
		if(this.danger == 1) //if its mimic then it holds nothing
		{
			this.gold = 0;
			return;
		}
		if(this.magic == 1 && checkSuccessRate(70)) //if its magical theres 70% it offers at least +10HP
			this.heal = getRandomInt(10, 50);

		//init content
		if(this.magic == 1 && checkSuccessRate(70)) //70% contain a spell
		{
			this.content.push(getRandomInt(22,24)); //22 to 24 are 3 spells
			this.amount.push(1);
		}

		if(checkSuccessRate(80)) //80% chance of getting equipment
		{
			var itemID = 0;
			if(getRandomInt(0,1))
				itemID = getRandomInt(0,4); //weapon
			else
				itemID = getRandomInt(6,10); //armor

			if(checkSuccessRate(25)) //chest have 20% chance (overall) of having legendary item
				if(getRandomInt(0,1))
					itemID = 5; //legend weapon
				else
					itemID = 11; //legend armor
			
			this.content.push(itemID);
			this.amount.push(1);
		}

		if(checkSuccessRate(50)) //50% chance of getting small potion
		{
			this.content.push(12) //small potion
			this.amount.push(getRandomInt(1,5));

			if(checkSuccessRate(40)) //extra chance of getting big potion
			{
				this.content.push(13);
				this.amount.push(getRandomInt(1,2));
			}
		}

		if(checkSuccessRate(70)) //70% chance of getting arrow
		{
			this.content.push(14) //arrow
			this.amount.push(getRandomInt(1,10));
		}

		if(checkSuccessRate(70)) //70% chance of getting torch
		{
			this.content.push(15) //torch
			this.amount.push(getRandomInt(1,5));
		}

		if(checkSuccessRate(70)) //70% chance of getting bomb
		{
			this.content.push(15) //bomb
			this.amount.push(getRandomInt(2,4));
		}

		if(this.magic == 0) //if its not magic chest
		{
			for(var i = 0; i < getRandomInt(1,3); i++) //up to 3 different special items
			{
				if(checkSuccessRate(70)) //70% chance of getting special item if its not magic chest
				{
					this.content.push(getRandomInt(17,20));
					this.amount.push(getRandomInt(1,2));
				}
			}

			if(checkSuccessRate(50)) //50% chance of getting heat goggles
			{
				this.content.push(21);
				this.amount.push(1);
			}
		}
		else //if it is
		{
			if(checkSuccessRate(50)) //70% chance of getting special item if its not magic chest
			{
				this.content.push(getRandomInt(25,29));
				this.amount.push(getRandomInt(1,2));
			}
		}
	}

	checkPlayer(){}

	action()
	{
		if(this.open == 1)
			return;

		this.open = 1;
		if(this.danger)
		{
			currentRoom.customRoomType(6); //turn into monster room
			currentRoom.roomContent.sleep = 0;
			updateNavigation(); //can be found in map.js
			$('#outputInfo').append(currentRoom.roomContent.info());
			return;
		}

		gold += this.gold;
		HP += this.heal; if(HP > maxHP) HP = maxHP;

		//take items from chest
		for(var i = 0; i < this.content.length; i++)
		{
			var index = this.content[i];
			if(backpack[index].itemType == 'ability' && backpack[index].count > 0) //skip if you get spell you have already learned
				continue;
			backpack[index].count += this.amount[i];
		}

		$('#outputInfo').append("You take everything from the chest.\n");
		return "You take everything from the chest.\n";
	}

	info()
	{
		var aString = "";
		if(this.open == 0)
			aString = "In a middle of room, you spot a weakly illuminating chest."
		else
			aString = "In a middle of room, there is an empty chest."
		aString += "\n";
		return aString;
	}
}
