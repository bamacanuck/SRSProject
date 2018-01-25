$(document).ready(function() {

          var config = {
          apiKey: "AIzaSyC8tE8l_DBoyPfFaiRc5fYfZ6jBK9XrcSs",
          authDomain: "groupproject-1b84f.firebaseapp.com",
          databaseURL: "https://groupproject-1b84f.firebaseio.com",
          projectId: "groupproject-1b84f",
          storageBucket: "",
          messagingSenderId: "208222818748"
        };
        firebase.initializeApp(config);

        var database = firebase.database();

        // Capture Button Click
        $("#fa fa-heart fa-stack-1x").on("click", function(event) {
          event.preventDefault();
          var recipeName = JSON.stringify(retrData.hits[0].recipe.label);
          var exURL = JSON.stringify(retrData.hits[0].recipe.url);
          var favorites = {
            url: exURL,
            recipe: recipeName,
          };
          // Code for handling the push
          database.ref().push(favorites
          );
          console.log(favorites.url);
          console.log(favorites.recipe);

        });

        database.ref().on("child_added", function(childSnapshot, prevChildKey) {

          console.log(childSnapshot.val());

          var favoriteURL = childSnapshot.val().url;
          var favoriteRecipe = childSnapshot.val().recipe;

          console.log(favoriteURL);
          console.log(favoriteRecipe);


          $("#favoritesDiv").append(favoriteRecipe);
          $("#favoritesDiv").append(favoriteURL);
        });
      });