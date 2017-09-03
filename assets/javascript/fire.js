  // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAsnuQVWxYc3egzGXa5uHEdYKjZ2U0R4_I",
    authDomain: "train-scheduler-ad91a.firebaseapp.com",
    databaseURL: "https://train-scheduler-ad91a.firebaseio.com",
    projectId: "train-scheduler-ad91a",
    storageBucket: "",
    messagingSenderId: "840354281515"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var freq = 0;
  var nxtArrival = "";
  var minAway = 0;

 $("#sub").on("click", function(event) {
    event.preventDefault();

// Grabs user input
trainName = $("#train-name-input").val().trim();
destination = $("#dest-input").val().trim();
freq = $("#freq-input").val().trim();
nxtArrival = $("#next-arrival-input").val().trim();
minAway = $("#min-away-input").val().trim();

// Object holds employees data
var newTrain = {
    TrainName: trainName,
    Destination: destination,
    TrainTime: nxtArrival,
    Frequency: freq,
    dataAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

   // Logs everything to console
   console.log(newTrain.trainName);
   console.log(newTrain.destination);
   console.log(newTrain.nxtArrival);
   console.log(newTrain.freq);

   // Alert
  alert("New train successfully added");

  // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#freq-input").val("");
    $("#next-arrival-input").val("");
    $("#min-away-input").val("");

      return false;

  }); //click function
  
  database.ref().limitToLast(1).on("child_added", function(snapshot) {

    console.log(childSnapshot.val());

      // Store everything into a variable.
  var fireName = childSnapshot.val().trainName;
  var fireDestination = childSnapshot.val().destination;
  var fireFrequency  = childSnapshot.val().freq;
  var fireFirstTrain = childSnapshot.val().nxtArrival;  

   // Employee Info
    console.log(fireName);
    console.log(fireDestination);
    console.log(fireFirstTrain);
    console.log(fireFrequency);

    // Append train data to the table
    $("#train-table > tbody").append("<tr><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" +
    fireFrequency + "</td><td>" + fireFirstTrain + "</td><tr>");

  });