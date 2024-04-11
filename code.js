var SSID = 'WIFI_SSSID';
var PASSWORD = 'Your_Password';
var NAME = 'Name_for_dweet_URL';
 
var temp = require('thermometer').connect(A2);
var dweet = require('dweetio').connect(NAME);
var dht = require("DHT11").connect(A1);
 
I2C1.setup({sda: SDA, scl: SCL, bitrate: 400000});
var baro = require('barometer').connect({i2c: I2C1});
 dht.read(function (a) {console.log("Temp is "+a.temp.toString()+" and RH is "+a.rh.toString());});

baro.init();
print(baro.read());
print(baro.read('Pa'));
print(baro.read('mmHg'));
 
print(baro.temperature());
print(baro.temperature('C'));





function run() {
  setInterval(function() {
    dht.read(function(a) {
      dweet.send({
        Analog_temperature: temp.read('C'),
        Barometer_temperature: baro.temperature('C'),
        presure_Pascal: baro.read('Pa'),
        presure_mmHg: baro.read('mmHg'),
        Humidity: a.rh // Use humidity directly from sensor read
      });
    });
  }, 3000);
}


var wifi = require('wifi').setup(function(err) {
  wifi.connect(SSID, PASSWORD, function(err) {
    print('Click this link', dweet.follow());
    run();
  });
});