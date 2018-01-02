$(document).ready(function(){
var mainCatList;
var shoppingCart = [];





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
        $(".mainMenuList").append("<li class='cartbutton'><a href='#'>Kundvagn</a></li>");      
        $(".cartbutton").click(function(){
            showCart();
        });

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
                var productCardPrice = "<p>" + productList[index].prodPrice + " kr</p>";
                var productCardImage = "<img class='productCardImg' onclick='showProduct(" + productList[index].id + ")' src='img/products/" + productList[index].prodImg + "'>";

                var productCard = "<div class='productCard'>" + productCardImage + productCardName + productCardPrice + "</div>";

                if (productList[index].mainCategory == i+1){
                    $(".main").append(productCard);
                }
                else if (productList[index].subCategory == i ){
                    $(".main").append(productCard);
                }
            }
        }
        showProduct = function(i){
            $(".main").html("");
            
            for(var index = 0; index < productList.length; index++){
                var productName = "<h2>" + productList[index].prodName  + "</h2>";
                var productPrice = "<p>" + productList[index].prodPrice + " kr</p>";
                var productImage = "<img class='productImg' alt='" + productList[index].prodName + "' src='img/products/" + productList[index].prodImg + "'>";
                var productDescription = "<p>" + productList[index].prodDesc + "</p>";
                var cartButton = "<button class='cartButton' onclick='addToCart(" + productList[index].id + ")'>Lägg i kundvagn</button>";

                var productContainer = "<div class='productContainer'>" + productName + "<hr class='productHR'>" + productPrice + cartButton + productDescription + "</div>";

                if (productList[index].id == i){
                    $(".main").append(productImage);
                    $(".main").append(productContainer);
                }
            }
        }

        addToCart = function(i){
            
            var productName = productList[i-1].prodName
            var productPrice = productList[i-1].prodPrice
            

            shoppingCart.push(productList[i-1]);
            console.log(shoppingCart);
        }

        showCart = function(){
            $(".main").html("<h2>Kundvagn</h2><hr class='productHR'>");

            var json_str = JSON.stringify(shoppingCart);
            localStorage.shoppingCart = json_str; 
            
            var loopCart = JSON.parse(localStorage.shoppingCart);

            
            var cartListProdName = "<ul class='cartListProdName'>";
            var cartListProdPrice = "<ul>";
            var cartListRemove = "<ul class='cartListRemove'>";

            for(var i = 0; i < loopCart.length; i++){
                cartListProdName += "<li>" + loopCart[i].prodName + "</li>";
                cartListProdPrice += "<li>" + loopCart[i].prodPrice + " kr</li>";
                cartListRemove += "<li><a href='#' onClick='delCartItem(" + i + ")'>Ta bort</a></li>";
            }

            var priceTotal = 55;
            for(var i = 0; i < shoppingCart.length; i++) {
                priceTotal += shoppingCart[i].prodPrice;
            }

            cartListProdName += "<li>Frakt</li></ul>"
            cartListProdPrice += "<li>55 kr</li></ul>"
            cartListRemove += "</ul>"
            
       
            $(".main").append("<div class='cartList'></div><div class='cartSummary'></div>");
            $(".cartList").append(cartListProdName + cartListProdPrice + cartListRemove);

            var checkOutButton = "<button class='cartButton' onclick='checkOut()'>Gå till kassan</button>";
            $(".cartSummary").append("<h3>Totalpris: " + priceTotal + " kr </br>" + checkOutButton);

        }

        delCartItem = function(i){
            shoppingCart.splice(i, 1);
            showCart();
        }

        





}
    
    
    
    
        
});
    
    