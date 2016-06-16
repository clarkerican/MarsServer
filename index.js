var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var app = express();
var http = require('http').Server(app);1
var io = require('socket.io')(http);
var stream = require('stream');
var Stream = stream.Stream;
var ws = new Stream;
ws.writable = true;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// app.get('/chat', function(req, res){
//
//   res.render('index.ejs');
//
// });
//var serialport = require('serialport');
//var SerialPort = serialport.SerialPort;




// var myPort = new SerialPort("COM16",{
//   baudRate : 57600,
//   bufferSize : 262144,
//   parsers:serialport.parsers.raw
// });

// myPort.on('open', function () {
//
//   console.log('port open. Data rate: ' + myPort.options.baudRate);


  var stringResult = "";

  io.on('connection',function(socket) {
      var buffer = new Buffer(10);
      console.log("Client connected!");
          socket.on('begin',function() {
              const buf2 = new Buffer('b\r', 'binary');
              myPort.write(buf2, function () {
              //console.log(buf2.toString('binary'));
              });
              const bufferp = new Buffer('p\r', 'binary');
              myPort.write(bufferp, function () {
              //console.log(bufferp.toString('binary'));
              });




      });
    //
    // myPort.on('data', function(data){
    //
    //   var string = data.toString('binary');
    //   //console.log(string);
    //
    //   string.trim();
    //
    //   var val = string.split(',');
    //
    //   if(string.charAt(0) == "e")
    //   {
    //       stringResult = stringResult + data.toString('binary');
    //   }
    //   else if(string.charAt(0) == "m")
    //   {
    //     stringResult = stringResult + data.toString('binary');
    //   }
    //   else if(string.charAt(0) == "r")
    //   {
    //     stringResult = stringResult + data.toString('binary');
    //   }
    //   else if(string.charAt(0) == "c")
    //   {
    //     stringResult = stringResult + data.toString('binary');
    //   }
    //
    //     if (stringResult.length > 0 ){
    //     stringResult = stringResult + data.toString('binary');
    //         if(stringResult.charAt(stringResult.length-1)=='.') {
    //             // var val = stringResult.split(' ');
    //             // console.log("Value:"+val[1]);
    //
    //             var rotate_pattern = /(r),(-?[0-9]+)\./;
    //             var move_pattern = /(m),(-?[0-9]+),([a-zA-Z]+)\./;
    //             var scan_pattern = /c,([0-9]+),([0-9]+),([0-9]+)/; //period checker may need to be added
    //             var sensor_pattern = /e,([01]),([01]),([01]),([01]),([01]),([01]),([0-9]+),([0-9]+),([0-9]+),([0-9]+),([0-9]+)\./;
    //             var rotate_result = stringResult.match(rotate_pattern);
    //             var move_result = stringResult.match(move_pattern);
    //             var scan_result = stringResult.match(scan_pattern);
    //             var sensor_result = stringResult.match(sensor_pattern);
    //
    //
    //             if (move_result) {
    //                 console.log("m: " + move_result);
    //                 socket.emit('moveResult', {dist: move_result[2], obstacle: move_result[3]});
    //                 stringResult = "";
    //             }
    //             else if (rotate_result) {
    //                 console.log("r: "+rotate_result);
    //                 socket.emit('rotateResult', {degrees: rotate_result[2]});
    //                 stringResult = "";
    //             }
    //             else if (scan_result) {
    //                 var splitString = stringResult.split('.');
    //                 //console.log(scan_result);
    //                 for(var i = 0; i < splitString.length; i++)
    //                 {
    //                     var str = splitString[i];
    //                     console.log(str);
    //                     var scanData = str.match(scan_pattern);
    //                     if(scanData)
    //                     {
    //                         var json = {dist: scanData[1], angularDistance: scanData[2], diameter: scanData[3]};
    //                         console.log(json);
    //                         socket.emit('scanData',json);
    //                     }
    //                 }
    //                 stringResult = "";
    //             }
    //             else if (sensor_result) {
    //                 var json = {};
    //                 json.bumpLeft         = sensor_result[1];
    //                 json.bumpRight        = sensor_result[2];
    //                 json.cliffLeft        = sensor_result[3];
    //                 json.cliffFLeft       = sensor_result[4];
    //                 json.cliffFRight      = sensor_result[5];
    //                 json.cliffRight       = sensor_result[6];
    //                 json.cliffColorLeft   = sensor_result[7];
    //                 json.cliffColorFLeft  = sensor_result[8];
    //                 json.cliffColorFRight = sensor_result[9];
    //                 json.cliffColorRight  = sensor_result[10];
    //                 console.log(json);
    //                 socket.emit('sensorData',json);
    //                 stringResult = "";
    //
    //             }
    //         }
    //   }

      //console.log("stringresult: "+stringResult);

    //});
    //   socket.on('auto',function(data){
    //       const buf4 = new Buffer('a\r', 'binary');
    //       myPort.write(buf4, function(err, results) {
    //
    //       });
    //   });

          var scan = [
              [{dist: 30, angularDistance: 93, diameter: 7},{dist: 43, angularDistance: 17, diameter: 8},{dist: 21, angularDistance: 116, diameter: 8}],
              [{dist: 56, angularDistance: 119, diameter: 10},{dist: 46, angularDistance: 36, diameter: 8}],
              [{dist: 60, angularDistance: 176, diameter: 8}],
              [{dist: 45, angularDistance: 4, diameter: 9}],
              [{dist: 44, angularDistance: 89, diameter: 9},{dist: 33, angularDistance: 146, diameter: 6}],
              [{dist: 67, angularDistance: 81, diameter: 8}],
              [{dist: 23, angularDistance: 76, diameter: 10}],
              [{dist: 39, angularDistance: 41, diameter: 8},{dist: 43, angularDistance: 111, diameter: 9}],
              [{dist: 58, angularDistance: 52, diameter: 6}]
          ];

      socket.on('scan',function(data){
          socket.emit('scanData',{data: scan[Math.floor(Math.random() * scan.length)]});

      // const buf4 = new Buffer('c\r', 'binary');
      // myPort.write(buf4, function(err, results) {
      //
      // });
      });

      socket.on('rotate',function(data){
         console.log("Inside rotate");
         var degrees = data.degrees;
         socket.emit('rotateResult',{degrees: degrees});
      // const bufrotate = new Buffer('r'+' '+degrees+'\r', 'binary');
      // myPort.write(bufrotate, function(err, results) {
      // });
      });

      socket.on('move',function(data){
          console.log("Inside move");
          var distance = data.dist;
          var moveType = data.moveType;
          var json = {};
          if(distance > 0)
          {
              var rand = Math.floor(Math.random() * 100);

              if(rand < 75)
              {
                  json.obstacle = "None";
              }
              else if(rand < 80)
              {
                  json.obstacle = "LeftBump";
              }
              else if(rand < 85)
              {
                  json.obstacle = "RightBump";
              }
              else if(rand < 90)
              {
                  json.obstacle = "CliffLeft";
              }
              else if(rand < 95)
              {
                  json.obstacle = "CliffRight";
              }
              else if(rand <= 100)
              {
                  json.obstacle = "Color";
              }

              console.log(rand);
              console.log(rand < 50);
              if(rand >= 75)
              {

                  var rand = Math.floor(Math.random() * distance);
                  //This will be how far the robot "goes" before it runs into the obstacle and then he moves back 10 cm
                  json.dist = rand - 100;

              }
              else
              {
                  json.dist = distance;
              }
          }
          else {
              json.dist = distance;
              json.obstacle = "None";
          }
          socket.emit('moveResult',json);

      // const bufrotate = new Buffer(moveType +' '+distance+'\r', 'binary');
      // myPort.write(bufrotate);
    });

    // socket.on('sense', function (data) {
    //     console.log(data);
    //     // const bufrotate = new Buffer('e\r','binary');
    //     // myPort.write(bufrotate);
    // });
      
      // socket.on('song', function (data) {
      //     const bufrotate = new Buffer('o\r','binary');
      //     myPort.write(bufrotate);
      // });

  });
// });

http.listen(8000,function (socket) {

  console.log("Example app listening at http://localhost:8000");

});