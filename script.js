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

fetch("./produkter.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(produkter) {
        productList = produkter;
        

    });










function printMainCat(){
    $(".mainMenuList").append("<li><a href='#'>Start</a></li>");
    for(var i = 0; i < mainCatList.length; i++){
        
        var mainCatName = "<li class='mainMenuItemClass' onclick='printSubCat(" + [i] + "); printProductList(" + [i] + ")'><a href='#'>" + mainCatList[i].mainCategory + "</a></li>";
        $(".mainMenuList").append(mainCatName);
    }
        $(".mainMenuList").append("<li><a href='#'>Kontakt</a></li>");
        $(".mainMenuList").append("<li><a href='#'>Information</a></li>");
        $(".mainMenuList").append("<li><a href='#'>Kundvagn</a></li>");      

        printSubCat = function(i){      
            $(".subMenuList").html("");    
            for(var index = 0; index < subCatList.length; index++){
                var subCatName = "<li onclick='printProductList(" + subCatList[index].id + ")'><a href='#'>" + subCatList[index].subCategory + "</a></li>";

                if (subCatList[index].mainCategory == i+1){
                    $(".subMenuList").append(subCatName);
                }
           }
        }
        printProductList = function(i){
            $(".main").html("");
            
            for(var index = 0; index < productList.length; index++){
                
                var productCardName = "<h2>" + productList[index].prodName  + "</h2>";
                var productCardPrice = "<p>" + productList[index].prodPrice + " kr</p>"

                var productCard = "<div class='productCard'>" + productCardName + productCardPrice + "</div>";

                if (productList[index].mainCategory == i+1){
                    $(".main").append(productCard);
                }
                else if (productList[index].subCategory == i ){
                    $(".main").append(productCard);
                }
                
            }
        }





}
    
    
    
    
        
});
    
    