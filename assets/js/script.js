
/*******************************************************************************
 * Global variables
 ******************************************************************************/
// list of jquery objects referring to the rows
var rowEles = []

var localStorageKey = "schedule"
// local storage values
var rowValues =[];

/*******************************************************************************
 * Initialization
 ******************************************************************************/

// makes it so the time looks good from the first second we load
updateTime()

// makes the app auto update itself
setInterval(() =>{
    updateTime();
},1000)

// add on the rows for the planner
for(var i = 0; i < 24; i++){
    // local storage
    rowValues.push("No Event scheduled");
    addRow(i);
}

// get local storage if it exists
retrieve();


/*******************************************************************************
 * Functions
 ******************************************************************************/

/**
 * A function to update our time header
 */
function updateTime(){
    $("#currentDay").text("The current time is: " + moment().format("dddd, MMMM Do H:mm:ss"))
}

/**
 * Adds a row to the bottom of the work day scheduler
 * @param {number} time the hour we are adding
 */
function addRow(time){
    var row = $("<div></div>");
    rowEles.push(row); // add it to our global variable
    
    // basic classes they all have
    row.addClass("row text-light");

    row.prop("id", "Row-" + time);

    // reference for current hour
    var currHour = moment().hour();
    // if this is in the past make the background color gray
    if (time < currHour){
        row.addClass("bg-secondary");
    }

    // if it's in the future make the backgorund color green
    if (time > currHour){
        row.addClass("bg-success");
    }

    if (time == currHour){
        row.addClass("bg-primary")
    }

    // the time element on the left
    var timeEle = $("<div>" + time + "H</div>")
    timeEle.addClass("d-flex justify-content-start align-items-center col-3");
    row.append(timeEle);

    var taskEle = $("<textarea rows='3'></textarea>");
    taskEle.prop("id", "Row-" + time + "-task");
    taskEle.addClass("d-flex justify-content-center align-items-center col-8 bg-light");
    row.append(taskEle);
    
    // TODO set up correctly
    taskEle.val("Click here to edit your task");

    var saveEle = $("<div></div>");
    saveEle.addClass("d-flex justify-content-end align-items-center col-1");
    var saveButton = $("<button class='btn'>💾</button>");
    // save button click
    saveButton.on("click", () =>{
        rowValues[time] = taskEle.val();
        store();
    });
    saveEle.append(saveButton);
    row.append(saveEle);

    $("#time-block-container").append(row);
}

/**
 * Sends information to local storage
 */
function store(){
    localStorage.setItem(localStorageKey, JSON.stringify(rowValues));
}

/**
 * Retrieves information from local stroage and sends it to appropriate 
 * variables. If no local storage exists it creates it
 */
function retrieve(){
    console.log("retrieving...");
    var eventsStr = localStorage.getItem(localStorageKey);
    // if we don't have an events string we need to store it for later use.
    if (!eventsStr){
        store();
    } else{
        rowValues = JSON.parse(eventsStr);
    }
    console.log("retrieved:" + eventsStr);
    updateRows();
}

// updates all the rows on the DOM
function updateRows(){
    console.log("updating rows:");
    for(var i = 0; i < rowValues.length; i++){
        console.log("Updating row " + i + " with value: " + rowValues[i]);
        $("#Row-" + i + "-task").val(rowValues[i]);
    }
}