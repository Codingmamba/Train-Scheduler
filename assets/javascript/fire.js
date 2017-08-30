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
trainName = $("#train-name").val().trim();
destination = $("#dest").val().trim();
freq = $("#freq").val().trim();
nxtArrival = $("#next-arrival").val().trim();
minAway = $("#min-away").val().trim();

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
    $("#train-name").val("");
    $("#dest").val("");
    $("#freq").val("");
    $("#next-arrival").val("");
    $("#min-away").val("");

  }); //click function
  
  database.ref().limitToLast(1).on("child_added", function(snapshot) {

    console.log(childSnapshot.val());

      // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var nxtArrival = childSnapshot.val().nxtArrival;
  var freq = childSnapshot.val().freq;  

   // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(nxtArrival);
    console.log(freq);

    $("#train-table > thread").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    nxtArrival + "</td><td>" + freq + "</td><td>");

    // + empRate + "</td><td>" + empBilled + "</td></tr>"

  });