//DinnerModel Object constructor
var DinnerModel = function() {


  //PART 1
  //initial value
  var guestNumber = 3;
  var menu = [];
  var parent = this;
  this.addMenu=[];


  //PART 2
  //implement observe
  var observers = [];
  this.addObserver = function(observer) {
    observers.push(observer);
  }

  var notifyObservers = function(change) {
    for(var i=0; i< observers.length; i++) {
      observers[i].update(change);
    }
  }


  //PART 3
  //functions used in all views
  this.setNumberOfGuests = function(num) {
    guestNumber = num;
    notifyObservers("numberOfGuests");

  }

  this.getNumberOfGuests = function() {
    return guestNumber;
  }

  //Returns the dish that is on the menu for selected type
  this.getSelectedDish = function(type) {
    var typemenu = [];
    for(var i=0; i<dishes.length; i++){  //=for(i in dishes)
      if(dishes[i].type == type){
        typemenu.push(dishes[i]);
      }
    }
    return typemenu;
    notifyObservers();
  }

  //Returns all the dishes on the menu.

  this.getFullMenu = function() {
    return this.addMenu;
    notifyObservers();
  }



  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    var menudishes = this.getFullMenu;
    var ingredients = [];
    for (key in menudishes) {
      ingredients[i] = dishes[i].ingredients;
    }
    return ingredients;
    notifyObservers();
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var totalPrice = 0;
    var menudishes = this.getFullMenu;
    for (key in menudishes){
      for (var i=0; i<menudishes[key].ingredients.length;i++){
        totalPrice = totalPrice + menu[key].ingredients[i].price * guestNumber;
      }
    }
    return totalPrice;
    notifyObservers();
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.

  var currentDish = null;

  this.addDishToMenu = function(id) {

    var state=true;
    for (var i = 0; i < this.addMenu.length; i++) {
      if (id==this.addMenu[i].id) {
        state=false;
      }
    }
    if (state) {
      this.addMenu.push(currentDish);
    }
    notifyObservers("menu");

  }



  //Removes dish from menu
  this.removeDishFromMenu = function(iditem) {
    for(key in dishes){
      if(dishes[key].id == iditem) {
        menu.pop(dishes[key].id);
      }
    }
    notifyObservers("menu");
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned


  this.getAllDishes = function (type, callback, errorCallback) {

    var searchBasicUrl='https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=12&offset=0&query=burger&type='
    var searchtypeUrl=String(type);
    $.ajax( {
      url: searchBasicUrl+searchtypeUrl,
      headers: {
        'X-Mashape-Key': "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB"
      },
      // type:'get',
      success: function(data) {
        callback(data)
      },
      error: function(error) {
        errorCallback(error)
      }
    })}



    this.getDish = function (id, callback, errorCallback) {
      $.ajax( {
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id+"/information",
        headers: {
          'X-Mashape-Key': "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB"
        },
        // type:'get',
        success: function(data) {
          currentDish = data;
          callback(data)
        },
        error: function(error) {
          errorCallback(error)
        }
      })}

      // the dishes variable contains an array of all the
      // dishes in the database. each dish has id, name, type,
      // image (name of the image file), description and
      // array of ingredients. Each ingredient has name,
      // quantity (a number), price (a number) and unit (string
      // defining the unit i.e. "g", "slices", "ml". Unit
      // can sometimes be empty like in the example of eggs where
      // you just say "5 eggs" and not "5 pieces of eggs" or anything else.
      var dishes = [{
        'id':1,
        'name':'French toast',
        'type':'starter',
        'image':'toast.jpg',
        'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
        'ingredients':[{
          'name':'eggs',
          'quantity':0.5,
          'unit':'c',
          'price':10
        },{
          'name':'milk',
          'quantity':30,
          'unit':'ml',
          'price':6
        },{
          'name':'brown sugar',
          'quantity':7,
          'unit':'g',
          'price':1
        },{
          'name':'ground nutmeg',
          'quantity':0.5,
          'unit':'g',
          'price':12
        },{
          'name':'white bread',
          'quantity':2,
          'unit':'slices',
          'price':2
        }]
      },{
        'id':2,
        'name':'Sourdough Starter',
        'type':'starter',
        'image':'sourdough.jpg',
        'description':"Here is how you make it... Lore ipsum...",
        'ingredients':[{
          'name':'active dry yeast',
          'quantity':0.5,
          'unit':'g',
          'price':4
        },{
          'name':'warm water',
          'quantity':30,
          'unit':'ml',
          'price':0
        },{
          'name':'all-purpose flour',
          'quantity':15,
          'unit':'g',
          'price':2
        }]
      },{
        'id':3,
        'name':'Baked Brie with Peaches',
        'type':'starter',
        'image':'bakedbrie.jpg',
        'description':"Here is how you make it... Lore ipsum...",
        'ingredients':[{
          'name':'round Brie cheese',
          'quantity':10,
          'unit':'g',
          'price':8
        },{
          'name':'raspberry preserves',
          'quantity':15,
          'unit':'g',
          'price':10
        },{
          'name':'peaches',
          'quantity':1,
          'unit':'',
          'price':4
        }]
      },{
        'id':100,
        'name':'Meat balls',
        'type':'main dish',
        'image':'meatballs.jpg',
        'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
        'ingredients':[{
          'name':'extra lean ground beef',
          'quantity':115,
          'unit':'g',
          'price':20
        },{
          'name':'sea salt',
          'quantity':0.7,
          'unit':'g',
          'price':3
        },{
          'name':'small onion, diced',
          'quantity':0.25,
          'unit':'',
          'price':2
        },{
          'name':'garlic salt',
          'quantity':0.7,
          'unit':'g',
          'price':2
        },{
          'name':'Italian seasoning',
          'quantity':0.6,
          'unit':'g',
          'price':3
        },{
          'name':'dried oregano',
          'quantity':0.3,
          'unit':'g',
          'price':3
        },{
          'name':'crushed red pepper flakes',
          'quantity':0.6,
          'unit':'g',
          'price':3
        },{
          'name':'Worcestershire sauce',
          'quantity':6,
          'unit':'ml',
          'price':7
        },{
          'name':'milk',
          'quantity':20,
          'unit':'ml',
          'price':4
        },{
          'name':'grated Parmesan cheese',
          'quantity':5,
          'unit':'g',
          'price':8
        },{
          'name':'seasoned bread crumbs',
          'quantity':15,
          'unit':'g',
          'price':4
        }]
      },{
        'id':101,
        'name':'MD 2',
        'type':'main dish',
        'image':'bakedbrie.jpg',
        'description':"Here is how you make it... Lore ipsum...",
        'ingredients':[{
          'name':'ingredient 1',
          'quantity':1,
          'unit':'pieces',
          'price':8
        },{
          'name':'ingredient 2',
          'quantity':15,
          'unit':'g',
          'price':7
        },{
          'name':'ingredient 3',
          'quantity':10,
          'unit':'ml',
          'price':4
        }]
      },{
        'id':102,
        'name':'MD 3',
        'type':'main dish',
        'image':'meatballs.jpg',
        'description':"Here is how you make it... Lore ipsum...",
        'ingredients':[{
          'name':'ingredient 1',
          'quantity':2,
          'unit':'pieces',
          'price':8
        },{
          'name':'ingredient 2',
          'quantity':10,
          'unit':'g',
          'price':7
        },{
          'name':'ingredient 3',
          'quantity':5,
          'unit':'ml',
          'price':4
        }]
      },{
        'id':103,
        'name':'MD 4',
        'type':'main dish',
        'image':'meatballs.jpg',
        'description':"Here is how you make it... Lore ipsum...",
        'ingredients':[{
          'name':'ingredient 1',
          'quantity':1,
          'unit':'pieces',
          'price':4
        },{
          'name':'ingredient 2',
          'quantity':12,
          'unit':'g',
          'price':7
        },{
          'name':'ingredient 3',
          'quantity':6,
          'unit':'ml',
          'price':4
        }]
      },{
        'id':200,
        'name':'Chocolat Ice cream',
        'type':'dessert',
        'image':'icecream.jpg',
        'description':"Here is how you make it... Lore ipsum...",
        'ingredients':[{
          'name':'ice cream',
          'quantity':100,
          'unit':'ml',
          'price':6
        }]
      },{
        'id':201,
        'name':'Vanilla Ice cream',
        'type':'dessert',
        'image':'icecream.jpg',
        'description':"Here is how you make it... Lore ipsum...",
        'ingredients':[{
          'name':'ice cream',
          'quantity':100,
          'unit':'ml',
          'price':6
        }]
      },{
        'id':202,
        'name':'Strawberry',
        'type':'dessert',
        'image':'icecream.jpg',
        'description':"Here is how you make it... Lore ipsum...",
        'ingredients':[{
          'name':'ice cream',
          'quantity':100,
          'unit':'ml',
          'price':6
        }]
      }
    ];

  }
