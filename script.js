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
    //$(".mainMenuList").append("<li class='cartLink'><a href='#'><div class='cartCounter'></div></a></li>");  
    
    $(".cartLink").hover(function(){
            $(".cartLink").css("background-image", "url(img/cartHover.png)");
            $(this).css('cursor','pointer');
    }, function() {
        if (
            shoppingCart.length != 0){$(".cartLink").css("background-image", "url(img/cartFull.png)");
        }
        else{
            $(".cartLink").css("background-image", "url(img/cart.png)");
        }  
    });
    $(".cartLink").click(function(){
        showCart();
    });
    $(".mobileMenuButton").click(function(){
        $(".mainMenu").toggle();
        $(".subMenu").toggle();
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
            var productDescription = "<p class='productDescription'>" + productList[index].prodDesc + "</p>";
            var cartButton = "<button class='cartButton' onclick='addToCart(" + productList[index].id + ")'>Lägg i kundvagn</button>";

            var productTitle = "<div class='productTitle'>" + productName + "<hr class='productHR'>" + productPrice + "</div>"
            var productContainer = "<div class='productContainer'>" + cartButton + productDescription + "</div>";
            var productPage = "<div class='productPage'>" + productImage + productTitle + productContainer + "</div>";
            if (productList[index].id == i){
                $(".main").append(productPage);
            }
        }
    }
    addToCart = function(i){
        
        var productName = productList[i-1].prodName
        var productPrice = productList[i-1].prodPrice
        

        shoppingCart.push(productList[i-1]);
        $(".cartCounter").html(shoppingCart.length);
        $(".cartLink").css("background-image", "url(img/cartFull.png)");
    }

    showCart = function(){
        $(".main").html("<div class='cartTitle'><h2>Kundvagn</h2></div><hr class='productHR'>");

        var priceTotal = 55;
        for(var i = 0; i < shoppingCart.length; i++) {
            priceTotal += shoppingCart[i].prodPrice;
        }
        $(".cartTitle").append("<h3>Totalpris: " + priceTotal + " kr</h3>");



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

        cartListProdName += "<li>Frakt</li></ul>";
        cartListProdPrice += "<li>55 kr</li></ul>";
        cartListRemove += "</ul>";
       
        
    
        $(".main").append("<div class='cartList'></div><div class='cartSummary'></div>");
        $(".cartList").append(cartListProdName + cartListProdPrice + cartListRemove);

        var checkOutButton = "<button class='cartButton' onclick='checkOut()'>Gå till kassan</button>";
        var showLoginButton = "<button class='cartButton' onclick='showLogin()'>Logga in</button>";
        var showCreateAccountButton = "<button class='cartButton' onclick='showCreateAccount()'>Skapa konto</button>";
        $(".cartSummary").append(checkOutButton + showLoginButton + showCreateAccountButton);

    }

    delCartItem = function(i){
        shoppingCart.splice(i, 1);
        showCart();
        $(".cartCounter").html(shoppingCart.length);
        if (shoppingCart.length <= 0){
            $(".cartLink").css("background-image", "url(img/cart.png)");
        }
    }

    checkOut = function(){
        $(".main").html("<div class='cartTitle'><h2>Logga in eller skapa konto</h2></div><hr class='productHR'>");
        $(".main").append("<div class='checkOutLeft'></div><div class='checkOutLabels'></div><div class='checkOutInputs'></div>");

        var showLoginButton = "<button class='cartButton' onclick='showLogin()'>Logga in</button>";
        var showCreateAccountButton = "<button class='cartButton' onclick='showCreateAccount()'>Skapa konto</button>";
        $(".checkOutLeft").append(showLoginButton + showCreateAccountButton);
    }
    showLogin = function(){
        var loginBox = "<div class='loginBox'></div>"
        var loginBoxTitle = "<div class='loginBoxTitle'><h2>Logga in</h2></div>"
        var loginBoxLabels = "<div class='loginBoxLabels'><label for='mailaddress'>E-postadress: </label><label for='password'>Lösernord: </label></div>";
        var loginBoxInputs = "<div class='loginBoxInputs'><input name='mailaddress' id='mailaddress' type='text'><input name='password' id='password' type='password'></div>";
        var LoginButton = "<button class='cartButton' onclick='Login()'>Logga in</button>";
                
        $(".main").append(loginBox);
        $(".loginBox").html(loginBoxTitle + loginBoxLabels + loginBoxInputs + LoginButton);
        $(".overlay").show();           
    }

    showCreateAccount = function(){
        var createAccountBox = "<div class='loginBox'></div>"
        var createAccountTitle = "<div class='loginBoxTitle'><h2>Skapa konto</h2></div>"
        var createAccountLabels = "<div class='loginBoxLabels'><label for='mailaddress'>E-postadress: </label></br><label for='name'>Namn: </label></br><label for='address'>Adress: </label></br><label for='postal'>Postnummer: </label></br><label for='phone'>Telefonnummer: </label></br><label for='password'>Lösenord: </label></div>";
        var createAccountInputs = "<div class='loginBoxInputs'><input name='mailaddress' id='mailaddress' type='text'><input name='name' id='name' type='text'><input name='address' id='address' type='text'><input name='postal' id='postal' type='number'><input name='phone' id='phone' type='number'><input name='password' id='password' type='password'></div>";
        var createAccountButton = "<button class='cartButton' onclick='createAccount()'>Skapa Konto</button>";
                
        $(".main").append(createAccountBox);
        $(".loginBox").html(createAccountTitle + createAccountLabels + createAccountInputs + createAccountButton);
        $(".overlay").show();           
    }

    $(".overlay").click(function(){
        $(".overlay").hide();
        $(".loginBox").hide();
    });



}
    
    
    
    
        
});
    
    