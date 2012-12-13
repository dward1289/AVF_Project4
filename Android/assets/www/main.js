//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){              

document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {
            
        var myDeviceIs = function () {
        var element = document.getElementById('deviceIs');
        element.innerHTML = '<ul>' +
        					'<center><li><h3><b>' + device.platform + ' ' + device.version  + '</b></h3><li/>' +
  							'<li><i>UUID: ' + device.uuid + '</i><li/>' +
                            '<li> Cordova Version: ' + device.cordova + '<li/></center>' +   
                            '</ul>';
                            }
                            
		$("#mySystem").on("click", myDeviceIs);
		$("#connectHow").on("click", checkConnection);

		var options = new ContactFindOptions();
        options.filter=""; 
        var fields = ["displayName", "name", "phoneNumbers", "addresses", "emails"];
        navigator.contacts.find(fields, onSuccess, onError, options);
						
}


					

	var checkConnection = function () {
         var connectWhat = navigator.network.connection.type;

    var connectIt = {};
    connectIt[Connection.UNKNOWN]  = 'Not sure of your connection.';
    connectIt[Connection.ETHERNET] = 'You have ethernet connection.';
    connectIt[Connection.WIFI]     = 'You have Wi-fi connection.';
    connectIt[Connection.CELL_2G]  = 'You have 2G connection. Wi-fi will give you more speed.';
    connectIt[Connection.CELL_3G]  = 'You have 3G connection.';
    connectIt[Connection.CELL_4G]  = 'You have 4G connection. Fast speed!';
    connectIt[Connection.NONE]     = 'No network connection found.';

    alert(connectIt[connectWhat]);
}


function onSuccess(contacts) {

 $( ' ' + 
					'<div id="contactIn">' +
					'<ul>' +
					'<li><b><h3>' + contacts[0].displayName + '</h3></b></li>' +
					'<li><p><u>Home Contact</u></p></li>' +
					'<li><p id="tacts"><img src="http://i24.photobucket.com/albums/c39/youngbutcute07/1355365308_phone_1.png" width="40px" height="40px"/>Phone: ' + contacts[0].phoneNumbers[0].value + '</p></li>' +
					'<li><p id="tacts"><img src="http://i24.photobucket.com/albums/c39/youngbutcute07/1355365443_Mail-2.png" width="40px" height="40px"/>Email: ' + contacts[0].emails[0].value + '</p></li>' +
					'<li><p id="tacts"><img src="http://i24.photobucket.com/albums/c39/youngbutcute07/1355365622_Map-Marker-Marker-Outside-Chartreuse.png" width="40px" height="40px"/>Address: ' + contacts[0].addresses[0].streetAddress + '</p></li>' +
					'<li><p id="tacts">' + contacts[0].addresses[0].locality + ', ' + contacts[0].addresses[0].region + ', ' + contacts[0].addresses[0].postalCode + '</p></li>' +
					'</ul>' +
					'<ul>' +
					'<li><p><u>Work Contact</u></p></li>' +
					'<li><p id="tacts"><img src="http://i24.photobucket.com/albums/c39/youngbutcute07/1355365308_phone_1.png" width="40px" height="40px"/>Phone: ' + contacts[0].phoneNumbers[1].value + '</p></li>' +
					'<li><p id="tacts"><img src="http://i24.photobucket.com/albums/c39/youngbutcute07/1355365443_Mail-2.png" width="40px" height="40px"/>Email: ' + contacts[0].emails[0].value + '</p></li>' +
					'</ul>' +
					'</div>'
					).appendTo("#thatList");
					
					
					            
      $.ajax({
       type: "GET",
       url: "http://search.twitter.com/search.json?q=" + contacts[0].displayName + "&rpp=3", 
       dataType: "json",
       success: function (twiHim) {
        for (var i=0, len = twiHim.results.length; i < len; i++){
         var item2 = twiHim.results[i];
         
         $(' ' +
         '<div id="heHere">' +
         '<ul>' +
         '<li><img src="'+ item2.profile_image_url + '" id="tweetImg"/></li>' +
         '<li><p><h3 id="sN">' + item2.from_user_name + '</h3></p></li>' +
		 '<li><p id="fullName">Full Name: ' + item2.from_user + '</p></li>' +
		 '<li><p id="date">' + item2.created_at + '</p></li>' +					
		 '<li><p id="tweeted">' + item2.text + '</p></li>' +
         '</ul>' +
         '</div>' +
         '<br>' 
         ).appendTo("#thisTwit");
                }
     }
     });

    }


    // onError: Failed to get the contacts
    //
    function onError(contactError) {
        alert('onError!');
    }
                        
                        
                        
var twitterSearch = function () {
$.ajax({
		type: "GET",
		url: "http://search.twitter.com/search.json?q=vh1",
		dataType: "json",
		success: function (twi) {

                for ( var i = 0, len = twi.results.length; i < len; i++ ) {
                    var item = twi.results[i];

                    $( ' ' + 
					'<div class="tweetsIn">' +
					'<ul>' +
					'<p><li><img src="'+ item.profile_image_url + '" id="tweetImg"/></li>' +
					'<li><p><h3 id="sN">' + item.from_user_name + '</p></li>' +
					'<li><p id="fullName">' + item.from_user + '</p></li>' +
					'<li><p id="date">' + item.created_at + '</p></li>' +					
					'<li><p id="tweeted">' + item.text + '</p></li>' +
					'</ul>' +
					'</div>' +
					'<br>' 
					).appendTo("#thisTwitter");
                }
            }
})
		};
	$("#twitterBtn").on("click", twitterSearch);
	


var tvSearch = function () {
$.ajax({
		type: "GET",
		url: "http://api.trakt.tv/calendar/shows.json/e72b9f73212db9cf43ea905bbcbc3054",
		dataType: "json",
		success: function (tv) {

					for ( var i = 0, len = tv[i].episodes.length; i < len; i++ ) {
                    var item = tv[0].episodes[i]
            $(' ' +
            	'<div class="tvIn">' +
            	'<ul>' +
            	'<p><li><img src="' + item.show.images.poster +'" id="showImg"/></li>'+
            	'<li> Name of Show: ' + item.show.title +'</li>'+
            	'<li> Network Channel: ' + item.show.network +'</li>'+
            	'<li> Show Website: ' + item.show.url +'</li></p>'+
            	'<p><li> Country: ' + item.show.country +'</li>'+
            	'<li> Day of Show: ' + item.show.air_day +'</li>'+
            	'<li> Time of Show: ' + item.show.air_time +'</li></p>'+
            	'<p><li> Overview: ' + item.show.overview +'</li></p>'+
            	'</ul>' +
            	'<br>' +
            	'</div>'
            	).appendTo("#thisTV");
            }
        }       
})
		};
	$("#tvBtn").on("click", tvSearch);
	
});



