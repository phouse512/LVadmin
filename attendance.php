<?php
    session_start();

    if (!$_SESSION["valid_user"]) {
        // User not logged in, redirect to login page
        Header("Location: login.php");
    }
?>

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>AAIV Attendance</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- Bootstrap -->
            <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
            <link href="css/style.css" rel="stylesheet" media="screen">
            <script src="http://code.jquery.com/jquery.js"></script>
            <script src="js/bootstrap.min.js"></script>
            <script src="js/source.js"></script>

            <script>
                $(document).ready(function() {
                    $('[data-toggle="modal"]').click(function(e) {
                        e.preventDefault();
                        displayModalEvents();
                    });

                    $("#buttonChooseEvent").click(function(event){
                        selectEvent();
                    });
                    $('#sidebar-wrapper').width($("#sidebar").width());
                    autoloadEvent();

                    $('#sortOption').click(function(event){
                        sortAttendance();
                    });

                    setLogout();
                    $("#logoutButton").click(function(event){
                        logout();
                    })
                });
            </script>
        </head>
        
        <body>
            <div class="navbar navbar-fixed-top">
                <a class="navbar-brand" href="#">AAIV Attendance</a>
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Manage Attendance</a></li>
                    <li><a href="events.html">Manage Events</a></li>
                    <li><a href="users.html">Manage Users</a></li>
                </ul>
                <button id="logoutButton" type="button" class="btn btn-default navbar-btn pull-right">Sign In</button>
            </div>
            
            <div class="row">

                <div id="sidebar-wrapper" class="col-lg-2">
                    <div data-spy="affix" data-offset-top="50" data-offset-bottom="100" id="sidebar">
                        <div class="verticalSpace2">hi</div>
                        <h4 id="eventHeader" class="centered">Focus</h4>
                        <hr>
                        <div class="centered">
                            <a data-toggle="modal" href="#eventModal" class="btn btn-primary">choose event..</a> 
                        </div>
                        <div class="centered verticalSpace">
                            <div class="btn-group">
                                <button id="sortDropdown" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                    sort by.. <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a id="sort-1" class="sortOption" href="#">registration</a></li>
                                    <li><a id="sort-2" class="sortOption" href="#">first name</a></li>
                                    <li><a id="sort-3" class="sortOption" href="#">last name</a></li>
                                    <li><a id="sort-4" class="sortOption" href="#">year</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8"> 
                    <hr>
                    <div class="bs-example">
                        <table class="table table-hover">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Year</th>
                                <th>Email</th>
                                <th>Dorm</th>
                              </tr>
                            </thead>
                            <tbody id="eventTable">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> 
            <div class="modal fade" id="eventModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">choose event..</h4>
                      </div>
                      <div class="modal-body" id="eventModalBody">
                        <p>One fine body&hellip;</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="buttonChooseEvent">Select Event</button>
                      </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->

        </body>
    </html>