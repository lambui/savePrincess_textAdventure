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
		this.betGold = 0;
		this.goldRate = 100;
		this.totalChoice = 0;
		switch(this.gameType)
		{
			default: break;
			case 0: this.totalChoice = 2; break;
			case 1: this.totalChoice = 3; break;
		}

		this.choices = [];
		this.choices.push(1); //push the right choice into array
		for(var i = 1; i < this.totalChoice; i++)
			this.choices.push(0); //the rest is wrong choices

		shuffle(this.choices); //can be found in header.js
	}
	checkPlayer(){}

	action() //use action talk 
	{
		//get display betGold
		$('#betGold').html(this.betGold);

		if(this.betGold <= 0)
			$('#startGamble')[0].disabled = true;
		else
			$('#startGamble')[0].disabled = false;

		//disable + - buttons appropriately
		$('#addGold')[0].disabled = false;
		$('#removeGold')[0].disabled = false;
		if(gold < this.goldRate)
			$('#addGold')[0].disabled = true;
		if(this.betGold < this.goldRate)
			$('#removeGold')[0].disabled = true;

		var appendChoices = "";
		$('#choiceArea').text(appendChoices);

		/* this is what getting appended to choiceArea div
		<div class='wrapper'>
			<textarea id="choice1" type="text" class="outputField" readonly="readonly" rows="8" cols="15"></textarea>
			<button id="choose1">Choose 3</button>
		</div>
		*/
		for(var i = 0; i < this.choices.length; i++)
		{
			appendChoices = "<div class='wrapper'>\n";
			appendChoices += "<textarea id='choice" + i + "' type='text' class='outputField' readonly='readonly' rows='8' cols='15'></textarea> ";
			appendChoices += "<button id='choose" + i + "' onClick='chooseThis(this.id.substr(this.id.length - 1))'>Choose " + i + "</button>\n";
			appendChoices += "</div>\n";
			$('#choiceArea').append(appendChoices);

			//put cup art into textarea
			var idString = '#choice' + i;
			$(idString).append(getCupString(0, i));

			//disable choose buttons
			idString = '#choose' + i;
			$(idString)[0].disabled = true;
		}
	}

	result(isWin) //1 == win, 0 == lose
	{
		var aString = "";
		if(isWin)
		{
			switch(this.gameType)
			{
				case 0: gold += 2*this.betGold; break;
				case 1: gold += 3*this.betGold; break;
			}
			aString += "Lucky boy... You manage to see through my tricks. Here is your reward. Now hurry up and get away from me!!!\n";
			aString += "(The shape suddenly casts some sort of magic in its anger, pushing everything away. Then it pulls its belongings back to itself and together they all vanish)\n";
			aString += "(In the location where the dark shape once sat, you notice the gold you placed and some extra coins. At least it keeps its end of the deal)\n";
		}
		else
		{
			aString += "Hahaha. A fool you are. None has ever win against me in this game. Say goodbye to your gold...\n";
			if(this.dark)
			{
				var HPLoss = 0;
				switch(this.gameType)
				{
					case 0: HPLoss = Math.floor(maxHP*15/100); break;
					case 1: HPLoss = Math.floor(maxHP*25/100); break;
				}
				HP -= HPLoss;
				aString += "And your life forces!!!\n";
				aString += "(The dark shape quickly shifts from its place and casts dark magic, draining some sort of glowing, green-colored substance from within your chest)\n";
				aString += "(You start to feel disconnected with your whole body. You have no will to resist against that thing; you feel tired, very tired)\n";
				aString += "(The shape finishes its magic. It violently pushes you away from the table with a powerful blow of magic)\n";
				aString += "Ahhhhh... New life forces. Now scram. You are of no use now. Be thankful I did not kill you.\n";
				aString += "(The shape and all its belongings vannish. You lose " + HPLoss + " HP)\n";
			}
			else
			{
				aString += "(The shape and all its belongings vannish)\n";
			}
		}

		if(HP <= 0)
		{
			endGame(0);
			return;
		}

		$('#outputInfo2').append(aString);
		this.betGold = 0; $('#betGold').html(this.betGold);
		currentRoom.customRoomType(0);
		currentRoom.roomContent.hasLight = 1;
		updateNavigation();
		updateHeroInfo();
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
		aString += "\n";
		return aString;
	}
}

function exitTable()
{
	$('#outputInfo').append($('#outputInfo2').text());
	if(currentRoom.roomType() != 5)
		$('#outputInfo2').text("");
	$($('.gambleTable')[0]).css('visibility', 'hidden');
}

function changeBetGold(input) //0 == add to bet, 1 == take away from bet
{
	if(currentRoom.roomType() != 5) //not gamble
		return;

	var gambleRoom = currentRoom.roomContent;
	var goldRate = gambleRoom.goldRate;

	switch(input)
	{
		case 0: 
			gold -= goldRate; 
			gambleRoom.betGold += goldRate; 
			break;
		case 1: 
			gold += goldRate; 
			gambleRoom.betGold -= goldRate; 
			break;
	}

	//disable start button
	if(gambleRoom.betGold > 0)
		$('#startGamble')[0].disabled = false;
	else
		$('#startGamble')[0].disabled = true;

	$('#addGold')[0].disabled = false;
	$('#removeGold')[0].disabled = false;

	if(gold < goldRate)
		$('#addGold')[0].disabled = true;

	if(gambleRoom.betGold < goldRate)
		$('#removeGold')[0].disabled = true;

	updateHeroInfo(); //can be found in init.js
	$('#betGold').html(gambleRoom.betGold);
}

function startGamble()
{
	if(currentRoom.roomType() != 5) //not gamble
		return;

	var gambleRoom = currentRoom.roomContent;
	if(gambleRoom.betGold <= 0)
		return;

	//disable start button
	$('#startGamble')[0].disabled = true;

	//disable exit button
	$('.gambleTable .inner #exit')[0].disabled = true;

	//disable gold change buttons
	$('#addGold')[0].disabled = true;
	$('#removeGold')[0].disabled = true;

	$('#outputInfo2').append("Let's us begin. Below are your options. If you can choose the one that contains this troublesome devil: \n");
	$('#outputInfo2').append(getCupString(3, 0));
	$('#outputInfo2').append("You win... and will get rewarded accordingly.\n");

	//enable choices
	for(var i = 0; i < gambleRoom.choices.length; i++)
	{
		//enable choose buttons
		idString = '#choose' + i;
		$(idString)[0].disabled = false;
	}
}

function chooseThis(input)
{
	if(currentRoom.roomType() != 5) //not gamble
		return;

	var gambleRoom = currentRoom.roomContent;
	var index = parseInt(input);
	var idString = '#choice' + input;
	$(idString).text("");
	if(gambleRoom.choices[index] == 1)
	{
		$(idString).append(getCupString(1, index));
		gambleRoom.result(1);
	}
	else
	{
		$(idString).append(getCupString(2, index));
		gambleRoom.result(0);
	}

	//disble all choices now
	for(var i = 0; i < gambleRoom.choices.length; i++)
	{
		//disble choose buttons
		idString = '#choose' + i;
		$(idString)[0].disabled = true;
	}

	//enable exit
	$('.gambleTable .inner #exit')[0].disabled = false;
}

function getCupString(type, cupNumber)
{
	var aString = "";
	switch(type)
	{
		case 0: //normal type
			aString = "     .-~~-.\n";
			aString += "    /``````\\\n";
			aString += "   /   ??   \\\n";
			aString += "  /`.______.'\\\n";
			aString += " /            \\\n";
			aString += "/      (" + cupNumber + ")     \\\n";
			aString += "`-..________..-'\n";
			break;
		case 1: //correct cup
			aString = "  /`.______.'\\\n";
			aString += " /            \\\n";
			aString += "/      (" + cupNumber + ")     \\\n";
			aString += "`-..________..-'\n";
			aString += "      ▲--▲\n";
			aString += "     (*  *)\n";
			aString += "    (______)\n";
			break;
		case 2: //wrong cup
			aString = "  /`.______.'\\\n";
			aString += " /            \\\n";
			aString += "/      (" + cupNumber + ")     \\\n";
			aString += "`-..________..-'\n";
			aString += "\n";
			aString += "\n";
			aString += "\n";
			break;
		case 3:
			aString = "  ▲--▲\n";
			aString += " (*  *)\n";
			aString += "(______)\n";
			break;
	}
	return aString;
}
