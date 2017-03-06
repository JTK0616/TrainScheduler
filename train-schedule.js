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
  var tnextarrival = moment(tfirsttraintime).add(tfrequency);
  var tminutesaway = "";


  // Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    // Grabbed values from text boxes
    tname = $("#train_name").val().trim();
    tdestination = $("#train_destination").val().trim();
    tfirsttraintime = $("#first_train_time").val().trim().moment().format(HHmm);
    tfrequency = $("#train_frequency").val().trim().moment().format(m);

    // Code for handling the push
    database.ref().push({
      name: tname,
      destination: tdestination,
      starttime: tfirsttraintime,
      frequency: tfrequency,
      nextarrival: tnextarrival,
      minutesaway: tminutesaway
    });

  });
  //===================================================
database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().starttime);
    console.log(childSnapshot.val().nextarrival);
    console.log(childSnapshot.val().frequency);
    // console.log(childSnapshot.val().minutesaway);

    // full list of items to the well
    $(".table").append("</span><span id='name'> " + childSnapshot.val().name +
      " </span><span id='destination'> " + childSnapshot.val().destination +
      " </span><span id='frequency'> " + childSnapshot.val().frequency +
      " </span><span id='nextarrival'> " + childSnapshot.val().nextarrival +
      // " </span><span id='billed'> " + childSnapshot.val().minutesaway +
      " </span>");

  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  database.ref().orderByChild("dateAdded").limitToLast(8).on("child_added", function(snapshot) {

// Change the HTML to reflect
    // $("#name").html(lastObj.name);
    // $("#role").html(lastObj.role);
    // $("#start").html(lastObj.startDate);
    // $("#worked").html(lastObj.monthsWorked);
    //  $("#rate").html(lastObj.monthlyRate);
    //   $("#billed").html(lastObj.totalBilled);

  });