/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom(min, max) 
{
  return Math.random() * (max - min) + min;
}

function checkSuccessRate(rate)
{
	if(getRandomInt(0,99) < rate)
		return true;
	else
		return false;
}

//fisher-yates shuffle
function shuffle(array) 
{
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
