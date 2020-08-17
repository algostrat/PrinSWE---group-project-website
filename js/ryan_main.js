//Glabal variable for current list index
// haveibeenpwned key 4fd02bcf9d264187813f1ddba1880a2c


var curr_list = 0;
var correct_link_order = [1,2,0,3];    

var faulty_links = [
    ['facebooklink.com.ru', 'facebook.com/index.php', 'facebookcom.index.bl','facebookfakelink.so'],
    ['googlelink.com.ru','googlecom.index.bl', 'google.com/search', 'googlescamlink.so'],
    ['youtube.com/feed/trending', 'youtubelink.com.ru', 'youtubecom.index.bl','youtubescamlink.so'],
    ['amazonlink.com.ru', 'amazoncom.index.bl','amazonfreestuff.so', 'https://www.amazon.com/']
];

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    //first fake links and event listeners
    AddFakeLinks(faulty_links, curr_list);

    //url checker action
    $("#my_form").submit(function(event){
        event.preventDefault(); //prevent default action 
        
        var api_url = "https://safebrowsing.googleapis.com/v4/threatMatches:find?"
        var key = 'AIzaSyB4kdzo6L__fqN0a2DEyafG1sX8lKMb5ns'
        api_url += "key="
        api_url += key
    
        var url_to_check = $("#url_to_check").val();
        $("#upload-progress .progress-bar").css("width", + 0 +"%");

        //console.log(url_to_check);

        
        var payload = 
        {
            "client":{
                "clientId": "281501170163-n762ib56p1rppj3loll3pmm82u7hlas2.apps.googleusercontent.com",
                "clientVersion": "1.0.0",
            },
            "threatInfo": {
                "threatTypes":      ["MALWARE", "SOCIAL_ENGINEERING"],
                "platformTypes":    ["WINDOWS"],
                "threatEntryTypes": ["URL"],
                "threatEntries": [
                    {"url": url_to_check}
                ]
              }
        }

        $.ajax({
            type: "POST",
            url: api_url,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(payload),
            xhr: function(){
                //upload Progress
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        //update progressbar
                        $("#upload-progress .progress-bar").css("width", + percent +"%");
                    }, true);
                }
                return xhr;
            }, 
            success:function (data) {
                console.log(data);
                var json = JSON.parse(JSON.stringify(data));
                //console.log(json);
            },
            error:function(jqXhr, textStatus, errorThrown) {
                 console.error(textStatus, errorThrown) 
                 $(".alert").css("visibility", "visible" );
                 $(".alert").css("background-color", "darkgrey" );
                 $(".alert").html("Error when trying to process input: " + url_to_check);

            }
        }).done(function(response, threatMatches, textStatus){

            
            
            console.log(JSON.stringify(response));
            console.log(JSON.stringify(response) === JSON.stringify({}));
            
            if(JSON.stringify(response) === JSON.stringify({})){
                //handle html response alert box
                $(".alert").css("visibility", "visible" );
                $(".alert").css("background-color", "lightgreen" );
                $(".alert").html("No malicious Content found at " + url_to_check);
            } else {
                    
                //handle html response alert box
                $(".alert").css("visibility", "visible" );
                $(".alert").css("background-color", "orangered" );
                $(".alert").html("Malicious Content found at " + url_to_check);
                
            }
        });
    
    });
});


function AddFakeLinks(faulty_links, index) {

    var rndValue;
    // GENERATE A RANDOM NUMBER (BETWEEN 1 AND 50) FOR EVERY BUTTON CLICK.
    rndValue = Math.floor((Math.random() * 50));


    // NOW ADD THE VALUE (RANDOM NUMBER) TO THE DIV ELEMENT.
    $('<p>' + rndValue + '</p>').appendTo('#myProfile');

    for( i =0; i < 4; i++){
        $('<a id="badlink'+i+'">'+faulty_links[index][i]+'</a>').appendTo('#fake-list-items');

    }

    //need to bind click events to each dom element
    $( "#badlink0" ).click( function() {
        CheckLinkClick(0);
      });    
     
    $( "#badlink1" ).click( function() {
        CheckLinkClick(1);
       });    
    
    $( "#badlink2" ).click( function() {
        CheckLinkClick(2);
      } );    

    $( "#badlink3" ).click( function() {
        CheckLinkClick(3);
       } );    
}

function RemFakeLinks(){
    console.log("got here");
    $('#fake-list-items').empty();
    window.curr_list = LinksCounter(curr_list);

}

function LinksCounter(count){
    if(count==0) return 1;
    if(count==1) return 2;
    if(count==2) return 3;
    if(count==3) return 0;
}

function CheckLinkClick(link_clicked){
    if(correct_link_order[curr_list] == link_clicked)
    {
        DisplayChoice("correct"); 
    } else {
        DisplayChoice("wrong");
    }
}

function DisplayChoice(choice)
{
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    //btn.onclick = function() {
    modal.style.display = "block";
    $(".choice_text_elem").remove()

    //}
    if(choice == "correct"){
        $(".modal-content").css("background-color","LimeGreen");
        $("<p class=\"choice_text_elem\"> Correct! Try the next set of choices.</p>").appendTo(".modal-content");
    }

    if(choice == "wrong"){
        $(".modal-content").css("background-color","OrangeRed");
        $("<p class=\"choice_text_elem\"> Wrong choice. Look back at the above section for tips.</p>").appendTo(".modal-content");
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
                    
        //change choices 
        if(choice == "correct"){
            RemFakeLinks();
            AddFakeLinks(faulty_links, curr_list);
        }

    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            //change choices 
            if(choice == "correct"){
                RemFakeLinks();
                console.log(curr_list);
                AddFakeLinks(faulty_links, curr_list);
            }
        }
    }
}


