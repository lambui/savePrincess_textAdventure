class Shop
{
	//2 shop type: marchant == 0 and wizard == 1
	constructor(shopType)
	{
		this.shopType = shopType;

		//set up shop wares
		this.wareArray = [];
		if(this.shopType == 0)
		{
			//add all the sword (non legend)
			for(var i = 0; i < 5; i++)
				this.wareArray.push(i);

			//add all the armor (non legend)
			for(var i = 6; i < 11; i++)
				this.wareArray.push(i);

			//add necessary items
			for(var i = 12; i < 17; i++)
				this.wareArray.push(i);

			//add special items 
			for(var i = 17; i < 22; i++)
			{
				if(Math.random() < 0.5) //50% chance that the shop carries it
					this.wareArray.push(i);
			}
		}
		else
		{
			//add all the spell and basic magical items
			for(var i = 22; i < 27; i++)
				this.wareArray.push(i);

			//add special items
			for(var i = 27; i < 30; i++)
			{
				if(Math.random() < 0.5) //50% chance that the shop carries it
					this.wareArray.push(i);
			}
		}
	}

	checkPlayer(){}

	action()
	{
		$('.shop .inner #content').html(''); //clear content's inside
		for(var i = 0; i < this.wareArray.length; i++)
		{
			//create div that display item name
			var allAppend = "<div class='itemWrapper'>";
			var appendName = "<div class='itemName'>";

			if(backpack[this.wareArray[i]].itemType == 'ability') //special case for spell
			{
				if(backpack[this.wareArray[i]].count > 0)
					appendName += backpack[this.wareArray[i]].showName + " (learned)";
				else
					appendName += backpack[this.wareArray[i]].showName + " ";
			}
			else
				appendName += backpack[this.wareArray[i]].showName + " (x" + backpack[this.wareArray[i]].count + ")";

			appendName += "</div>";

			//create sell buttons
			var appendSell = "";
			if(backpack[this.wareArray[i]].itemType != 'ability') //special case for spell, cant sell spell
			{
				appendSell += "<button class='sellButton' ";
				appendSell += "onClick='sellItem(" + this.wareArray[i] + ")'>sell</button>";
			}

			//create buy buttons
			var appendBuy = "";
			appendBuy += "<button class='buyButton' ";
			if(backpack[this.wareArray[i]].itemType == 'ability')
			{
				if(backpack[this.wareArray[i]].count > 0) //special case for spell, cant buy already learned spell
					appendBuy += "disabled ";
				appendBuy += "onClick='buyItem(" + this.wareArray[i] + ")'>learn</button>";
			}
			else
				appendBuy += "onClick='buyItem(" + this.wareArray[i] + ")'>buy</button>";

			//itemPrice
			var appendPrice = "<div class='itemPrice'>";
			appendPrice += backpack[this.wareArray[i]].price + "g.";
			appendPrice += "</div>";

			//add wrapper
			allAppend += (appendName + appendSell + appendBuy + appendPrice + "</div>");

			$('.shop .inner #content').append(allAppend);
		}

		$('.shop .inner #content').append("<div id='sellingItem'>Backpack:</div>");
		for(var i = 0; i < backpack.length; i++)
		{
			if(backpack[i].itemType == 'ability' || backpack[i].count <= 0)
				continue;

			allAppend = "<div class='itemWrapper'>";

			//create div that display item name
			var appendName = "<div class='itemName'>";
			appendName += backpack[i].showName + " (x" + backpack[i].count + ")";
			appendName += "</div>";

			//create sell buttons
			var appendSell = "";
			appendSell += "<button class='sellButton' ";
			appendSell += "onClick='sellItem(" + i + ")'>sell</button>";

			allAppend += (appendName + appendSell + "</div>");

			$('.shop .inner #content').append(allAppend);
		}
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
		aString += "\n";
		return aString;
	}
}

function exitShop()
{
	$($('.shop')[0]).css('visibility', 'hidden');
	$('#outputInfo').append($("#outputInfoShop").text());
	$("#outputInfoShop").text("");
}

function sellItem(id) //id == itemID, also itemIndex
{
	if(backpack[id].count <= 0)
		return;
	if(backpack[id].sellable == 0)
		return;

	backpack[id].count -= 1;
	var sellPrice = Math.floor(backpack[id].price*(3/4));
	gold += sellPrice;

	$("#outputInfoShop").append("You sell " + backpack[id].showName + " for " + sellPrice + " gold(s).\n");
	currentRoom.roomContent.action(); //refresh the shop
	calculateStat(); //function can be found in inventory.js
}

function buyItem(id)
{
	if(gold < backpack[id].price)
		return;
	if(backpack[id].sellable == 0 && backpack[id].count > 0) //if its not sellable and you are already owned it, it can not be bought again
		return;

	backpack[id].count += 1;
	gold -= backpack[id].price;

	$("#outputInfoShop").append("You buy " + backpack[id].showName + " for " + backpack[id].price + " gold(s).\n");
	currentRoom.roomContent.action(); //refresh the shop
	calculateStat(); //function can be found in inventory.js
}
