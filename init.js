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
	//init hero info
	var inputName = prompt("Please enter your hero name: ", "your hero's name.");
	if(inputName != null)
	{
		init(inputName);
	}
	updateHeroInfo();

	//init maze info
	posX = posY = 0;
	currentRoom = map[posY][posX];
	console.log(posX + " " + posY);
	drawMap();
	showDescription();
	navigationAction(3);
	calculateStat();
	action();

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
});



