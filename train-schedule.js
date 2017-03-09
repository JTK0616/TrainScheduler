var config = {
    apiKey: "AIzaSyDflGS5M1ng4KI4T4OWuUHwPsfg0-Uj9P0",
    authDomain: "trainschedule-88f58.firebaseapp.com",
    databaseURL: "https://trainschedule-88f58.firebaseio.com",
    storageBucket: "trainschedule-88f58.appspot.com",
    messagingSenderId: "175612653985"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var tname = "";
  var tdestination = "";
  var tfirsttraintime = "";
  var tfrequency = "";
  // var tnextarrival = moment(tfirsttraintime).add(tfrequency);
  var tminutesaway = "";

   // First Time Converted (pushed back 1 year to make sure it comes before current time)

   var firstTimeConverted = moment(tfirsttraintime, "hh:mm").subtract(1, "years");
   console.log(firstTimeConverted);
   
   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();

  // Grab values from text boxes
    tname = $("#train_name").val().trim();
    tdestination = $("#train_destination").val().trim();
    tfirsttraintime = $("#first_train_time").val().trim();
    tfrequency = $("#train_frequency").val().trim();

    // Code for handling the push
    database.ref().push({
      name: tname,
      destination: tdestination,
      starttime: tfirsttraintime,
      frequency: tfrequency,
      // nextarrival: tnextarrival,
      minutesaway: tminutesaway
    });

  });
  //===================================================
database.ref().on("child_added", function(childSnapshot) {
    var snapshotvalues = childSnapshot.val();

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().starttime);
    console.log(childSnapshot.val().nextarrival);
    console.log(childSnapshot.val().frequency);
    // console.log(childSnapshot.val().minutesaway);

    // Creating an array of each key in the snapshot object

    var SVA = Object.keys(snapshotvalues);
    console.log("SVA");
    console.log(SVA);

    // Finding the last user's key
     var lastIndex = SVA.length - 1;
     var lastKey = SVA[lastIndex];

     // Using the last user's key to access the last added user object
     var lastObj = snapshotvalues[lastKey]

     // Console.logging the last user's data
     console.log(lastObj.destination);
     console.log(lastObj.frequency);
     console.log(lastObj.nextArrival);
     console.log(lastObj.minutes);


    // Display data in the table on the HTML page
    // $(".table").append("</span><span id='name'> " + childSnapshot.val().name +
    //   " </span><span id='destination'> " + childSnapshot.val().destination +
    //   " </span><span id='frequency'> " + childSnapshot.val().frequency +
    //   " </span><span id='nextarrival'> " + childSnapshot.val().nextarrival +
    //   // " </span><span id='billed'> " + childSnapshot.val().minutesaway +
    //   " </span>");

  //   $("#name").append(childSnapshot.val().name);
  //   $("#destination").append(childSnapshot.val().destination);

  // // Handle the errors
  // }, function(errorObject) {
  //   console.log("Errors handled: " + errorObject.code);
  // });

//   database.ref().orderByChild("dateAdded").limitToLast(8).on("train_added", function(snapshot) {

// Change the HTML to reflect
//     $("#name").html(lastObj.tname);
//     $("#destination").html(lastObj.tdestination);
//     $("#frequency").html(lastObj.tfrequecy);
//     $("#nextarrival").html(lastObj.tnextarrival);
//     $("#minutesaway").html(lastObj.tminutesaway);

//   });

});



