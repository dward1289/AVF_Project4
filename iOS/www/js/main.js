//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){              

    document.addEventListener("deviceready", onDeviceReady, false);
                        
                        function onDeviceReady() {
                        //Loading contacts
                        var options = new ContactFindOptions();
                        options.filter="Geek";
                        options.multiple=false;
                        var fields = ["displayName","nickname", "phoneNumbers", "emails", "addresses"];
                        navigator.contacts.find(fields, onSuccess, onError, options);
                        
                        //location
                        navigator.geolocation.getCurrentPosition(onSuccessL, onErrorL);
                        
                        //Checking connection
                        $("#connect").on("click", checkConnection);
                        }
                        
                        //Contacts Success
                        function onSuccess(contacts) {
                        for (var i=0; i<contacts.length; i++) {
                        
                        
                        $( ' ' +
                          '<div id="con">' +
                          '<div id="h2Title"><h2><b>' + contacts[i].displayName + '</h2></b></div></li>' +
                          
                          '<ul>' +
                          
                          '<li><p><img src="http://i24.photobucket.com/albums/c39/youngbutcute07/folder_home.png" border="0" alt="Photobucket" width="40px" height= "40px"/><u> Home Contact: </u><br/></p><b><i>Home Phone: </i></b>' + contacts[i].phoneNumbers[2].value + '</li>' +
                          '<li><b><i>Street Address: </i></b>' + contacts[i].addresses[0].streetAddress + '</li>' +
                          '<li><b><i>City and Zipcode: </i></b>' + contacts[i].addresses[0].locality + ', ' + contacts[i].addresses[0].postalCode +'</li>' +
                          
                          '<li><p><img src="http://i24.photobucket.com/albums/c39/youngbutcute07/1354902002_suitcase.png" border="0" alt="Photobucket" width="40px" height= "40px"/><u> Work Contact: </u><br/></p> <b><i>Office Phone: </i></b>' + contacts[i].phoneNumbers[3].value + '</li>' +
                          '<li><b><i>Email: </i></b>' + contacts[i].emails[1].value + '</li>' +
                         
                        
                          '</ul>' +
                          '</div>'
                          ).appendTo("#contacts");
                        }
                        };
                        
                        
                        function onError(contactError) {
                        alert('onError!');
                        }
                        
                        //Connection Function
                        function checkConnection() {
                        var whatNetwork = navigator.connection.type;
                        
                        var connects = {};
                        connects[Connection.UNKNOWN]  = 'Unknown connection';
                        connects[Connection.ETHERNET] = 'Ethernet connection';
                        connects[Connection.WIFI]     = 'WiFi';
                        connects[Connection.CELL_2G]  = '2G connection';
                        connects[Connection.CELL_3G]  = '3G connection';
                        connects[Connection.CELL_4G]  = '4G connection';
                        connects[Connection.NONE]     = 'no connection';
                        
                        alert("You are currently using " + connects[whatNetwork] + ".");
                        
                        $.ajax({
                               type: "GET",
                               url: "http://search.twitter.com/search.json?q=" + connects[whatNetwork] + "&rpp=3",
                               dataType: "json",
                               success: function (twiHim) {
                               for (var i=0, len = twiHim.results.length; i < len; i++){
                               var item2 = twiHim.results[i];
                               
                               $(' ' +
                                 '<div class="heHere">' +
                                 '<ul>' +
                                 '<li><img src="'+ item2.profile_image_url + '" id="tweetImg"/></li>' +
                                 '<li><p><h3 id="sN">' + item2.from_user_name + '</p></li>' +
                                 '<li><p id="fullName">' + item2.from_user + '</p></li>' +
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
                        
                        //Location Success
                        var onSuccessL = function(position) {
                        $( ' ' +
                          '<div id="loc">' +
                          '<ul>' +
                          '<li><h4>Latitude: '   + position.coords.latitude  + '</h4></li>' +
                          '<li><h4>Longitude: '  + position.coords.longitude + '</h4></li>' +
                          '</ul>' +
                          '</div>'
                          ).appendTo("#location");
                        };
                        
                        //Positon Error
                        function onErrorL(error) {
                        alert('code: '    + error.code    + '\n' +
                              'message: ' + error.message + '\n');
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
					'<li> User ID: ' + item.from_user_id + '</li>' +
					'<li> Screen Name: ' + item.from_user_name + '</li>' +
					'<li> Full Name: ' + item.from_user + '</li></p>' +
					'<li> Tweet Created: ' + item.created_at + '</li>' +					
					'<li> Tweet: ' + item.text + '</li></p>' +
					'</ul>' +
					'<br>' +
					'</div>'
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



