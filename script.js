$(document).ready(function(){
var mainCatList;
var shoppingCart = [];
var newUser = [];


//kollar om sessionstorage finns för shoppingcart, annars skapas det.
if (sessionStorage.shoppingCart == null){
    var json_str = JSON.stringify(shoppingCart);
    sessionStorage.shoppingCart = json_str; 
}
var parseCart = JSON.parse(sessionStorage.shoppingCart);

//kollar om något redan ligger i carten, isåfall visa hur många
if(parseCart.length != 0){
    $(".cartLink").css("background-image", "url(img/cartFull.png)");
    $(".cartCounter").html(parseCart.length);
    var json_str = JSON.stringify(parseCart);
    sessionStorage.shoppingCart = json_str; 
    }

//kollar om localstorage finns för user, annars skapas det.
if (localStorage.newUser == null){
    var json_str = JSON.stringify(newUser);
    localStorage.newUser = json_str;  
    }
var parseNewUser = JSON.parse(localStorage.newUser);
            
for(i = 0; i < parseNewUser.length; i++){
    console.log(parseNewUser[i][0]);  
    
}

if (sessionStorage.getItem("userId"))  {
    $(".loggedInName").html(sessionStorage.getItem("userId"));                                   
}
  

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
        
    $(".cartLink").hover(function(){
        $(".cartLink").css("background-image", "url(img/cartHover.png)");
        $(this).css('cursor','pointer');
    }, function() {
        var parseCart = JSON.parse(sessionStorage.shoppingCart);
        
        if (
            parseCart.length != 0){$(".cartLink").css("background-image", "url(img/cartFull.png)");
        }
        else{
            $(".cartLink").css("background-image", "url(img/cart.png)");
        }  
        var json_str = JSON.stringify(parseCart);
        sessionStorage.shoppingCart = json_str
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
        
        var parseCart = JSON.parse(sessionStorage.shoppingCart);

        parseCart.push(productList[i-1]);

        $(".cartCounter").html(parseCart.length);
        $(".cartLink").css("background-image", "url(img/cartFull.png)");

        var json_str = JSON.stringify(parseCart);
        sessionStorage.shoppingCart = json_str; 

    }

    showCart = function(){
        $(".main").html("<div class='cartTitle'><h2>Kundvagn</h2></div><hr class='productHR'>");

        var parseCart = JSON.parse(sessionStorage.shoppingCart);

        var priceTotal = 55;
        for(var i = 0; i < parseCart.length; i++) {
            priceTotal += parseCart[i].prodPrice;
        }
        $(".cartTitle").append("<h3>Totalpris: " + priceTotal + " kr</h3>");


      
        
        var cartListProdName = "<ul class='cartListProdName'>";
        var cartListProdPrice = "<ul>";
        var cartListRemove = "<ul class='cartListRemove'>";

        for(var i = 0; i < parseCart.length; i++){
            cartListProdName += "<li>" + parseCart[i].prodName + "</li>";
            cartListProdPrice += "<li>" + parseCart[i].prodPrice + " kr</li>";
            cartListRemove += "<li><a href='#' onClick='delCartItem(" + i + ")'>Ta bort</a></li>";
        }
        var json_str = JSON.stringify(parseCart);
        sessionStorage.shoppingCart = json_str; 

        cartListProdName += "<li>Frakt</li></ul>";
        cartListProdPrice += "<li>55 kr</li></ul>";
        cartListRemove += "</ul>";
       
        
    
        $(".main").append("<div class='cartList'></div><div class='cartSummary'></div>");
        $(".cartList").append(cartListProdName + cartListProdPrice + cartListRemove);

        var checkOutButton = "<button class='cartButton' onclick='checkOut()'>Köp</button>";
        var showLoginButton = "<button class='cartButton' id='showLoginButton' onclick='showLogin()'>Logga in</button>";
        var showCreateAccountButton = "<button class='cartButton' id='showCreateAccountButton' onclick='showCreateAccount()'>Skapa konto</button>";
        $(".cartSummary").append(checkOutButton)  
        
        if (!sessionStorage.getItem("userId"))  {
            $(".cartSummary").append(showLoginButton + showCreateAccountButton);                        
        }
      
    }
    delCartItem = function(i){
        var parseCart = JSON.parse(sessionStorage.shoppingCart);

        parseCart.splice(i, 1);

        var json_str = JSON.stringify(parseCart);
        sessionStorage.shoppingCart = json_str; 

        showCart();
        $(".cartCounter").html(parseCart.length);
        if (parseCart.length <= 0){
            $(".cartLink").css("background-image", "url(img/cart.png)");
        }
        

    }

    checkOut = function(){
        //var json_str = JSON.stringify(shoppingCart);
        //sessionStorage.shoppingCart = json_str;  

        $(".main").html("<div class='cartTitle'><h2>Tack för ditt köp!</h2></div><hr class='productHR'>");
        console.log(sessionStorage.shoppingCart);
    }

    showLogin = function(){
        var loginBox = "<div class='popupBox'></div>"
        var loginBoxTitle = "<div class='popupBoxTitle'><h2>Logga in</h2></div>"
        var loginBoxLabels = "<div class='popupBoxLabels'><label for='loginMail'>E-postadress: </label><label for='loginPassword'>Lösernord: </label></div>";
        var loginBoxInputs = "<div class='popupBoxInputs'><input name='loginMail' id='loginMail' type='text'><input name='loginPassword' id='loginPassword' type='password'></div>";
        var LoginButton = "<button class='cartButton' onclick='Login()'>Logga in</button>";
                
        $(".main").append(loginBox);
        $(".popupBox").html(loginBoxTitle + loginBoxLabels + loginBoxInputs + LoginButton);
        $(".overlay").show();         
        
        Login = function(){
            var parseNewUser = JSON.parse(localStorage.newUser);
            
            for(i = 0; i < parseNewUser.length; i++){
                if (loginMail.value == parseNewUser[i][0] && loginPassword.value == parseNewUser[i][5]){
                    $(".popupBoxTitle").html("<h2>Logga in </h2> Välkommen " + parseNewUser[i][1]);

                    sessionStorage.setItem("userId", parseNewUser[i][1]);
                    console.log(sessionStorage.getItem("userId"));
                    $(".loggedInName").html(sessionStorage.getItem("userId"));  
                    $("#showLoginButton").hide();
                    $("#showCreateAccountButton").hide();
                } 
                else{
                    $(".popupBoxTitle").html("<h2>Logga in</h2> Något gick fel, försök igen");
                }
                var json_str = JSON.stringify(parseNewUser);
                localStorage.newUser = json_str;
            }
        }
    }

    showCreateAccount = function(){
        var createAccountBox = "<div class='popupBox'></div>"
        var createAccountTitle = "<div class='popupBoxTitle'><h2>Skapa konto </h2></div>"
        var createAccountLabels = "<div class='popupBoxLabels'><label for='mail'>E-postadress: </label></br><label for='name'>Namn: </label></br><label for='address'>Adress: </label></br><label for='postal'>Postnummer: </label></br><label for='phone'>Telefonnummer: </label></br><label for='password'>Lösenord: </label></div>";
        var createAccountInputs = "<div class='popupBoxInputs'><input name='mail' id='mail' type='text'><input name='fullName' id='fullName' type='text'><input name='address' id='address' type='text'><input name='postal' id='postal' type='number'><input name='phone' id='phone' type='number'><input name='password' id='password' type='password'></div>";
        var createAccountButton = "<button class='cartButton' onclick='createAccount()'>Skapa Konto</button>";
                
        $(".main").append(createAccountBox);
        $(".popupBox").html(createAccountTitle + createAccountLabels + createAccountInputs + createAccountButton);
        $(".overlay").show();          
        
        createAccount = function(){
            if (mail.value.length == 0 || fullName.value.length == 0 || address.value.length == 0 || postal.value.length == 0 || phone.value.length == 0){
               $(".popupBoxTitle").html("<h2>Skapa konto </h2> Något blev fel, försök igen");
            }
            else{
                var parseNewUser = JSON.parse(localStorage.newUser);

                parseNewUser.push([mail.value, fullName.value, address.value, postal.value, phone.value, password.value]);
                    
                var json_str = JSON.stringify(parseNewUser);
                localStorage.newUser = json_str;  

                $(".popupBoxTitle").html("<h2>Skapa konto </h2> Kontot är skapat");
            }
             
           
        }
    }

    $(".overlay").click(function(){
        $(".overlay").hide();
        $(".popupBox").hide();

        
    
        


    });
    





}
    
    
    
    
        
});
    
    