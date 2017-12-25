$(document).ready(function(){
    var mainCatList;

    fetch("./huvudkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(huvudkategorier) {
        mainCatList = huvudkategorier;
        console.log(huvudkategorier);
        printMainCat();

    });
    function printMainCat(){
        $(".menuList").append("<li>Start</li>");
        for(var i = 0; i < mainCatList.length; i++){
            
            var mainCatName = "<li>" + mainCatList[i].mainCategory + "</li>";
            $(".menuList").append(mainCatName);
            console.log(mainCatName);
         }
         $(".menuList").append("<li>Kontakt</li>");
         $(".menuList").append("<li>Information</li>");
         $(".menuList").append("<li>Kundvagn</li>");
      }
    
    
    
    
        
    });
    
    