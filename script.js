$(document).ready(function(){
var mainCatList;

fetch("./huvudkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(huvudkategorier) {
        mainCatList = huvudkategorier;
        printMainCat();

    });
fetch("./underkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(underkategorier) {
        subCatList = underkategorier;
        

    });




$(".mainMenuItemClass").click(function(){ 
        console.log("hejdå")
       
    }); 







function printMainCat(){
    $(".mainMenuList").append("<li><a href='#'>Start</a></li>");
    for(var i = 0; i < mainCatList.length; i++){
        
        var mainCatName = "<li class='mainMenuItemClass' onclick='onClickMain(" + [i] + ")'><a href='#'>" + mainCatList[i].mainCategory + "</a></li>";
        $(".mainMenuList").append(mainCatName);
    }
        $(".mainMenuList").append("<li><a href='#'>Kontakt</a></li>");
        $(".mainMenuList").append("<li><a href='#'>Information</a></li>");
        $(".mainMenuList").append("<li><a href='#'>Kundvagn</a></li>");      

        onClickMain = function(i){      
            $(".subMenuList").html("");    
            for(var index = 0; index < subCatList.length; index++){
            
                if (subCatList[index].mainCategory == i+1){
                    $(".subMenuList").append("<li><a href='#'>" + subCatList[index].subCategory + "</a></li>")
                }
           }
           
        }





}
    
    
    
    
        
});
    
    