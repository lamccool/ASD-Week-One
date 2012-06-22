//Mobile Media Development
//Full Sail University
//Laura McCool

 function storeData(key, rev){
    	console.log('storeData');
    // If there is no key this means this is a brand new item and we need a new key
    	
    	var id;
    		
    		if (!key){  
    	id                 = "gifts:"+ Math.floor(Math.random()*100000001);
        }else{
        	id = key;
    	}
        
    	var item                   ={};
        	item._id 			   = id;
        	item._rev 		       = rev;
        	item.category          = ["Gift Category:", $('#category').val()];
            item.comments          = ["Gift Description:", $('#comments').val()];
            item.amount            = ["Quantity:", $('#amount').val()];
            item.location          = ["Where To Buy:", $('input:radio[name="locations"]:checked').val()];
            item.store             = ["Store Name:", $('#store').val()];
            item.url               = ["Product Url:", $('#url').val()];
            item.date              = ["Date Added:", $('#date').val()];
        
        //Save Data in localStorage: Use Stringify to convert our object to a string.
        //localStorage.setItem(id, JSON.stringify(item));
            $.couch.db('xmasapp').saveDoc(item, {
            	success: function(data) {
                    alert("Item Added!");
            	}
            });

  };
    
$('#page').bind('pageshow',function(){
	    $('#submit').bind("click", function (){
	                      storeData();
	});
});    
    
    /*function validate(e){
        //define elements we want to check
        var getCategory = $('category');
        var getComments = $('comments');
        var getAmount = $('amount');
        
        //Reset Error Message
        errMsg.innerHTML ="";
        $('#getCategory').css({border: '1px solid black'});
        $('#getComments').css({border: '1px solid black'});
        $('#getAmount').css({border: '1px solid black'});
        
        //Get Error Messages
        var messageAry = [];
        //Category Validation
        if (getCategory.value === "--Choose A Gift Category--"){
            var categoryError = "Please choose a category.";
            $('#getCategory').css({border: '1px solid red'});
            messageAry.push(categoryError);
        }
        
        //Comments validation
        if (getComments.value === ""){
            var commentsError = "Please include your item.";
            $('#getComments').css({border: '1px solid red'});
            messageAry.push(commentsError);
        }
        
        //If there were errors display them on the screen
        if(messageAry.length >= 1){
            for(var i=0, j=messageAry.length; i < j; i++){
                var txt = $('li');
                txt.innerHTML = messageAry[i];
                $('errMsg').append('txt');
            }    
            e.preventDefault();
            return false;    
        }else {
        	console.log("form is valid");
            //If all is well save our data. send the key value (which came from editData function
            //remember this key value was passed thru the editSubmit event listener as a property
            storeData(this.key);
        }

    };*/
    
   
   /*function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.");
        }else{ 
            localStorage.clear();
            alert("All items are deleted.");
            window.location.reload();
            return false;    
        }
    }
 
    $('addNew').bind('click', function(){storeData();});

// JSON Data 
    $('#jsonbutton').bind('click', function(){
    $('#giftdata').empty();    
    $('<p>').html('JSON IMPORT').appendTo('#giftdata');
    $.ajax({
        url: 'data.json',
        type: 'GET',
        dataType: 'json',
        success: function(response){
            console.log(response);
             for (var i=0, j=response.giftdata.length; i<j; i++){    
                      var jdata = response.giftdata[i];    
                    $(''+    
                       '<div class="gifttitle">'+
                        '<h3>Category: '+ jdata.category +'</h3>'+
                        '<p>Gift Description: '+ jdata.comments +'</p>'+
                        '<p>Quantity: '+ jdata.amount +'</p>'+
                        '<p>Where to Buy: '+ jdata.location +'</p>'+
                        '<p>Store Name: '+ jdata.store +'</p>'+
                        '<p>Product URL: '+ jdata.url +'</p>'+
                        '<p>Date Added: '+ jdata.date +'</p>'+
                    '</div>'
                    ).appendTo('#giftdata');
                    //console.log(xml);
                 } //for loop
              }, //function    
              error: function(errormessage){
              console.log("Error!" + errormessage);
             }
        }); //ajax    
    }); //json button
    
// XML Data

    $('#xmlbutton').bind('click', function(){
        $('#giftdata').empty();
        $('<p>').html('XML IMPORT').appendTo('#giftdata');
        $.ajax({    
            url: 'data.xml',
            type: 'GET',    
            dataType: 'xml',    
            success: function(xml){
            console.log(xml);
            //var data = $.parseXML(xml);
            //console.log(data);
            var items = $(xml);
            items.find("item").each(function(){
                   var item = $(this);    
                 //$(xml).find("item").each(function(){
                var category = $(this).find('category').text();
                console.log(category);
                var comments = $(this).find('comments').text();
                var amount = $(this).find('amount').text();
                var location = $(this).find('location').text();
                var store = $(this).find('store').text();
                var url = $(this).find('url').text();
                var date = $(this).find('date').text();
                $(''+    
                    '<div class="gifttitle">'+
                            '<h3>Category: '+ category +'</h3>'+
                            '<p>Gift Description: '+ comments +'</p>'+
                            '<p>Quantity: '+ amount +'</p>'+
                            '<p>Where to Buy: '+ location +'</p>'+
                            '<p>Store Name: '+ store +'</p>'+
                            '<p>Product URL: '+ url +'</p>'+
                            '<p>Date Added: '+ date +'</p>'+
                        '</div>'
                       ).appendTo('#giftdata');
                       console.log(xml);    
                  //}); //closed xml.find
    
                }); // function close
          }, //success close
         error: function(errormessage){
             console.log("Error!" + errormessage);
         }
     }); //ajax
 }); //closes xml button
     
//CSV Data

    $('#csvbutton').bind('click', function(){
        $('#giftdata').empty();
        $('<p>').html('CSV IMPORT').appendTo('#giftdata');    
         $.ajax({
            type: "GET",    
               url: "data.csv",
            dataType: "text",
            success: function(data) {
            var allTextLines = data.split(/\r\n|\n/);
            var headers = allTextLines[0].split(',');
            var lines = []; // main 

            for (var i=1; i<allTextLines.length; i++) {
                var dataTwo = allTextLines[i].split(',');
                if (dataTwo.length == headers.length) {
                    var gifts = []; // blank

                    for (var j=0; j<headers.length; j++) {
                        gifts.push(data[j]); 
                    }
                    lines.push(gifts); 
                }
            }

            for (var m=0; m<lines.length; m++){
                var agift = lines[m];
            $(''+
                    '<div class="gifttitle">'+
                        '<h3>Category: '+ agift[1] +'</h3>'+
                        '<p>Gift Description: '+ agift[2] +'</p>'+
                        '<p>Quantity: '+ agift[3] +'</p>'+
                        '<p>Where to Buy: '+ agift[4] +'</p>'+
                        '<p>Store Name: '+ agift[5] +'</p>'+
                        '<p>Product URL: '+ agift[6] +'</p>'+
                        '<p>Date Added: '+ agift[7] +'</p>'+
                    '</div>'
                ).appendTo('#giftdata');
            console.log(lines);    
            } //closes for loop
          }

      });
 }); //gift close*/

// couchdata function
//$('#couchbutton').bind('click', function(){
	$('#giftPage').bind('pageshow',function(){
  	//console.log("button pressed");
      $('#couchgifts').empty();
      $('<p>').html('COUCH DATA IMPORT').appendTo('#couchgifts');
      $.couch.db('xmasapp').view("xmas/gifts", {
      	success: function(data){
      		console.log(data);
             $.each(data.rows, function(index,gift){
              var id = gift.id;
              console.log(id);
              var rev = gift.value.revision;
                        
      var editLink = $('<a>Edit</a>').attr({href:'additem.html', id:id});
		// Edit link event listenener
		editLink.bind('click',function () {
			$('#displayData').hide();
			$('#clearData').hide();
		     //category 
			$('category').value = gift.value.category;
			$('#category').button();
		     // gift
		    $('comments').value = gift.value.comments;
	        $('#comments').textinput();
	         // quantity
	        $('amount').value = gift.value.amount;
	        $('#amount').val(80).slider('refresh');
	          
	      // radio buttons: location online or store
	          	if (gift.value.location === "online") {
					$('#online').attr('checked',true);
				}
				else if (gift.value.location === "store") {
					$('#store').attr('checked',true);
				};
		    //store name
		    $('store').value = gift.value.store;
		    $('#store').textinput();
		    // url
		    $('url').value = gift.value.url;
		    $('#url').textinput();
		    //date
		    $('date').value = gift.value.date;
		    $('#date').textinput();
	          
	          
			// submit button for edit mode
			$('#submit').html("Save Item Changes");
			$('#submit').unbind('click');
			$('#submit').bind("click", function (){storeData(id,rev);});
			$('#submit').button('refresh');
		});
		
		var deleteLink = $('<a>Delete Item</a>').attr({href:'#', id:id});
		deleteLink.bind('click',function () {
			var ask = confirm("Are you sure you want to delete this item?");
			if (ask){
				$.couch.db('xmasapp').removeDoc({_id:id, _rev:rev});
				alert("Item was deleted.");
				$.mobile.changePage('#giftPage');		
			}
			else{
				alert("Item was NOT deleted.");
				console.log(id);
			};
		});

	$('#couchgifts').append(
				'<h3>Category: '+ gift.value.category +'</h3>'+
				'<p>Gift Description: '+ gift.value.comments +'</p>'+
				'<p>Quantity: '+ gift.value.amount +'</p>'+
				'<p>Where to Buy: '+ gift.value.location +'</p>'+
				'<p>Store Name: '+ gift.value.store +'</p>'+
				'<p>Product URL: '+ gift.value.url +'</p>'+
				'<p>Date Added: '+ gift.value.date +'</p>'
		).append(editLink).append('<br/>').append(deleteLink);
      });//function .each
    $('#couchgifts').listview('refresh');
      console.log($('#giftdata'));
      	}
      });
 }); // page end



