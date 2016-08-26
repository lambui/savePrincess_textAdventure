
class Empty
{
	constructor() {}
	checkPlayer(){}
	info()
	{
		var aString = "A seemingly empty room."
		aString += "\n";
		return aString;
	}
}

class Riddle
{
	constructor() {}
	checkPlayer(){}

	info()
	{
		var aString = "Sitting squarely in the middle of the entire room is an mountain-like statue. It blocks all the other paths leading further into the castle. ";
		aString += "The only way to pass is going back but as you turning back, the statue starts speaking. Its low, booming voice echoes the room: ";
		aString += "'Adventurer, do not make haste. For I will yield the way if you will answer correctly my riddle... Or punishment if you won't.' ";
		aString += "It raises its large stone hand and slams hard against the stony floor behind you, blocking the retreating path. ";
		aString += "'Now, let's start.' The statue begins slowly.";
		aString += "\n";
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
		updateNavigation();
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

//make sure first room always be at the beginning of the array even if its shuffled
var firstRoom = mapArray[0];
mapArray.splice(0, 1); //cut off the first room
shuffle(mapArray); //shuffle
mapArray.unshift(firstRoom); //put back the first room at the start

//generate roomType
var indexCount = 0;
var randomStart = getRandomInt(0, mapArray.length-1);
while(indexCount < mapArray.length)
{
	var i = (randomStart + indexCount)%(mapArray.length);
	if(i == 0)
	{
		mapArray[i].customRoomType(0);
		roomTypeCounter[0] += 1;
		indexCount += 1;
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

	indexCount += 1;
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
function navigationAction(enterDirection) //string enterDirection
{
	if(currentRoom == undefined)
		return;

	//mark retreat path
	var navigationArray = $('.navigation').children();
	for(var i = 0; i < navigationArray.length; i++)
	{
		$(navigationArray[i]).removeClass('retreat');
		if(navigationArray[i].id == enterDirection)
			$(navigationArray[i]).addClass('retreat');
	}

	var canAdvance = 1; //path is not blocked
	var canSleep = 1;  //cant sleep here
	var canRun = 1; //can go back
	var roomType = currentRoom.roomType();

	currentRoom.roomContent.checkPlayer();
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
		default: break;
		case 0:
		case 1:
		case 2:
		case 3:
			canAdvance = 1;
			canSleep = 1;
			canRun = 1;
			break;
		case 4:
			canAdvance = 0;
			canSleep = 0;
			canRun = 0;
			break;
		case 5: //gamble
			canAdvance = 0;
			canSleep = 0;
			canRun = 1;
			break;
		case 7: //trap
			canAdvance = currentRoom.roomContent.canPass;
			canSleep = 0;
			canRun = 1;
			break;
		case 6: //monster
			if(currentRoom.roomContent.sleep == 1 || isInvi)
			{
				canAdvance = 1;
				canRun = 1;
			}
			else
			{
				canAdvance = 0;
				canRun = 0;
			}
			canSleep = 0;
			break;
		case 8: //boss
			canAdvance = 0;
			canSleep = 0;
			canRun = 0;
			break;
	}

	enableNavigationButtons();

	if(canAdvance == 0) //block all the other advancing path
	{
		for(var i = 0; i < navigationArray.length; i++)
			if(navigationArray[i].id != enterDirection)
				navigationArray[i].disabled = true;
	}

	if(canSleep == 0) //disable sleep
		navigationArray[navigationArray.length-1].disabled = true;

	if(canRun == 0) //block retreat path
		for(var i = 0; i < navigationArray.length; i++)
			if(navigationArray[i].id == enterDirection)
				navigationArray[i].disabled = true;

	if(posX == 0)
		$('#left')[0].disabled = true;
	if(posX == column-1)
		$('#right')[0].disabled = true;
	if(posY == 0)
		$('#down')[0].disabled = true;
	if(posY == row-1)
		$('#up')[0].disabled = true;

	action(); //can be found in player.js
}

function updateNavigation()
{
	if(currentRoom == undefined)
		return;
	navigationAction($('.retreat')[0].id);
}

function disableNavigationButtons()
{
	$('#up')[0].disabled = true;
	$('#down')[0].disabled = true;
	$('#left')[0].disabled = true;
	$('#right')[0].disabled = true;
	$('#rest')[0].disabled = true;
}

function enableNavigationButtons()
{
	$('#up')[0].disabled = false;
	$('#down')[0].disabled = false;
	$('#left')[0].disabled = false;
	$('#right')[0].disabled = false;
	$('#rest')[0].disabled = false;
}

function goInDirection(direction) // 0 = left, 1 = up, 2 = right, 3 = down
{
	if(HP <= 0)
	{
		disableNavigationButtons();
		return;
	}

	var navigationArray = $('.navigation').children();
	if($(navigationArray[direction]).hasClass('retreat')==false)
	{
		if(currentRoom.roomType() == 7) //trap room
		{
			if(currentRoom.roomContent.action() == 0)
			{
				updateHeroInfo(); //can be found in player.js
				goInDirection(direction);
				return;
			}
		}
	}

	var enterDirection;
	switch(direction)
	{
		case 0: goLeft(); 	enterDirection = 'right'; break;
		case 1: goUp(); 	enterDirection = 'down'; break;
		case 2: goRight(); 	enterDirection = 'left'; break;
		case 3: goDown(); 	enterDirection = 'up'; break;
		default: break;
	}
	currentRoom = map[posY][posX];
	currentRoom.roomContent.checkPlayer(); //check player special effects
	drawMap();
	showDescription();
	resetMordifier(); //can be found in player.js
	navigationAction(enterDirection);
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
					draw += "↑";
				else
					draw += "─";
				if(j != map[i].length-1)
					draw += "┴";
				else
					draw += "┘";
			}
			draw += "\n | C A S T L E  M A P\n\n";
			draw += "   ■: your location\n";
			draw += "   B: boss\n";
			draw += "   C: chest\n";
			draw += "   G: gamble\n";
			draw += "   M: monster\n";
			draw += "   R: riddle\n";
			draw += "   S: shop\n";
			draw += "   T: trap\n";
		}
	}

	$("#map").text(draw);
	console.log(draw);
}

//room description
function showDescription()
{
	var desc = currentRoom.showRoomContent();
	console.log(desc);
	$("#outputInfo").text(desc);
}