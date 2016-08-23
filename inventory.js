var backpack = 
[
	{
		passive: 1,
		description: "a small dagger that fits the hand. Easy to conceal.",
		showName: "steel dagger",
		name: "sword1",
		count: 0,
		gain: 5,
		execute()
		{
			dmg += this.gain;
		},
		remove()
		{
			dmg -= this.gain;
		}
	},
	{
		passive: 1,
		description: "a basic sword. Every adventurer's basic equipment.",
		showName: "iron sword",
		name: "sword2",
		count: 0,
		gain: 5,
		execute()
		{
			dmg += this.gain;
		},
		remove()
		{
			dmg -= this.gain;
		}
	},
	{
		passive: 1,
		description: "a sword that is made with the finest steel. Cut through flesh like butter.",
		showName: "steel sword",
		name: "sword3",
		count: 0,
		gain: 5,
		execute()
		{
			dmg += this.gain;
		},
		remove()
		{
			dmg -= this.gain;
		}
	},
	{
		passive: 1,
		description: "a huge steel sword. Only the strongest of warriors can wield it with ease.",
		showName: "steel broad sword",
		name: "sword4",
		count: 0,
		gain: 5,
		execute()
		{
			dmg += this.gain;
		},
		remove()
		{
			dmg -= this.gain;
		}
	},
	{
		passive: 1,
		description: "a noble sword that is reinforced with diamond. It cleaves through waves and waves of demons without becoming dull.",
		showName: "diamond-edge sword",
		name: "sword5",
		count: 0,
		gain: 5,
		execute()
		{
			dmg += this.gain;
		},
		remove()
		{
			dmg -= this.gain;
		}
	},
	{
		passive: 1,
		description: "the legendary rapier. So divine that it is fabled to come from the Gods itself.",
		showName: "legendary sword",
		name: "legendSword",
		count: 0,
		gain: 20,
		execute()
		{
			dmg += this.gain;
		},
		remove()
		{
			dmg -= this.gain;
		}
	},
	{
		passive: 1,
		description: "a tunic made from leather. It's basic wear of people from the plain.",
		showName: "leather tunic",
		name: "armor1",
		count: 0,
		gain: 10,
		execute()
		{
			maxHP += this.gain;
			HP += this.gain;
		},
		remove()
		{
			maxHP -= this.gain;
			if(HP < this.gain)
				HP = 1;
			else
				HP -= this.gain;
		}
	},
	{
		passive: 1,
		description: "chain mail made from iron links. This item saves soldier's life countless times.",
		showName: "iron chain mail",
		name: "armor2",
		count: 0,
		gain: 10,
		execute()
		{
			maxHP += this.gain;
			HP += this.gain;
		},
		remove()
		{
			maxHP -= this.gain;
			if(HP < this.gain)
				HP = 1;
			else
				HP -= this.gain;
		}
	},
	{
		passive: 1,
		description: "chain mail made from steel links. Steel is stronger than iron; this item is the definition of innovation.",
		showName: "steel chain mail",
		name: "armor3",
		count: 0,
		gain: 10,
		execute()
		{
			maxHP += this.gain;
			HP += this.gain;
		},
		remove()
		{
			maxHP -= this.gain;
			if(HP < this.gain)
				HP = 1;
			else
				HP -= this.gain;
		}
	},
	{
		passive: 1,
		description: "plate mail made from sheet of refined steel. It stops even the heaviest blows.",
		showName: "plate mail",
		name: "armor4",
		count: 0,
		gain: 10,
		execute()
		{
			maxHP += this.gain;
			HP += this.gain;
		},
		remove()
		{
			maxHP -= this.gain;
			if(HP < this.gain)
				HP = 1;
			else
				HP -= this.gain;
		}
	},
	{
		passive: 1,
		description: "plate mail made from scales of dragon. It withstands assault as well as it can withstand fire.",
		showName: "dragon-scale plate mail",
		name: "armor5",
		count: 0,
		gain: 10,
		execute()
		{
			maxHP += this.gain;
			HP += this.gain;
		},
		remove()
		{
			maxHP -= this.gain;
			if(HP < this.gain)
				HP = 1;
			else
				HP -= this.gain;
		}
	},
	{
		passive: 1,
		description: "the legendary plate mail. It's crimson in color and is rumored to have been used by heroes from faraway land.",
		showName: "legendary plate mail",
		name: "legendArmor",
		count: 0,
		gain: 30,
		execute()
		{
			maxHP += this.gain;
			HP += this.gain;
		},
		remove()
		{
			maxHP -= this.gain;
			if(HP < this.gain)
				HP = 1;
			else
				HP -= this.gain;
		}
	},
	{
		passive: 0,
		description: "a small bottle of pain killer.",
		showName: "small potion",
		name: "potion1",
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
		passive: 0,
		description: "a large bottle of some strange green liquid. Made from secluded wizards lived in mountain top. It glows.",
		showName: "large potion",
		name: "potion2",
		count: 0,
		heal: 20,
		execute()
		{
			HP += this.heal;
			if(HP > maxHP)
				HP = maxHP;
			this.count -= 1;
		}
	},
	{
		passive: 0,
		description: "steel-headed arrow.",
		showName: "arrow",
		name: "arrow",
		count: 0,
		execute()
		{
			//attack w arrow
			this.count -= 1;
		}
	},
	{
		passive: 0,
		description: "a well designed torch: stick, drag, and oil.",
		showName: "torch",
		name: "torch",
		count: 0,
		execute()
		{
			//light up room
			this.count -= 1;
		}
	},
	{
		passive: 0,
		description: "an explosive device. Made from tinkers and mechanics of the kingdoms.",
		showName: "bomb",
		name: "bomb",
		count: 0,
		execute()
		{
			//destroy rock
			//dmg enemy
			this.count -= 1;
		}
	},
	{
		passive: 0,
		description: "an explosive stick that fires tethered hook. Is useful to travel through uncrossable path.",
		showName: "grappling hook",
		name: "grapplingHook",
		count: 0,
		execute()
		{
			//more code
			this.count -= 1;
		}
	},
	{
		passive: 0,
		description: "a cloak that is made to imitate dragon skins and scales. Resist against fire very well.",
		showName: "fire-resistant cloak",
		name: "fireResistantCloak",
		count: 0,
		execute()
		{
			//more code
			this.count -= 1;
		}
	},
	{
		passive: 0,
		description: "a poorman's shield. Good for one-time use.",
		showName: "shield",
		name: "shield",
		count: 0,
		inUse: 0,
		gain: 5,
		execute()
		{
			maxHP += this.gain;
			HP += this.gain;
			this.inUse = 1;
		},
		remove()
		{
			if(this.inUse == 0)
				return;

			maxHp -= this.gain;
			if(HP < this.gain)
				HP = 1;
			else
				HP -= this.gain;
			this.inUse = 0;
			this.count -= 1;
		}
	},
	{
		passive: 0,
		description: "spring-attached boots. Jump higher, run faster.",
		showName: "spring-loaded boots",
		name: "springLoadedBoots",
		count: 0,
		execute()
		{
			//more code
			this.count -= 1;
		}
	},
	{
		passive: 0,
		description: "goggles that allows wearer to see the unseeable. Futuristic technology this one.",
		showName: "heat goggles",
		name: "heatGoggles",
		count: 0
	},
	{
		passive: 0,
		description: "why do you walk when you can just fly?",
		showName: "flight magic",
		name: "flightSpell",
		count: 0
	},
	{
		passive: 0,
		description: "create water out of thin air. Good for travelling through desert or against fire in general.",
		showName: "water magic",
		name: "waterSpell",
		count: 0
	},
	{
		passive: 0,
		description: "create a small flame out of nothing. Can be used to illuminate darkness, or make camp fire.",
		showName: "fire magic",
		name: "fireSpell",
		count: 0
	},
	{
		passive: 0,
		description: "cloak that hides wearer from eyesight but has terrible quality. It can be torn from first use.",
		showName: "invisible cloak",
		name: "invisibleCloak",
		count: 0,
		execute()
		{
			//more code
			this.count -= 1;
		}
	},
	{
		passive: 0,
		description: "enchanted pair of giant bird wings that allows wearer to fly. Many giant birds are killed to mass product these.",
		showName: "animated wings",
		name: "animatedWings",
		count: 0,
		execute()
		{
			//more code
			this.count -= 1;
		}
	},
	{
		passive: 1,
		description: "also called talisman of evasion. It allows wearer to be more agile and flexible.",
		showName: "trinket of evasion",
		name: "evasionTrinket",
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
		passive: 1,
		description: "wielders of this item feels the surge of power through their body.",
		showName: "trinket of assault",
		name: "damageTrinket",
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
		passive: 0,
		description: "no deception can pass through the gem-eye of this powerful necklace. Reveal even the tiniest of tricks.",
		showName: "master trinket of trickery",
		name: "trapRevealingTrinket",
		count: 0
	}
]

function resetStat()
{
	maxHP = d_maxHP;
	evasion = d_evasion;
	dmg = d_dmg;
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
}