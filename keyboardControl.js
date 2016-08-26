$(document).keydown(function(e) {
    switch(e.which) 
    {
    	case 65: //a
        case 37: // left
        	if($('#left')[0].disabled == false)
        		$('#left').click();
        	break;

        case 87: //w
        case 38: // up
        	if($('#up')[0].disabled == false)
        		$('#up').click();	
        	break;

        case 68: //d
        case 39: // right
        	if($('#right')[0].disabled == false)
        		$('#right').click();
       		break;

       	case 83: //s
        case 40: // down
      		if($('#down')[0].disabled == false)
        		$('#down').click();
        	break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});