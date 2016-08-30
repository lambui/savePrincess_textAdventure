class Riddle
{
	constructor()
	{
		this.playOnce = 0;
		this.questionID = -1;
		this.answer = "";
		this.choiceArray = [];
		this.currentID = this.questionID;
		this.award = new Chest(0);
	}
	checkPlayer(){}

	getQuestion()
	{
		while(this.currentID == this.questionID) //get a random but different question from a previous one
			this.questionID = getRandomInt(0, riddleBank.length-1);

		this.currentID = this.questionID; //save this new ID to currentID

		this.answer = riddleBank[this.questionID].A; //save answer

		//put all options in array and shuffle
		this.choiceArray = [];
		this.choiceArray.push(this.answer);
		this.choiceArray.push(riddleBank[this.questionID].A1);
		this.choiceArray.push(riddleBank[this.questionID].A2);
		this.choiceArray.push(riddleBank[this.questionID].A3);
		shuffle(this.choiceArray);

		//put option text in the textareaID
		for(var i = 0; i < 4; i++)
		{
			var textareaID = '#replyArt' + (i+1);
			$(textareaID).append(this.choiceArray[i]);
		}

		//display question
		$('#outputInfo3').append(riddleBank[this.questionID].Q + "\n");

		//enable all reply buttons
		$('#reply1')[0].disabled = false;
		$('#reply2')[0].disabled = false;
		$('#reply3')[0].disabled = false;
		$('#reply4')[0].disabled = false;
	}

	action() //use action talk 
	{
		//but A B C D ascii art
		for(var i = 0; i < 4; i++)
		{
			var textareaID = '#replyArt' + (i+1);
			$(textareaID).text("");
			$(textareaID).append(getLetterArt(i));
		}

		this.getQuestion();

		//disable exit button
		$('.riddleWindow .inner #exit')[0].disabled = true;
	}

	getResult(isRight) //0 == wrong, 1 == right
	{
		if(isRight)
		{
			if(this.playOnce == 0)
			{
				$('#outputInfo3').append("Good, good. You manage to answer my riddle right on the first try. Here is your reward!\n");
				$('#outputInfo3').append("A chest appears in front of the statue large foot. You open it.\n");
				$('#outputInfo3').append(this.award.action());

				if(checkSuccessRate(30)) //there a 30% on it revealing the castle
					completeMap = 1;
			}
			else
			{
				$('#outputInfo3').append("Hmm, you finally pass after many tries... I will let you pass just as promised.\n");
			}
			currentRoom.customRoomType(0);
			currentRoom.roomContent.hasLight = 1;
			updateNavigation();
		}
		else
		{
			$('#outputInfo3').append("WRONG!!! Now suffer your own stupidity!\n");
			HP -= Math.floor(25*maxHP/100); //lose 25% HP

			if(HP <= 0)
			{
				endGame(0);
				return;
			}

			if(checkSuccessRate(30)) //there a 30% on it changes the maze
			{
				reshuffleMaze();
				drawMap();
			}
			updateHeroInfo();
		}

		this.playOnce = 1;
	}

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

function chooseAnswer(id)
{
	if(currentRoom.roomType() != 4) //not riddle
		return;

	var i = parseInt(id) - 1;
	var aRiddle = currentRoom.roomContent;

	if(aRiddle.choiceArray[i] == aRiddle.answer)
	{
		//RIGHT
		aRiddle.getResult(1);
	}
	else
	{
		//WRONG
		aRiddle.getResult(0);
	}

	//disable all reply buttons
	$('#reply1')[0].disabled = true;
	$('#reply2')[0].disabled = true;
	$('#reply3')[0].disabled = true;
	$('#reply4')[0].disabled = true;

	//enable exit button
	$('.riddleWindow .inner #exit')[0].disabled = false;
}

function exitRiddle()
{
	$('#outputInfo').append($('#outputInfo3').text());
	if(currentRoom.roomType() != 4)
		$('#outputInfo3').text("");
	$($('.riddleWindow')[0]).css('visibility', 'hidden');
}

function getLetterArt(i)
{
	var aString = "";
	var theChar = String.fromCharCode(65 + i)
	switch(theChar)
	{
		default: break;
		case 'A':
			aString += "     _\n";
			aString += "    / \\\n";
			aString += "   / _ \\\n";
			aString += "  / /_\\ \\ \n";
			aString += " / _____ \\ \n";
			aString += "/_/     \\_\\ ○\n\n";
			break;
		case 'B':
			aString += " _____\n";
			aString += "|  __ \\\n";
			aString += "| |__) |\n";
			aString += "|  ___ < \n";
			aString += "| |___) |\n";
			aString += "|______/  ○\n\n";
			break;
		case 'C':
			aString += "  ______ \n";
			aString += " / _____|\n";
			aString += "| |     \n";
			aString += "| |  \n";
			aString += "| |_____\n";
			aString += " \\______| ○\n\n";
			break;
		case 'D':
			aString += " ______\n";
			aString += "|  ___ \\ \n";
			aString += "| |   | |\n";
			aString += "| |   | |\n";
			aString += "| |___| |\n";
			aString += "|______/  ○\n\n";
        	break;
	}
	return aString;
}

var riddleBank =
[
	{
		id: 0,
		Q: "Who is the creator, the Mysterious Enigma, of THIS universe?",
		A: "PhthaloBlue.",
		A1: "God.",
		A2: "Multiple gods and goddesses.",
		A3: "None, universe came to exist by itself."
	},
	{
		id: 1,
		Q: "What extra use can one make from 'bomb' item beside killing monster?",
		A: "Reveal hidden trap.",
		A1: "Light up dark room.",
		A2: "Destroy blocking obstacle, like yourself.",
		A3: "Blind monster from intense exploding light."
	},
	{
		id: 2,
		Q: "How many ways can one harm a 'monster'?",
		A: "3 ways.",
		A1: "1 way.",
		A2: "2 ways.",
		A3: "4 ways."
	},
	{
		id: 3,
		Q: "What item allows one to escape a 'monster' grasp?",
		A: "Invisible cloak to turn invisible and sneak away.",
		A1: "Animated wings to fly away from monster's reach.",
		A2: "Spring-loaded boots to jump over monster's head.",
		A3: "A powerful sword to slash down monster before it can react."
	},
	{
		id: 4,
		Q: "Magic spells are powerful. How can one hope to learn them?",
		A: "Dark wizards who dwelt in this place will teach them for a good price.",
		A1: "Buy scrolls teaching them from magical wagons and merchants in this place.",
		A2: "Win magic books from gambling with a dark spirit.",
		A3: "Learn from engraved magical tablets in monster's possession."
	},
	{
		id: 5,
		Q: "What walks on 4 legs in the morning, 2 at noon, but 3 in the evening?",
		A: "A person?",
		A1: "The castle boss?",
		A2: "A shapeshifting monster.",
		A3: "A dust spirit who affected by sunlight."
	},
	{
		id: 6,
		Q: "What goes up but never comes down?",
		A: "Age.",
		A1: "Bird.",
		A2: "My arrow!",
		A3: "Poor souls who affected by deadly floating magic."
	},
	{
		id: 7,
		Q: "What can run but never walk; has a mouth but never talks; has a head but never weeps; has a bed but never sleeps?",
		A: "A river.",
		A1: "An insomnia beast.",
		A2: "A town?",
		A3: "This castle?"
	},
	{
		id: 8,
		Q: "What belongs to you but others use it more than you do?",
		A: "My name.",
		A1: "My genital!",
		A2: "My gold.",
		A3: "My life."
	},
	{
		id: 9,
		Q: "I am more powerful than God, more evil than the devils. The poors have me. The richs need me. And if you eat me, you will die. What the heck am I?",
		A: "Nothing.",
		A1: "Poison.",
		A2: "Gold.",
		A3: "Some unreal things."
	}
]