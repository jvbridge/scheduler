
/*******************************************************************************
 * Global variables
 ******************************************************************************/
var rows = []

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
    $("#currentDay").text("The current time is: " + moment().format("dddd, MMMM do H:mm:ss"))
}

/**
 * Adds a row to the bottom of the work day scheduler
 * @param {number} time the hour we are adding
 */
function addRow(time){
    var row = $("<div></div>");
    rows.push(row); // add it to our global variable
    
    // it's a row
    row.addClass("row")
    // white text on a colored background
    row.addClass("text-light");

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

    

    $("#time-block-container").append(row);
}