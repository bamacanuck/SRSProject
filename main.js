$(document).ready(function() {
  // <script src="Chart.bundle.min.js"></script>

  $('#findIngr').on('click', function(event) {
    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
    // Here we grab the text from the input box
    var ingredient = $('#ingr-input')
      .val()
      .trim();

    var appId = '015a1dc7';
    // "36c66d3a"

    var appKey = '16bab94aee14b5881f28798e788c26e0';
    // "8be8dd8b6a6f98a5221770fcb1d2f043"
    // Here we construct our URL
    var queryURL =
      'https://api.edamam.com/search?q=' +
      ingredient +
      '&app_id=' +
      appId +
      '&app_key=' +
      appKey +
      '&from=0&to=1';
    // https://api.edamam.com/search?app_id=yourappid&app_key=yourappkey&q=butter&diet=low-carb&diet=high-protein

    var retrData;

    function saveLocal(z) {
      console.log(z);
      localStorage.setItem('ourData', JSON.stringify(z));
      localStorage.setItem(
        'carbDataLS',
        JSON.stringify(z.hits[0].recipe.totalDaily.CHOCDF.quantity)
      );
      localStorage.setItem(
        'proDataLS',
        JSON.stringify(z.hits[0].recipe.totalDaily.PROCNT.quantity)
      );
      localStorage.setItem(
        'fatDataLS',
        JSON.stringify(z.hits[0].recipe.totalDaily.FAT.quantity)
      );
      localStorage.setItem(
        'satFatDataLS',
        JSON.stringify(z.hits[0].recipe.totalDaily.FASAT.quantity)
      );
      localStorage.setItem(
        'fiberDataLS',
        JSON.stringify(z.hits[0].recipe.totalDaily.FIBTG.quantity)
      );
      retrData = JSON.parse(localStorage.getItem('ourData'));

      console.log(retrData);

      var recipeName = JSON.stringify(retrData.hits[0].recipe.label);

      var edURL = JSON.stringify(retrData.hits[0].recipe.uri);

      console.log(edURL);

      var exURL = JSON.stringify(retrData.hits[0].recipe.url);

      console.log(exURL);

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

        var carbData = JSON.stringify(
        retrData.hits[0].recipe.totalDaily.CHOCDF.quantity
      );

      console.log(carbData);
      var proData = JSON.stringify(
        retrData.hits[0].recipe.totalDaily.PROCNT.quantity
      );

      var fatData = JSON.stringify(
        retrData.hits[0].recipe.totalDaily.FAT.quantity
      );

      var satFatData = JSON.stringify(
        retrData.hits[0].recipe.totalDaily.FASAT.quantity
      );

      var fiberData = JSON.stringify(
        retrData.hits[0].recipe.totalDaily.FIBTG.quantity
      );

      // for each in [carbData, proData, fatData, fatSatData, fiberData] {
      //   var newDiv = $("<div>");
      //   newDiv.text()
      // }
      $('#thisHere').append('Carbohydrates: ' + carbData);
      $('#thisHere').append('Protein: ' + proData);
      $('#thisHere').append('Total Fat: ' + fatData);
      $('#thisHere').append('Saturated Fat: ' + satFatData);
      $('#thisHere').append('Fiber: ' + fiberData);
    }

    // =====================================================
    // =====================================================
    $.ajax({
      // xhrFields: {cors: false},
      url: queryURL,
      method: 'GET'
    }).done(saveLocal);

    // var retrData = JSON.parse(localStorage.getItem('ourData'));
  });
  var retrCarbData = localStorage.getItem('carbDataLS');
  // console.log(retrCarbData + "THIS");
  var retrProData = localStorage.getItem('proDataLS');
  var retrFatData = localStorage.getItem('fatDataLS');
  var retrSatFatData = localStorage.getItem('satFatDataLS');
  var retrFiberData = localStorage.getItem('fiberDataLS');
  // var nutrUSDA = $("#nutrChart");
  var ctx = document.getElementById('nutrChart').getContext('2d');
  Chart.defaults.global.defaultFontFamily = 'Times';
  Chart.defaults.global.defaultFontColor = 'grey';
  var theChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Carbs', 'Protein', 'Fat', 'Saturated Fat', 'Fiber'],
      // coded as CHOCDF, PROCNT, FAT, FASAT, FIBTG // in our Edamam JSON results
      // Carbohydrates, protein, fat, and fiber
      // are so-called 'macronutrients,'
      // fundamental characteristics of foods,
      // as noted by professional nutritionists,
      // and referenced in the pre-eminent academic
      // nutritional textbook 'Nutrition Now.'
      // They're also often referenced by the
      // National Institutes of Health, as
      // representing the most important
      // nutrient data.
      datasets: [
        {
          label: 'Percentage by Nutrient',
          data: [
            retrCarbData,
            retrProData,
            retrFatData,
            retrSatFatData,
            retrFiberData
          ],
          backgroundColor: ['red', 'blue', 'yellow', 'purple', 'green'],
          borderColor: '#777',
          hoverBorderWidth: 4,
          hoverBorderColor: 'cyan'
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'USDA Recommended Daily Consumption (%)',
        fontSize: 20
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 40,
              stepSize: 10
            }
          }
        ]
      }
    }
  });
});