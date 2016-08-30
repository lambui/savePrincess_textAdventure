function updateHeroInfo()
{
	var heroInfo = $('.playerInfo').children();

	//hero stat
	for(var i = 0; i < heroInfo.length; i++)
	{
		var container = heroInfo[i];
		switch(heroInfo[i].id)
		{
			default: break;
			case 'name': container.innerHTML = name; break;
			case 'gold': container.innerHTML = "Gold: " + gold; break;
			case 'HP': container.innerHTML = "HP: " + HP + "/" + maxHP; break;
			case 'dmg': container.innerHTML = "Damage: " + dmg; break;
			case 'evasion': container.innerHTML = "Evasion: " + evasion + "%"; break;
		}
	}

	//hero equipment
	var container = $('#passiveItem')[0];
	container.innerHTML = "Equipment: "; //clear content of container
	var weaponString = "";
	var armorString = "";
	var addonString = "";

	//hero inventory
	var container2 = $('#inventoryItem')[0];
	container2.innerHTML = "Backpack: ";
	var itemString = "";

	for(var i = 0; i < backpack.length; i++)
	{
		//add appropriate items to equipment div
		if(backpack[i].itemType == 'weapon' && backpack[i].count > 0)
			weaponString = "<div>•" + backpack[i].showName + "</div>\n";
		if(backpack[i].itemType == 'armor' && backpack[i].count > 0)
			armorString = "<div>•" + backpack[i].showName + "</div>\n";
		if(backpack[i].itemType == 'addon' && backpack[i].count > 0)
			addonString += "<div>•" + backpack[i].showName + "</div>\n";

		//add items to inventory div
		if(backpack[i].count > 0)
			if(backpack[i].itemType != 'ability')
			{
				itemString += "<div id='backpackItem" + i + "' onClick=\"displayItemInfo(this.id.substring('backpackItem'.length, this.id.length))\">•";
				itemString += backpack[i].showName + " (x" + backpack[i].count + ")" + "</div>\n";
			}
			else
			{
				itemString += "<div id='backpackItem" + i + "' onClick=\"displayItemInfo(this.id.substring('backpackItem'.length, this.id.length))\">•";
				itemString += backpack[i].showName + " (learned)</div>\n";
			}
	}
	if(itemString != "") $(container2).append(itemString);
	if(weaponString != "") $(container).append(weaponString);
	if(armorString != "") $(container).append(armorString);
	if(addonString != "") $(container).append(addonString);
}

$(document).ready(function()
{
	$('#inputHeroName').focus(function()
	{
		$(this).val('');
	});
	startScreen();

	//override append to add autoscroll bottom
	(function($) {
	    var origAppend = $.fn.append;

	    $.fn.append = function () {
	        return origAppend.apply(this, arguments).trigger("append");
    };
	})(jQuery);
	$("#outputInfo").bind("append", function() 
	{
		$(this).scrollTop(this.scrollHeight);
	});

	//intro box
	$('#easy').hover(function()
	{
		$('#infoBox').text(getDifficultyText(0));
	});

	$('#hard').hover(function()
	{
		$('#infoBox').text(getDifficultyText(1));
	});
});

function easyMode()
{
	backpack[22].count = 1; 
	backpack[23].count = 1;
	backpack[24].count = 1;

	startGame();
}

function startGame()
{
	var inputName = $('#inputHeroName').val();
	if(inputName == "" || inputName == "Enter your hero's name.")
	{
		$('#infoBox').text("Enter your hero's name!");
		$('#inputHeroName').val("Enter your hero's name.");
		return;
	}

	init(inputName);
	updateHeroInfo();

	//init maze info
	assignRandomRoomType();
	posX = posY = 0;
	currentRoom = map[posY][posX];
	currentRoom.visit = 1;
	console.log(posX + " " + posY);
	drawMap();
	showDescription();
	navigationAction(3);
	calculateStat();
	action();
	$($('.intro')[0]).css('visibility', 'hidden');
}

function startScreen()
{
	$('#easyArt').text(getDifficultyArt(0));
	$('#hardArt').text(getDifficultyArt(1));
}

function getDifficultyText(input)
{
	aString = ""; 
	switch(input)
	{
		case 0:
			aString += "You will play as an experienced wizard.\n";
			aString += "HP: " + d_maxHP + "\n";
			aString += "Damage: " + d_dmg + "\n";
			aString += "Gold: " + 500 + "\n";
			aString += "You have already mastered all the magics: flight magic, water magic, and fire magic.\n";
			aString += "Difficulty: easy.\n";
			break;
		case 1:
			aString += "You will play as an skillful knight.\n";
			aString += "HP: " + d_maxHP + "\n";
			aString += "Damage: " + d_dmg + "\n";
			aString += "Gold: " + 500 + "\n";
			aString += "You entered the castle with nothing but your bare hands.\n";
			aString += "Difficulty: hard.\n";
			break;
	}
	return aString;
}

function endGame(input)
{
	$($('.end')[0]).css('visibility', 'visible');
	$('#endArt').text(getEndArt(input));
	if(input)
	{
		$('#endInfoBox').text("You strike down Princess Madeleine's chains and set her free. She weakly tumbles but you catch her. ");
		$('#endInfoBox').append("You carry her in your arms and you both safely get out of the cursed castle...\n");
		$('#endInfoBox').append("Back in the kingdom castle, a large celebration takes place for the safe return of the princess. Everyone is overjoyed.\n");
		$('#endInfoBox').append("You get awarded into noblehood by the king and live richly afterward.\n");
	}
	else
	{
		$('#endInfoBox').text("-----What happened-----\n");
		$('#endInfoBox').append($('#outputInfo').text());
		$('#endInfoBox').append("...\n-----------------------\n\n");
		$('#endInfoBox').append("Unfortunately, you are dead before reaching the princess.\n");
		$('#endInfoBox').append("She will probably die in the Demon's capture unless another brave hero is sent to rescue her...");
	}
	$('#endInfoBox').append("\nTHANK YOU FOR PLAYING 100-ROOMS!\n");
}


function getDifficultyArt(input)
{
	aString = "";
	switch(input)
	{
		case 0:
			aString += '      ○    *.\'\n';
			aString += '     / \\  *-○-*\n';
			aString += '    /___\\  \'|` *\n';
			aString += '   (o _ o) *|\n';
			aString += '   /-----\\==@ *\n';
			aString += '  /   *   \\\n';
			aString += ' /_________\\ \n';
			aString += '   ||   ||\n';
			aString += ' \n';
			aString += ' W I Z A R D\n';
			break;
		case 1:
			aString += '    _____   ║\n';
			aString += '   /     \\  ║\n';
			aString += '   |_ * _|  ║\n';
			aString += '   |o\\_/o| ═╬═\n';
			aString += '   |-----|==@\n';
			aString += '   |     |\n';
			aString += '   |_____| \n';
			aString += '   ||   ||\n';
			aString += ' \n';
			aString += ' K N I G H T\n';
			break;
	}
	return aString;
}

function getEndArt(input) //0 = lose, 1 = win
{
	var aString = "";
	switch(input)
	{
		case 0:
			aString += '                _.--""--._\n';
			aString += '               /  _    _  \\\n';
			aString += '            _  ( (_\  /_) )  _\n';
			aString += '           { \\._\\   /\\   /_./ }\n';
			aString += '           /_"=-.}______{.-="_\\\n';
			aString += '            _  _.=("""")=._  _\n';
			aString += '           (_\'"_.-"`~~`"-._"\'_)\n';
			aString += '            {_"            "_}\n';
			aString += '\n';
			aString += '          Y O U   A R E   D E A D!\n';
			break;
		case 1:
			aString += '                                   .\'\'.       \n';
			aString += '       .\'\'.      .        *\'\'*    :_\\/_:     . \n';
			aString += '      :_\\/_:   _\\(/_  .:.*_\\/_*   : /\\ :  .\'.:.\'.\n';
			aString += '  .\'\'.: /\\ :   ./)\\   \':\'* /\\ * :  \'..\'.  -=:o:=-\n';
			aString += ' :_\\/_:\'.:::.    \' *\'\'*    * \'.\\\'/.\' _\\(/_\'.\':\'.\'\n';
			aString += ' : /\\ : :::::     *_\\/_*     -= o =-  /)\\    \'  *\n';
			aString += '  \'..\'  \':::\'     * /\\ *     .\'/.\\\'.   \'\n';
			aString += '      *            *..*         :\n';
			aString += '\n';
			aString += 'C O N G R A T - P R I N C E S S   IS   S A V E D !!!\n';
			break;
	}
	return aString;
}

