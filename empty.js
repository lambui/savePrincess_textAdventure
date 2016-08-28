class Empty
{
	constructor() 
	{
		this.hasLight = getRandomInt(0,1);
		this.hasRock = getRandomInt(0,1);
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
