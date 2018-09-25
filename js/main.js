// Step 1: Initialize Firebase
  var config = {
    apiKey: "AIzaSyBRXwXrwgA3TVD-mu31IKhTz1vcWzfJ1QA",
    authDomain: "reservation-site-36555.firebaseapp.com",
    databaseURL: "https://reservation-site-36555.firebaseio.com",
    projectId: "reservation-site-36555",
    storageBucket: "reservation-site-36555.appspot.com",
    messagingSenderId: "176351849191"
  };

  firebase.initializeApp(config);

  // Connect Firebase Database
  var database = firebase.database();

// Step 2: Empty object literal notation named 'reservationData'
var reservationData = {};

// Step 3: Add a click event to each of your reservation options, ‘.reservation-day li’
$('.reservation-day li').click(function() {

  // Define a property ‘day’ on your ‘reservationData’ object, which will have the value of the clicked element's text
  reservationData.day = $(this).text();

});

// Step 4: Update the ‘name’ property of the ‘reservationData’ object when the user submits the form
  // Add an event listener for when the user submits the form
  $('.reservations').on('submit', function(e) {

    // Prevent the default action for a form submit so that the page won't refresh
    e.preventDefault();

    // Add the name the user entered to the ‘reservationData’ object
    reservationData.name = $('.reservation-name').val();

// Step 5: Post, or send, this reservation information in our Firebase database
    // Create a section for reservations data in your database and POST your ‘reservationData’ object to your Firebase database using Firebase's push() method
    database.ref('reservations').push(reservationData);

  });


// Step 6: With the initial load of application and with the addition of each reservation, update the view using Handlebars
  // Create a function ‘getReservations’ after the form-submit event
  function getReservations() {

    // Listen for any changes to the Firebase database using either the ‘value’ or ‘child_added’ event
    database.ref('reservations').on('child_added', function(snapshot) {

      // Save snapshot to var reservations
      var reservations = snapshot.val();

      // HandleBars:
        // Get template souce from html
        var source   = $("#reservation-template").html();
        // Compile
        var template = Handlebars.compile(source);
        // Pass data
        var reservationTemplate = template(reservations);
        // Append data to element
        $('.reservation-list').append(reservationTemplate);
    });

  }

getReservations();

// Step 7: Define the callback used by the Google Maps API to initialize the app's map
function initMap() {

// Step 8: Use the Google Maps’ Map constructor to create a map
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false
  });

// Step 9: Use the Marker constructor to add a marker to map
  var marker = new google.maps.Marker( {
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
  });
}









