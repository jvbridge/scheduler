
/*******************************************************************************
 * Global variables
 ******************************************************************************/
var rowEles = []
var rowValues =[];

// makes it so the time looks good from the first second we load
updateTime()

// makes the app auto update itself
setInterval(() =>{
    updateTime();
},1000)

// add on the rows for the planner
for(var i = 0; i < 24; i++){
    addRow(i);
}

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
    var row = $("<tr></tr>");
    rowEles.push(row); // add it to our global variable
    
    // basic classes they all have
    row.addClass("row text-light");

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

    var taskEle = $(" <textarea id=\"exampleFormControlTextarea1\" rows=\"3\"></textarea>");
    taskEle.addClass("d-flex justify-content-center align-items-center col-6 bg-light");
    row.append(taskEle);
    
    taskEle.val("Click here to edit your task");

    var saveEle = $("<div>💾</div>");
    saveEle.addClass("d-flex justify-content-end align-items-center col-3");
    row.append(saveEle);

    $("#time-block-container").append(row);
}