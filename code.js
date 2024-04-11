var SSID = 'WIFI_SSSID';
var PASSWORD = 'Your_Password';
var NAME = 'Name_for_dweet_URL';
 
var temp = require('thermometer').connect(A2);
var dweet = require('dweetio').connect(NAME);
var dht = require("DHT11").connect(A1);
//var sdCard = require('card-reader').connect(P8);
 
//sdCard.writeFile('new_data.txt', 'IoT will save the world!');
//sdCard.appendFile('new_data.txt', '... and our server.');
//console.log(sdCard.readFile('new_data.txt')); 




I2C1.setup({sda: SDA, scl: SCL, bitrate: 400000});
var baro = require('barometer').connect({i2c: I2C1});
 dht.read(function (a) {console.log("Temp is "+a.temp.toString()+" and RH is "+a.rh.toString());});

baro.init();
print(baro.read());
print(baro.read('Pa'));
print(baro.read('mmHg'));
 
print(baro.temperature());
print(baro.temperature('C'));
//const minute = 1000 * 60;
//const hour = minute * 60;
//const day = hour * 24;
//const year = day * 365;

// Divide Time with a year
const d = new Date();
//let years = Math.round(d.getTime() / year);
//print(years);



function run() {
  setInterval(function() {
  const dayOfMonth = d.getDate();
  const monthIndex = d.getMonth();
  const currentHour = d.getHours();
  const currentMinutes = d.getMinutes();
  const currentSeconds = d.getSeconds();
  const currentYear = d.getFullYear();
    dht.read(function(a) {
      dweet.send({
        Analog_temperature: temp.read('C'),
        Barometer_temperature: baro.temperature('C'),
        presure_Pascal: baro.read('Pa'),
        presure_mmHg: baro.read('mmHg'),
        Humidity: a.rh ,
        Time_Seconds:currentSeconds,
        Time_Minutes:currentMinutes,
        Time_Hour:currentHour,
        Time_days:  dayOfMonth,
        Time_month: monthIndex,
        Time_Years: currentYear
      });
    });
  }, 5000);
}


var wifi = require('wifi').setup(function(err) {
  wifi.connect(SSID, PASSWORD, function(err) {
    print('Click this link', dweet.follow());
    run();
  });
});
