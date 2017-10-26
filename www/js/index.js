/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById("btnweather").addEventListener("click", getweather);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function getweather(){
    //alert('hello');
   
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position)
    {
        $("#geoloc").html("latitude: " + position.coords.latitude + "<br> longitude: " + position.coords.longitude);

        var lat = position.coords.latitude ;
        var long = position.coords.longitude;
        // alert('lat' + lat);
        // alert('long' + long);
      
        var weatherURL= "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=caf7496d4bfb9fa956946c8a724d9b4b";
        $.getJSON(weatherURL).done(function(data){
            $("#currLoc").html("Current Location: " + data.name);
            $("#currTemp").html("Current Temp: " + data.main.temp);

            $("#mainTemp").html("Main Weather Condition: " + data.weather[0].main);
            $("#currTempInfo").html("Sub Weather Condition: " + data.weather[0].description);

            var tempConvertMin = data.main.temp_min-273.15;
            $("#minTemp").html("Minimum Temp: " + tempConvertMin);

            var tempConvertMax = data.main.temp_max-273.15;
            $("#maxTemp").html("Maximum Temp: " + tempConvertMax);

            var windSpeed = data.wind.speed*18/5;
            $("#windSpeed").html("Wind speed in km/hr: " + windSpeed);
            $("#windDirection").html("Wind Direction: " + data.wind.direction);

            $("#humidity").html("Humidity: " + data.main.humidity);

            $("#pressure").html("Pressure: " + data.main.pressure);

          //  $("#sunRise").html("Sunrise: " + data.sys.sunrise.toString());
            var utcSeconds = data.sys.sunrise;
            var sr = new Date(0); // The 0 there is the key, which sets the date to the epoch
            sr.setUTCSeconds(utcSeconds);
            $("#sunRise").html("Sunrise: " + sr);


            var utcSeconds = data.sys.sunset;
            var ss = new Date(0); // The 0 there is the key, which sets the date to the epoch
            ss.setUTCSeconds(utcSeconds);
            $("#sunSet").html("Sunset: " + ss);




        });
    },function(er){
        alert(er.message);
    });
}
}