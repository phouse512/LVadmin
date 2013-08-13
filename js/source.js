var sortOption = 0;
var eventID;

function displayModalEvents(){
      $.ajax({
            url: 'script/eventListModal.php',
            type: 'GET',
            success: function(data, textStatus, xhr){
                  var events = data.getElementsByTagName("event");
                  var modalHTML = '<table class ="table table-hover"> <thead> <tr> <th>#</th><th>Event</th><th>Date</th></tr></thead><tbody id="selectEvent">';
                  var current = 0;
                  
                  for(var i=0;i<events.length; i++){
                        event_ID = events[i].getElementsByTagName("event_id")[0].textContent;
                        name = events[i].getElementsByTagName("event_name")[0].textContent;
                        date = events[i].getElementsByTagName("event_date")[0].textContent;
                        current = i+1;
                        modalHTML += '<tr id="' + event_ID + '"><td>' + current + '</td><td>' + name + '</td><td>' + date + '</td></tr>';
                  }

                  modalHTML += '</tbody></table>';

                  $('#eventModalBody').html(modalHTML);

                  $("#selectEvent").delegate("tr", "click", function(){
                        if ($(this).children(".selectedEvent")[0]) {
                              $(".selectedEvent").removeClass('selectedEvent');
                              $(".hasRowSpan").removeClass('hasRowSpan');   
                        } else if ($(".selectedEvent")[0]){
                              $(".selectedEvent").removeClass('selectedEvent');
                              $(this).children().addClass('selectedEvent');
                              $(this).addClass('selectedEvent');
                              $(".hasRowSpan").removeClass('hasRowSpan');
                              $(this).children().addClass('hasRowSpan');
                        } else {
                              $(this).children().addClass('selectedEvent');
                              $(this).addClass('selectedEvent');
                              $(this).children().addClass('hasRowSpan');
                        }
                  });
            },
            error: function(xhr, textStatus, errorThrown){
                  alert(textStatus);
            }
      });
}

function getAttendanceData(eventID){
      $.ajax({
            url: 'script/returnAttendance.php',
            type: 'POST',
            async: false,
            data: ({eventID: eventID}),
            success: function(data, textStatus, xhr){
				  console.log(data);
                  displayEventHeader(data);
                  displayAttendance(data);
            },
            error: function(xhr, textStatus, errorThrown){
                  alert(textStatus);
            } 
      });
}

function selectEvent(){
      $('#eventTable').fadeOut("slow");
      var eventID = $("tr.selectedEvent").attr("id");
      getAttendanceData(eventID);
      $('#eventModal').modal('toggle');
      $('#eventTable').fadeIn("slow");
}

function displayEventHeader(xmlInfo){
	
      var eventName = xmlInfo.getElementsByTagName("event_name")[0].textContent;
      var eventDate = xmlInfo.getElementsByTagName("event_date")[0].textContent;
      var eventID = xmlInfo.getElementsByTagName("event_id")[0].textContent;

      header = $("#eventHeader");
      heading = eventName + " " + eventDate;
      $(header).attr("id", eventID);

      $(header).html(heading);
}

function displayAttendance(xmlInfo){
      var users = xmlInfo.getElementsByTagName("user");
      table = $("#eventTable");
      tableContent = "";

      for (var i=0;i<users.length; i++){
            firstName = users[i].getElementsByTagName("first_name")[0].textContent;
            lastName = users[i].getElementsByTagName("last_name")[0].textContent;
            year = users[i].getElementsByTagName("year")[0].textContent;
            email = users[i].getElementsByTagName("email")[0].textContent;
            dorm = users[i].getElementsByTagName("dorm")[0].textContent;

            tableContent += "<tr><td>" + i + "</td><td>" + lastName + "</td><td>" + firstName + "</td><td>" + year + "</td><td>" + email + "</td><td>" + dorm + "</td></tr>";
      }
      $(table).html(tableContent);
}

function setLogout(){
      $.ajax({
            url: 'script/getUser.php',
            type: 'GET',
            async: false,
            success: function(data, textStatus, xhr){
                  var logout = "Log out - " + data;
                  $("#logoutButton").html(logout);
            },
            error: function(xhr, textStatus, errorThrown){
                  alert(textStatus);
            } 
      });
}


function logout(){
      $.ajax({
            url: 'script/logoutUser.php',
            type: 'GET',
            success: function(data, textStatus, xhr){
                  if (data == "destroyed"){
                        window.location.replace("http://nuaaiv.com/aaivAdmin/attendance.php");
                  }
            }
      })
}

function autoloadEvent(){
      $.ajax({
            url: 'script/getLatestEvent.php',
            type: 'GET',
            success: function(data, textStatus, xhr){
                  getAttendanceData(data);
            },
            error: function(xhr, textStatus, errorThrown){
                  alert(textStatus);
            },
            async: false
      });
}

function refreshAttendance(){
      $("#eventTable").fadeOut("fast");

      var sortOption = $(".glyphicon", "#sortDropdownDiv").parent().attr("id");
      var siftOption = $(".glyphicon", "#siftDropdownDiv").parent().attr("id");
      var eventID = $("h4").attr("id");
      
      $.ajax({
            url: 'script/returnSortedAttendance.php',
            type: 'POST',
            data: ({eventID: eventID,
                    sortOption: sortOption,
                    siftOption: siftOption}),
            success: function(data, textStatus, xhr){
                  displayAttendance(data);
                  $("#eventTable").fadeIn("slow");
            },
            error: function(xhr, textStatus, errorThrown){
                  alert(textStatus + " " + errorThrown);
            },
            async: false
      });
}

function createEvent(){
      var eventName = $("#inputEventName").val();
      var eventDate = $("#datePicker").val();

      $.ajax({
            url: 'script/createEvent.php',
            type: 'POST',
            data: ({eventName: eventName,
                    eventDate: eventDate}),
            success: function(data, textStatus, xhr){
                  $("#inputEventName").val("");
                  $("#datePicker").val("");
                  displayEventCreationSuccess(data);
            },
            error: function(xhr, textStatus, errorThrown){
                  alert(textStatus + " " + errorThrown);
            },
            async: false
      });
}

function displayEventCreationSuccess(eventID){
      alert = $("#eventInsertSuccess");

      $(alert).html("You have successfully created a new event with the id: " + eventID + '<a class="close" href="#">&times;</a>');
      $(alert).addClass("in");

      $(".close").click(function(event){
            $(alert).removeClass("in");
      });
}

