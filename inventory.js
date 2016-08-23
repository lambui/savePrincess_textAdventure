var backpack = 
[
	{
		passive: 1,
		description: "a small dagger that fits the hand. Easy to conceal",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
		showName: "heat goggles",
		name: "heatGoggles",
		count: 0
	},
	{
		passive: 0,
		description: "",
		showName: "flight magic",
		name: "flightSpell",
		count: 0
	},
	{
		passive: 0,
		description: "",
		showName: "water magic",
		name: "waterSpell",
		count: 0
	},
	{
		passive: 0,
		description: "",
		showName: "fire magic",
		name: "fireSpell",
		count: 0
	},
	{
		passive: 0,
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
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
		description: "",
		showName: "mastertrinket of trickery",
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
}