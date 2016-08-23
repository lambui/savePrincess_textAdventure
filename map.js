/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
class Empty
{
	constructor() {}
	info()
	{
		var aString = "An seemingly empty room."
		return aString;
	}
}

class Shop
{
	//2 shop type: marchant == 0 and wizard == 1
	constructor(shopType)
	{
		this.shopType = shopType;
	}

	info()
	{
		var aString = "";
		if(this.shopType == 0) //merchant
		{
			aString += "Very much contrasting with everything you have seem so far in this omnious place, an enormous, colorful, and festive parade appears right before your eyes. ";
			aString += "Colorful banners waving, trumpets playings, drums thumping, the entire scenery is bursting with life. All are originated from the huge wagon moving slowly across the room. ";
			aString += "The wagon suddenly comes to a halt in front of you and a big man who cladded in colorful silk gracefully steps out. He smiles and suggests you to come see his wares.";
		}
		else //wizard
		{
			aString += "From one dark corner of the room, a thunderous voice suddenly calls out inquiring the identity of the intruder. ";
			aString += "Within an eye blink, a man draped in ragged cloth suddenly appears in front of you, hands crackling with powerful arcane magic. ";
			aString += "He levitates, towering over you, looking down onto you with light-filled eyes. The man then asks again: 'What business do you have here?'";
		}
		return aString;
	}
}

class Chest
{
	constructor(danger)
	{
		this.danger = danger; // 0 == real chest, 1 == mimic
	}

	info()
	{
		var aString = "In a middle of room, you spot a weakly illuminating chest."
		return aString;
	}
}

class Riddle
{
	constructor() {}

	info()
	{
		var aString = "Sitting squarely in the middle of the entire room is an mountain-like statue. It blocks all the other paths leading further into the castle. ";
		aString += "The only way to pass is going back but as you turning back, the statue starts speaking. Its low, booming voice echoes the room: ";
		aString += "'Adventurer, do not make haste. For I will yield the way if you will answer correctly my riddle... Or punishment if you won't.' ";
		aString += "It raises its large stone hand and slams hard against the stony floor behind you, blocking the retreating path. ";
		aString += "'Now, let's start.' The statue begins slowly.";
		return aString;
	}
}

class Gamble
{
	/*2 type of gamble:
		normal = just win/lose gold
		dark   = win/lose gold but also lose HP

	2 type of games:
		type 0: 1 out of 2
		type 1: 1 out of 3
	*/

	constructor(dark, gameType)
	{
		this.dark = dark;
		this.gameType = gameType;
	}

	info()
	{
		var aString = "In the middle of the room, you spot a powerful shade sitting at what seemed like a floating table. "
		if(this.gameType == 0)
			aString += " You can make out 2 objects sliding on top of the table. ";
		else
			aString += " You can barely see the 3 objects sitting atop the table. "
		aString += "The shade gestures you forward. ";
		if(this.dark == 1)
			aString += "You have a bad feeling about this.";
		return aString;
	}
}

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
		this.evasion = hardness*getRandomInt(1,4);
		this.dmg = Math.floor((hardnessConstant*hardness*hardness)/this.HP);
		if(this.dmg > 15)
			this.attPrior = 3;
		else if(this.dmg > 8)
			this.attPrior = 2;
		else
			this.attPrior = 1;
		this.sleep = sleep;
		this.flying = flying;
		this.alive = true;
	}

	isDead()
	{
		this.alive = (HP > 0? true : false);
		return this.alive;
	}

	info()
	{
		var aString = "monster room with " + this.HP + "HP and " + this.dmg + "dmg. It ";
		aString += (this.flying == 0? "cannot " : "can ");
		aString += "fly. It is currently ";
		aString += (this.sleep == 0? "sleeping." : "awake.");
		return aString;
	}
}

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
	}

	info()
	{
		var aString = "";
		if(this.visible == 0)
		{
			return "An omnious room.";
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

		return aString;
	}
}

class Room
{
	constructor(main, hasRock, lighting)
	{
		this.main = main;
		this.hasRock = hasRock;
		this.lighting = lighting;
		this.roomContent = new Empty();
	}

	customRoomType(input)
	{
		this.main = input;
		this.loadRoom();
	}

	customRock(input)
	{
		this.hasRock = input;
	}

	customLight(input)
	{
		this.lighting = input;
	}

	roomType()
	{
		return this.main;
	}

	loadRoom()
	{
		switch(this.main)
		{
			case 0: //empty
			case 2: //secret
			default: this.loadEmpty(); break;
			case 1: this.loadShop(getRandomInt(0,1)); break;
			case 3: this.loadChest(getRandomInt(0,1)); break;
			case 4: this.loadRiddle(); break;
			case 5: this.loadGamble(getRandomInt(0,1), getRandomInt(0,1)); break;
			case 6: this.loadMonster(getRandomInt(1,3), getRandomInt(0,1), getRandomInt(0,1)); break;
			case 7: this.loadTrap(getRandomInt(0,3), getRandomInt(0,1)); break;
		}
		console.log(this.showRoomContent());
		return;
	}

	loadEmpty()
	{
		this.roomContent = new Empty();
	}

	loadShop(shopType)
	{
		this.roomContent = new Shop(shopType);
	}

	loadChest(danger)
	{
		this.roomContent = new Chest(danger);
	}

	loadRiddle()
	{
		this.roomContent = new Riddle();
	}

	loadMonster(hardness, sleep, flying) //int hardness: 1-3; boolean sleep, boolean flying
	{
		this.roomContent = new Monster(hardness, sleep, flying);
	}

	loadTrap(trapType, visible) //int trapType: 0-3; boolean visible
	{
		this.roomContent = new Trap(trapType, visible);
	}

	loadGamble(gambleType, gameType) //boolean gambleType, boolean gameType
	{
		this.roomContent = new Gamble(gambleType, gameType);
	}

	showRoomContent()
	{
		return this.roomContent.info();
	}
}

//make roomTypeArray
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
var roomTypeLimit = 
[
	10,
	5,
	5,
	10,
	10,
	10,
	34,
	15,
	1
];
var roomTypeCounter = new Array(roomTypeLimit.length);
for(var i = 0; i < roomTypeCounter.length; i++)
	roomTypeCounter[i] = 0;


//make 10x10 2D array of rooms
var column = 10;
var row = 10;
var map = new Array(row);
var mapArray = new Array(row*column);
for(var i = 0; i < map.length; i++)
{
	map[i] = new Array(column);
}

var index = 0;
for(var i = 0; i < map.length; i++)
{
	for(var j = 0; j < map[i].length; j++)
	{
		map[i][j] = new Room(0, 0, 1);

		//put them in a 1D array
		mapArray[index] = map[i][j];
		index += 1;
	}
}

//generate roomType
for(var i = mapArray.length-1; i >= 0; i--)
{
	if(i == 0)
	{
		mapArray[i].customRoomType(0);
		roomTypeCounter[i] += 1;
		continue;
	}

	while(true)
	{
		var randomType = getRandomInt(0, roomTypeCounter.length-1);
		if(roomTypeCounter[randomType] < roomTypeLimit[randomType])
		{
			mapArray[i].customRoomType(randomType);
			roomTypeCounter[randomType] += 1;
			break;
		}
	}
}

//this 2 will mark the current coordinate of the current room
var posX, posY;
var currentRoom;

/*map will look like this

Y
^
|
|
|
0-------->X
map[posY][posX]
*/

//navigation
function goInDirection(direction) // 0 = left, 1 = up, 2 = right, 3 = down
{
	switch(direction)
	{
		case 0: goLeft(); break;
		case 1: goUp(); break;
		case 2: goRight(); break;
		case 3: goDown(); break;
		default: break;
	}
	currentRoom = map[posY][posX];
	drawMap();
	showDescription();
	console.log(currentRoom.roomType());
}

function goRight()
{
	if(posX == column-1) //far right
		return;
	posX = posX + 1;
}

function goLeft()
{
	if(posX == 0) //far left
		return;
	posX = posX - 1;
}

function goUp()
{
	if(posY == row-1) //top
		return;
	posY = posY + 1;
}

function goDown()
{
	if(posY == 0) //bottom
		return;
	posY = posY - 1;
}

//draw
function drawMap()
{
	var draw = "";
	for(var i = map.length-1; i >= 0; i--)
	{
		if(i == map.length-1) //top wall
		{
			draw += "┌";
			for(var j = 0; j < map[i].length; j++)
			{
				draw += "─";
				if(j != map[i].length-1)
					draw += "┬";
				else
					draw += "┐";
			}
		}
		draw += "\n";

		for(var j = 0; j < map[i].length; j++)
		{
			if(j == 0) //far left wall
				draw += "|";
			if(i == posY && j == posX)
				draw += "■";
			else
			{
				var roomType = map[i][j].roomType();
				switch(roomType)
				{
					/*
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
					case 0: draw += " "; break;
					case 1: draw += "S"; break;
					case 2: draw += " "; break;
					case 3: draw += "C"; break;
					case 4: draw += "R"; break;
					case 5: draw += "G"; break;
					case 6: draw += "M"; break;
					case 7: draw += "T"; break;
					case 8: draw += "B"; break;
					default: draw += " "; break;
				}
				//"■";
			}
			if(j == map[i].length-1) //far right wall
				draw += "|";
			else
				draw += " ";
		}
		draw += "\n";

		if(i != 0)
		{
			draw += "├";
			for(var j = 0; j < map[i].length; j++)
			{
				draw += " ";
				if(j != map[i].length-1)
					draw += "┼";
				else
					draw += "┤";
			}
		}
		else //bottom wall
		{
			draw += "└";
			for(var j = 0; j < map[i].length; j++)
			{
				if(j == 0) //exit
					draw += "|";
				else
					draw += "─";
				if(j != map[i].length-1)
					draw += "┴";
				else
					draw += "┘";
			}
			draw += "\n v";
		}
	}

	$("#output").text(draw);
	console.log(draw);
}

//room description
function showDescription()
{
	var desc = currentRoom.showRoomContent();
	console.log(desc);
	$("#outputInfo").text(desc);
}