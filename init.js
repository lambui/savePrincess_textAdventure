$(document).ready(function()
{
	var inputName = prompt("Please enter your hero name: ", "your hero's name.");
	if(inputName != null)
	{
		init(inputName);
	}

	posX = posY = 0;
	currentRoom = map[posY][posX];
	console.log(posX + " " + posY);
	drawMap();
	showDescription();
});