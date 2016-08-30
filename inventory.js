var backpack = 
[
	{
		id: 0,
		passive: 1,
		description: "a small dagger that fits the hand. Easy to conceal.",
		showName: "steel dagger",
		name: "sword1",
		itemType: 'weapon',
		price: 120,
		sellable: 1,
		count: 0,
		gain: 10,
		execute()
		{
			dmg = d_dmg + this.gain;
		}
	},
	{
		id: 1,
		passive: 1,
		description: "a basic sword. Every adventurer's basic equipment.",
		showName: "iron sword",
		name: "sword2",
		itemType: 'weapon',
		price: 200,
		sellable: 1,
		count: 0,
		gain: 15,
		execute()
		{
			dmg = d_dmg + this.gain;
		}
	},
	{
		id: 2,
		passive: 1,
		description: "a sword that is made with the finest steel. Cut through flesh like butter.",
		showName: "steel sword",
		name: "sword3",
		itemType: 'weapon',
		price: 320,
		sellable: 1,
		count: 0,
		gain: 22,
		execute()
		{
			dmg = d_dmg + this.gain;
		}
	},
	{
		id: 3,
		passive: 1,
		description: "a huge steel sword. Only the strongest of warriors can wield it with ease.",
		showName: "steel broad sword",
		name: "sword4",
		itemType: 'weapon',
		price: 400,
		sellable: 1,
		count: 0,
		gain: 31,
		execute()
		{
			dmg = d_dmg + this.gain;
		}
	},
	{
		id: 4,
		passive: 1,
		description: "a noble sword that is reinforced with diamond. It cleaves through waves and waves of demons without becoming dull.",
		showName: "diamond-edge sword",
		name: "sword5",
		itemType: 'weapon',
		price: 550,
		sellable: 1,
		count: 0,
		gain: 42,
		execute()
		{
			dmg = d_dmg + this.gain;
		}
	},
	{
		id: 5,
		passive: 1,
		description: "the legendary rapier. So divine that it is fabled to come from the Gods itself.",
		showName: "legendary sword",
		name: "legendSword",
		itemType: 'weapon',
		price: 1000,
		sellable: 1,
		count: 0,
		gain: 60,
		execute()
		{
			dmg = d_dmg + this.gain;
		}
	},
	{
		id: 6,
		passive: 1,
		description: "a tunic made from leather. It's basic wear of people from the plain.",
		showName: "leather tunic",
		name: "armor1",
		itemType: 'armor',
		price: 120,
		sellable: 1,
		count: 0,
		gain: 10,
		execute()
		{
			maxHP = d_maxHP + this.gain;
		}
	},
	{
		id: 7,
		passive: 1,
		description: "chain mail made from iron links. This item saves soldier's life countless times.",
		showName: "iron chain mail",
		name: "armor2",
		itemType: 'armor',
		price: 250,
		sellable: 1,
		count: 0,
		gain: 20,
		execute()
		{
			maxHP = d_maxHP + this.gain;
		}
	},
	{
		id: 8,
		passive: 1,
		description: "chain mail made from steel links. Steel is stronger than iron; this item is the definition of innovation.",
		showName: "steel chain mail",
		name: "armor3",
		itemType: 'armor',
		price: 400,
		sellable: 1,
		count: 0,
		gain: 35,
		execute()
		{
			maxHP = d_maxHP + this.gain;
		}
	},
	{
		id: 9,
		passive: 1,
		description: "plate mail made from sheet of refined steel. It stops even the heaviest blows.",
		showName: "plate mail",
		name: "armor4",
		itemType: 'armor',
		price: 580,
		sellable: 1,
		count: 0,
		gain: 50,
		execute()
		{
			maxHP = d_maxHP + this.gain;
		}
	},
	{
		id: 10,
		passive: 1,
		description: "plate mail made from scales of dragon. It withstands assault as well as it can withstand fire.",
		showName: "dragon-scale plate mail",
		name: "armor5",
		itemType: 'armor',
		price: 730,
		sellable: 1,
		count: 0,
		gain: 65,
		execute()
		{
			maxHP = d_maxHP + this.gain;
		}
	},
	{
		id: 11,
		passive: 1,
		description: "the legendary plate mail. It's crimson in color and is rumored to have been used by heroes from faraway land.",
		showName: "legendary plate mail",
		name: "legendArmor",
		itemType: 'armor',
		price: 1000,
		sellable: 1,
		count: 0,
		gain: 90,
		execute()
		{
			maxHP = d_maxHP + this.gain;
		}
	},
	{
		id: 12,
		passive: 0,
		description: "a small bottle of pain killer.",
		showName: "small potion",
		name: "potion1",
		itemType: 'consumable',
		price: 30,
		sellable: 1,
		count: 0,
		heal: 10,
		execute()
		{
			HP += this.heal;
			if(HP > maxHP)
				HP = maxHP;
			this.count -= 1;
		}
	},
	{
		id: 13,
		passive: 0,
		description: "a large bottle of some strange green liquid. Made from secluded wizards lived in mountain top. It glows.",
		showName: "large potion",
		name: "potion2",
		itemType: 'consumable',
		price: 50,
		sellable: 1,
		count: 0,
		heal: 25,
		execute()
		{
			HP += this.heal;
			if(HP > maxHP)
				HP = maxHP;
			this.count -= 1;
		}
	},
	{
		id: 14,
		passive: 0,
		description: "steel-headed arrow.",
		showName: "arrow",
		name: "arrow",
		itemType: 'consumable',
		price: 10,
		sellable: 1,
		count: 0,
		execute()
		{
			this.count -= 1;
		}
	},
	{
		id: 15,
		passive: 0,
		description: "a well designed torch: stick, drag, and oil.",
		showName: "torch",
		name: "torch",
		itemType: 'consumable',
		price: 30,
		sellable: 1,
		count: 0,
		execute()
		{
			if(currentRoom == undefined)
				return;

			if(currentRoom.roomType() == 0 || currentRoom.roomType() == 2) //if not empty or secret 
			{
				currentRoom.roomContent.hasLight = 1;
			}

			this.count -= 1;
		}
	},
	{
		id: 16,
		passive: 0,
		description: "an explosive device. Made from tinkers and mechanics of the kingdoms.",
		showName: "bomb",
		name: "bomb",
		itemType: 'consumable',
		price: 50,
		sellable: 1,
		count: 0,
		execute()
		{
			this.count -= 1;
		}
	},
	{
		id: 17,
		passive: 0,
		description: "an explosive stick that fires tethered hook. A mechanical effort to imitate flight magic. Is useful to travel through uncrossable path.",
		showName: "grappling hook",
		name: "grapplingHook",
		itemType: 'consumable',
		price: 120,
		sellable: 1,
		count: 0,
		execute()
		{
			if(isFly != 1 && this.count > 0)
			{
				isFly = 1;
				this.count -= 1;
			}
		}
	},
	{
		id: 18,
		passive: 0,
		description: "a cloak that is made to imitate dragon skins and scales. Resist against fire very well.",
		showName: "fire-resistant cloak",
		name: "fireResistantCloak",
		itemType: 'consumable',
		price: 120,
		sellable: 1,
		count: 0,
		execute()
		{
			//more code
			if(isFireResis != 1 && this.count > 0)
			{
				isFireResis = 1;
				this.count -= 1;
			}
		}
	},
	{
		id: 19,
		passive: 0,
		description: "a poorman's shield. Good for one-time use.",
		showName: "shield",
		name: "shield",
		itemType: 'consumable',
		price: 120,
		sellable: 1,
		count: 0,
		inUse: 0,
		execute()
		{
			if(isBlock != 1 && this.count > 0)
			{
				isBlock = 1;
				this.count -= 1;
			}
		}
	},
	{
		id: 20,
		passive: 0,
		description: "spring-attached boots. Jump higher, run faster.",
		showName: "spring-loaded boots",
		name: "springLoadedBoots",
		itemType: 'consumable',
		price: 120,
		sellable: 1,
		count: 0,
		execute()
		{
			//more code
			if(isJump != 1 && this.count > 0)
			{
				isJump = 1;
				this.count -= 1;
			}
		}
	},
	{
		id: 21,
		passive: 0,
		description: "goggles that allows wearer to see the unseeable. Futuristic technology this one.",
		showName: "heat goggles",
		name: "heatGoggles",
		itemType: 'addon',
		price: 500,
		sellable: 1,
		count: 0
	},
	{
		id: 22,
		passive: 0,
		description: "why do you walk when you can just fly?",
		showName: "flight magic",
		name: "flightSpell",
		itemType: 'ability',
		price: 800,
		sellable: 0,
		count: 0,
		execute()
		{
			isFly = 1;
		}
	},
	{
		id: 23,
		passive: 0,
		description: "create water out of thin air. Good for travelling through desert or against fire in general.",
		showName: "water magic",
		name: "waterSpell",
		itemType: 'ability',
		price: 800,
		sellable: 0,
		count: 0,
		execute()
		{
			isFireResis = 1;
		}
	},
	{
		id: 24,
		passive: 0,
		description: "create a small flame out of nothing. Can be used to illuminate darkness, or make camp fire.",
		showName: "fire magic",
		name: "fireSpell",
		itemType: 'ability',
		price: 800,
		sellable: 0,
		count: 0,
		execute()
		{
			if(currentRoom == undefined)
				return;

			if(currentRoom.roomType() == 0 || currentRoom.roomType() == 2) //if not empty or secret 
			{
				currentRoom.roomContent.hasLight = 1;
			}

			currentRoom.roomContent.hasLight = 1;
		}
	},
	{
		id: 25,
		passive: 0,
		description: "cloak that hides wearer from eyesight but has terrible quality. It can be torn from first use.",
		showName: "invisible cloak",
		name: "invisibleCloak",
		itemType: 'consumable',
		price: 120,
		sellable: 1,
		count: 0,
		execute()
		{
			if(isInvi != 1 && this.count > 0)
			{
				isInvi = 1;
				this.count -= 1;
			}
		}
	},
	{
		id: 26,
		passive: 0,
		description: "enchanted pair of giant bird wings that allows wearer to fly. Many giant birds are killed to mass product these.",
		showName: "animated wings",
		name: "animatedWings",
		itemType: 'consumable',
		price: 120,
		sellable: 1,
		count: 0,
		execute()
		{
			if(isFly != 1 && this.count > 0)
			{
				isFly = 1;
				this.count -= 1;
			}
		}
	},
	{
		id: 27,
		passive: 1,
		description: "It grants wearer extreme speed and flexibility.",
		showName: "talisman of evasion",
		name: "evasionTrinket",
		itemType: 'addon',
		price: 300,
		sellable: 1,
		count: 0,
		gain: 15,
		execute()
		{
			evasion += this.gain;
		},
		remove()
		{
			evasion -= this.gain;
		}
	},
	{
		id: 28,
		passive: 1,
		description: "wielders of this item feels the surge of power through their body.",
		showName: "power ring of assault",
		name: "damageTrinket",
		itemType: 'addon',
		price: 500,
		sellable: 1,
		count: 0,
		gain: 25,
		baseDmg: 0,
		execute()
		{
			this.baseDmg = dmg;
			dmg += Math.floor(dmg*this.gain/100);
		},
		remove()
		{
			dmg = this.baseDmg;
		}
	},
	{
		id: 29,
		passive: 0,
		description: "no deception can pass through the gem-eye of this powerful necklace. Reveal even the tiniest of tricks.",
		showName: "master gemstone of truesight",
		name: "trapRevealingTrinket",
		itemType: 'addon',
		price: 800,
		sellable: 1,
		count: 0
	}
]

function resetStat()
{
	maxHP = d_maxHP;
	evasion = d_evasion;
	dmg = d_dmg;
}

function displayItemInfo(id)
{
	var i = parseInt(id);
	var aString = "---open-backpack---------------\n";
	switch(backpack[i].itemType)
	{
		case 'ability':
			aString += backpack[i].showName + " (learned)\n";
			aString += "item type: " + backpack[i].itemType + " - can be learn once, have infinite use.\n";
			break;
		case 'weapon':
			aString += backpack[i].showName + " (x" + backpack[i].count + ")\n";
			aString += "item type: " + backpack[i].itemType + " - auto equip the best one in inventory, gain increase damage.\n";
			break;
		case 'armor':
			aString += backpack[i].showName + " (x" + backpack[i].count + ")\n";
			aString += "item type: " + backpack[i].itemType + " - auto equip the best one in inventory, gain increase HP.\n";
			break;
		case 'consumable':
			aString += backpack[i].showName + " (x" + backpack[i].count + ")\n";
			aString += "item type: " + backpack[i].itemType + " - each use consumes one, its effect lasts for one room.\n";
			break;
		case 'addon':
			aString += backpack[i].showName + " (x" + backpack[i].count + ")\n";
			aString += "item type: " + backpack[i].itemType + " - auto equip once, do not stack, provide different perks once equipped.\n";
			break;
		default: break;
	}
	aString += "price: " + backpack[i].price + "g.\n";
	aString += backpack[i].description + "\n";
	aString += "---close-backpack--------------\n";
	$('#outputInfo').append(aString);
}


//maxHP, HP, dmg, evasion from player.js
function calculateStat()
{
	var currentHP = HP;
	resetStat();
	for(var i = 0; i < backpack.length; i++)
	{
		if(backpack[i].passive == 1 && backpack[i].count > 0) //if item is stat-raising passive item
		{
			backpack[i].execute();
		}
	}

	if(HP < currentHP)
		HP = currentHP;
	if(HP > maxHP)
		HP = maxHP;

	updateHeroInfo();
}