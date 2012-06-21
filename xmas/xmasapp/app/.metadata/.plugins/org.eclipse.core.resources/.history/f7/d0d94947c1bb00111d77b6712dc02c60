



// Week Four Edit 
    var giftID= {};   //holds the id and rev#
    
    var setObject = function(object)
    
    var splitURL= function (){
    	var urlData = document.URL;
    	var urlParts = urlData.split('?');
    	var urlVals = urlParts[1].split('&');
    	var idVals = {};
    	for (var i in urlVals){
    		var keyValue = urlVals[i].split('=');
    		var key = decodeURIComponent(keyValue[1]);
    		idVals[key] = value;			
    	}
    	console.log("success on split");
    	console.log(idVals[key]);
    	return(idVals[key]);  
    };
    
    var giftToEdit = splitURL();
    
   // Load json

    var loadChild = function (myGift){
		$.couch.db('xmasapp').openDoc(myGift, {
			success: function(data) {
				$('#getRidOf').remove();	
				setObject(data);						
        		console.log(data);
            	$('#category').html(data.category[1]).trigger('create');
            	$('#comments').html(data.comments[1]);
            	$('#amount').html(data.amount[1]);
            	$('#location').html(data.location[1]);
            	$('#store').html(data.store[1]);
            	$('#url').html(data.url[1]);
            	$('#date').html(data.date[1]);
	         }
	    });
    }
    loadGift(giftToEdit)
 // Delete function!
    var deleteGift = function(removeID){						
    	var idToDelete = {};									
    	idToDelete._id = removeID._id;
    	idToDelete._rev = removeID._rev;						
    	console.log(idToDelete, "will remove be deleted.",);			
    	$.couch.db('xmasapp').removeDoc(idToDelete, {			
    		success: function(data){
    		console.log("Item deleted!");
    		}
    	})	
    }
    
    
    $('#remove').on("click", function(){						
    	console.log("Do you want to remove: ", giftID);					
    		deleteGift(giftID);			
    		$.mobile.changePage( "index.html#gift", { transition: "slideup"} );
    });
   
    	
    	
    	
    	
    }