# 100Rooms

###About the game:
The game is called 100 rooms.<br>
It is a text-based, turn-based adventure game where you are a hero on your quest to save princess from a evil Demon.<br>
Play this game @ https://lambui.github.io/<br>

###Overview:
####**Story:**
Princess Madeleine has been captured by the Demon. You are an adventurer who is sent to rescue the princess from the Demon's grasp.
Be ready to embark on the adventure through a hundred-room castle, filled with traps, monsters, challenges, secret, and surprises to save the lovely princess Madeleine.<br>
####**Difficulty:**
There are 2 difficulty level for player to choose from: wizard(easy) and knight(hard)<br>
**-Wizard:** has starting HP, gold, damage and all the magic spells in game.<br>
**-Knight:** has starting HP, gold, damage.<br>
####**Room Varieties:**
Check the dev sections only if you want spoiler.
####**Game End:**
Game is over when either:<br>
1. You are dead or<br>
2. You defeat the boss and rescue princess Madeleine.<br>
##--------------- STOP HERE IF YOU DO NOT WANT SPOILER ---------------
###Dev section:
####**Room Varieties:**
There are 9 types of main rooms:
- **empty room**
- **secret room**: same with empty room but player can use items to uncover drops
- **shop room**: 2 types of shop room:
  - merchant shop: sell weapon, armor, and mechanial items
  - wizard shop: teach magical spells and sell magical items
- **chest room**: give items and gold, has a chance of being mimics and becomes **monster room**
- **riddle room**: 
  - cant move unless you answer the riddle correctly.
  - Get reward if answer correctly the first time. Punishment if wrong.
- **gamble room**: 
  - cant move forward but can return back to previous room.
  - have more than 100g to play.
  - x2 if win in one-of-out-two
  - x3 if win in one-of-out-three
  - have a chance of losing HP if lose
- **monster room**: can be awake or sleeping
  - if awake then player cant move unless you defeat the monster.
  - if sleeping then player can move pass it.
  - hard to melee hit if flying
- **trap room**: can be visible or hidden
  - if visible then player cant move forward but can return back to previous room.
  - if hidden then it looks like empty room but will harm you if try to pass without counter
  - have to use correct counter to cross unharm
- **boss room**:
  - has a chance to use fly in a turn, increase melee evasion chance
  - has a chance to use invi in a turn, dodge melee, range attack
  - has a chance to use slam, unevadable attack
  - if kill, player will discover princess in room type 10 and win the game

####**Player actions:**
- **Movement**: 3 types of movement actions and 4 directions to go
  - Forward: move to other room (not including previous room)
  - Retreat: move back to previous room
  - Rest: stay in the room and regen around 25% HP, but will risk a chance of **maze shuffle**.
  - **Player movement depends on the current room.** For ex: visible trap room allows retreat but not forward and monster room forbids them altogether.
- **Actions**: player action depends on current room and items player currently have
  - Charge! (melee attck): appear in monster room and boss room
  - Talk: use to communicate with NPC in room.
  - Use *item: use item player has in inventory
  - Rescue princess: appear when player find princess. Trigger end game.
  
####**Mechanics:**
- **RNJESUS.**
- **Hero Info**: on the left
- **Minimap**: on the right, with legend
- **Maze shuffle**: 
  - while rest or fail riddle, this event will sometimes trigger and reshuffle (restart and shuffle) all the rooms (excluding player's current room).
  - All the visited room will return to be unvisited (mark as ? in minimap)
  - May cause some lag and browser becomes unrespondsive for a little bit. Just wait it out.

####**That it!**

##---------------HAPPY RESCUING PRINCESS---------------







