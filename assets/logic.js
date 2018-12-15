
// array of my favorite cartoons       
var toons = ["Venture Bros", "Castlevania", "The Maxx", "Beavis and Butthead", "King of the Hill", "Bob's Burgers", "Daria", ""]
       
         //function to use array to load buttons for our gifs
   function gifButtons()   {
       //clears previous buttons so we can reload the array with any additions
    $("#gif-button-zone").empty();
    //Loop runs through array and makes our buttons! each button gets class = toon, a both text and data-name with it's string, and they then get appended to the gif button zone
    for (var i = 0; i < toons.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("toon");
        gifButton.attr("data-name", toons[i]);
        gifButton.text(toons[i]);
        $("#gif-button-zone").append(gifButton);
    }
   }
   // listener pushes input from #user-input to toons array and runs gifButtons again to repopulate buttons
   $("#addGif").on("click", function(event) {
    event.preventDefault();
    var newToon = $("#user-input").val().trim();
    toons.push(newToon);
    $("#user-input").val('');
    gifButtons();
  });

   
   function gifClick(){
    var toon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + toon + "&api_key=3NcjHbiQ6U5pO9LWxTPWKARwXY3SYgJn&limit=10";
        $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        //clears previous gifs out of our gif viewing div
        $("#gif-display-zone").empty(); 
        var results = response.data; 
        for (var i=0; i<results.length; i++){
            console.log (results);
            var displayDiv = $("<div>");
            displayDiv.addClass("displayDiv");
            // creates a p element for gif ratings, and appends them to the gif display div 
           
            // setup for still an animated versions of out gifs
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            displayDiv.append(gifImage);
            $("#gif-display-zone").prepend(displayDiv);
            var gifRating = $("<p>").text("Gif rating: "+results[i].rating);
            displayDiv.append(gifRating);
        }
    });
}
// sets click listener for all items with toon class, if 'still' they will animate, if not, they will become 'still'
$(document).on("click", ".toon", gifClick);
     gifButtons ();
     $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still')
        {
            $(this).attr('src', 
            $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else{
            $(this).attr('src', 
            $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

   
    
