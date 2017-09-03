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
    
      $("#sub").on("click", function(){
        event.preventDefault();
    
        // Set form values to variables
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = moment($("#trainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequencyInput").val().trim();
    
        // Set form variable to trainInfo in order to push to Firebase
        var trainInfo = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
        };
    
        // pushing trainInfo to Firebase
        database.ref().push(trainInfo);
    
        console.log(trainInfo.name);
        console.log(trainInfo.destination); 
        console.log(firstTrain);
        console.log(trainInfo.frequency)
        
       // Alert
        alert("New train successfully added");
    
        // clear text-boxes
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainInput").val("");
        $("#frequencyInput").val("");
    
        // stop refresh
    
        return false;
      });
    
    
      
      database.ref(). on("child_added", function(childSnapshot, prevChildKey){
    
        console.log(childSnapshot.val());
    
        // assign firebase variables to snapshots.
        var fireName = childSnapshot.val().name;
        var fireDestination = childSnapshot.val().destination;
        var fireFrequency = childSnapshot.val().frequency;
        var fireFirstTrain = childSnapshot.val().firstTrain;
    
        
        var differenceTimes = moment().diff(moment.unix(fireFirstTrain), "minutes");
        var remainder = moment().diff(moment.unix(fireFirstTrain), "minutes") % fireFrequency ;
        var minutes = fireFrequency - remainder;
    
        var arrival = moment().add(minutes, "m").format("hh:mm A"); 
        console.log(minutes);
        console.log(arrival);
    
        console.log(moment().format("hh:mm A"));
        console.log(arrival);
        console.log(moment().format("X"));
    
        // Append train data to table 
        $("#trainSchedule > tbody").append("<tr><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
    
      });
    
    