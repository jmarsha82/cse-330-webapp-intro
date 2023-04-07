console.log("test");
function CalEvent(title, month, date, year, hour, minute) {
	"use strict";

	//create new event

	this.index = eventCount;
	this.title = title; //string
	this.month = month;
	this.date = date;
	this.year = year;
	this.hour = hour;
	this.minute = minute;

	eventlist.push(this);
    eventCount++;

	this.editEvent  = function(title, month, date, year, hour, minute){
		this.title = title; //string
		this.month = month;
		this.date = date;
		this.year = year;
		this.hour = hour;
		this.minute = minute;
	};

	this.deleteEvent=function(){
		var last = eventlist.length -1;
		var title = eventlist[last].title,
			month = eventlist[last].month,
			date = eventlist[last].date,
			year = eventlist[last].year,
			hour = eventlist[last].hour,
			minute = eventlist[last].minute;
		eventlist[this.index].editEvent(title, month, date, year, hour, minute);

		eventlist.splice(last, 1);

		eventCount--;
	};
}



function displayEvents(events){
	console.log("test");
    var m=currentMonth.month,
       y=currentMonth.year;

    var colorIndex=Math.floor(Math.random()*eventColors.length); //start from random color

    for(var e in events){

       var eventMonth = events[e].month,
          eventYear = events[e].year,
		  eventIndex = events[e].index;

        if(m==eventMonth && y==eventYear){
         //Add the event to calendar
            var eventDate = events[e].date,
               eventTitle = events[e].title;

            //var eventColor = eventColors[colorIndex];
			var eventColor = eventColors[eventIndex % eventColors.length];
            //document.getElementById("day"+eventDate).innerHTML+='<button class="indicator-wrap" data = "'+eventIndex+'" id="event'+eventIndex+'">'+eventTitle+'</button>';
            document.getElementById("day"+eventDate).innerHTML+='<button class="indicator-wrap" id="event'+eventIndex+'" data = "'+eventIndex+'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</button>';
			colorIndex=(colorIndex+1) % eventColors.length; //change color for next event
			
			//console.log(eventIndex);
		}
    }
	
	for(e=0; e<eventlist.length; e++){
		if(m==eventlist[e].month && y==eventlist[e].year){
			document.getElementById("event"+e).onclick = eventClicked;
		}
	}
}

function eventClicked(event){
	//console.log(this);
	currentEvent = event.target.getAttribute("data");
	updateEventPanel();
}

function updateEventPanel(){
	calEvent = eventlist[currentEvent];
	document.getElementById("input-title").value = calEvent.title;
	document.getElementById("input-month").value = calEvent.month + 1;
	document.getElementById("input-year").value = calEvent.year;
	document.getElementById("input-date").value = calEvent.date;
	document.getElementById("input-hour").value = calEvent.hour;
	document.getElementById("input-minute").value = calEvent.minute;
	document.getElementById("edit_event_btn").innerHTML = "Edit Event ";
}

//$("#edit_event_btn").click(addEvent);
function addEvent(){
	var title = document.getElementById("input-title").value;
	var month = document.getElementById("input-month").value - 1;
	var date = document.getElementById("input-date").value;
	var year = document.getElementById("input-year").value;
	var hour = document.getElementById("input-hour").value;
	var minute = document.getElementById("input-minute").value;
	
	var e = new CalEvent(title, month, date, year, hour, minute);
	updateCalendar();
}

function changeEvent(){
	var title = document.getElementById("input-title").value,
		month = document.getElementById("input-month").value - 1,
		date = document.getElementById("input-date").value,
		year = document.getElementById("input-year").value,
		hour = document.getElementById("input-hour").value,
		minute = document.getElementById("input-minute").value;
	eventlist[currentEvent].editEvent(title, month, date, year, hour, minute);
	updateCalendar();
}

function deleteEvent(){
	if(currentEvent>=0){
		eventlist[currentEvent].deleteEvent();
		updateCalendar();
	}
	
}

function cleanForm(){
	currentEvent = -1;
	document.getElementById("input-title").value = "";
	document.getElementById("input-month").value = "";
	document.getElementById("input-year").value = "";
	document.getElementById("input-date").value = "";
	document.getElementById("input-hour").value = "";
	document.getElementById("input-minute").value = "";
	document.getElementById("edit_event_btn").innerHTML = "Add Event ";
}

//main
    var eventlist = [];
	var currentEvent = -1;
    var eventCount = 0;

	//alert(document.getElementById("edit_event_btn"));
	document.getElementById("edit_event_btn").onclick = function(){
		if(currentEvent>=0){
			changeEvent();
		}else{
			addEvent();
		}
		cleanForm();
	};

	document.getElementById("delete_event_btn").onclick = function(){
		deleteEvent();
		cleanForm();
	};

	document.getElementById("reset_event_btn").onclick = function(){
		cleanForm();
	};


    /*
    var e1 = new CalEvent("BDay",9,11,2016,0,0);
    var e3 = new CalEvent("Event 3",8,1,2016,0,0);
    var e4 = new CalEvent("Event 4",10,19,2016,0,0);
    var e5 = new CalEvent("Event 5",11,1,2016,0,0);
    var e2 = new CalEvent("M5 DDL",9,31,2016,0,0);
    */

    for(var i = 0; i <100; i++){
		var title = "Event" + i,
			year = 2016,
			month = Math.floor(Math.random()*12),
			date = Math.floor(Math.random()*28)+1,
		    hour = Math.floor(Math.random()*24),
		    //minute = Math.floor(Math.random()*60);
			minute = i;

		var e = new CalEvent(title, month, date, year, hour, minute);
    }
    //e1.editEvent("BDay1",9,16,2016,0,0);
    //e2.deleteEvent();