import React from 'react';
import './App.css';


function App() {
  const [ip, setIp] = React.useState('/')
  const [os, setOs] = React.useState('/')
  const [lang, setLang] = React.useState('/')
  const [screenSize, setScreenSize] = React.useState('/')
  const [ColorDepth, setColorDepth] = React.useState('/')
  const [DeviceMemory, setDeviceMemory] = React.useState('/')
  const [geolocation, setGeolocation] = React.useState('/')
  const [clipboard, setClipboard] = React.useState('/')
  const [connectionType, setConnectionType] = React.useState('/')
  const [downlink, setDownlink] = React.useState('/')
  const [cookiesEnabled, setCookiesEnabled] = React.useState('/')
  const [preferdLanguage, setPreferdLanguage] = React.useState('/')
  const [IsOnline, setIsOnline] = React.useState('/')
  const [webdriver, setWebdriver] = React.useState('/')
  const [IsCharging, setIsCharging] = React.useState('/')
  const [batteryLevel, setBatteryLevel] = React.useState('/')
  const [isMobile, setIsMobile] = React.useState('/')
  

  
  React.useEffect(() => {
    

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
    if (isMobile) {
      setIsMobile('Yes')
    } else {
      setIsMobile('No')
    }

    
  


    navigator.getBattery().then(function (battery) {


      battery.addEventListener('levelchange', function () {
        editLevelInfo();
    });

    function editLevelInfo() {
  
        var batteryLevel = battery.level * 100
        setBatteryLevel(batteryLevel)
    }
    editLevelInfo();
      function updateBatteryStatus() {
        setIsCharging((battery.charging ? "Yes" : "No"));
      }
      battery.addEventListener('chargingchange', function () {
        updateBatteryStatus();
      });
      updateBatteryStatus();
    });

    setWebdriver(navigator.webdriver===true ? 'Yes' : 'No')

    setIsOnline(navigator.onLine===true ? 'Yes' : 'No')
    setPreferdLanguage(navigator.languages)

    setCookiesEnabled(navigator.cookieEnabled===true ? 'Yes' : 'No')
    
    setDownlink(navigator.connection.downlink)
    setConnectionType(navigator.connection.effectiveType)
    navigator.clipboard
  .readText()
  .then(
    (clipText) => (setClipboard(clipText)),
  );


    setLang(navigator.language)
    setScreenSize(window.screen.width + 'x' + window.screen.height)
    setColorDepth(window.screen.colorDepth)
    setDeviceMemory(navigator.deviceMemory)
    navigator.geolocation.getCurrentPosition(onSuccess);
    function onSuccess(position) {
      
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      var a = latitude + ', ' + longitude
  
      setGeolocation(a);
    }



   


    fetch('https://api.ipify.org/?format=json')

      .then(results => results.json())
      .then(data => {
        setIp(data.ip)
      })

   setOs(navigator.platform)


  }, [])

  


  return (
    <div>

      <h1>Your computer specs</h1>

      <div className='specs'>
        <p>IP: {ip}</p>
        <p>Os: {os}</p>
        <p>Lang: {lang}</p>
        <p>ScreenSize: {screenSize}</p>
        <p>ColorDepth: {ColorDepth}</p>
        <p>DeviceMemory: More than {DeviceMemory} GiB</p>
        <p>Geolocation: {geolocation}</p>
        <p>Clipboard: {clipboard}</p>
        <p>Network Type: {connectionType}</p>
        <p>Network Speed: {downlink} Mbps</p>
        <p>Cookies Enabled: {cookiesEnabled}</p>
        <p>Preferd Language: {preferdLanguage}</p>
        <p>Browser Online: {IsOnline}</p>
        <p>Webdriver Enabled: {webdriver}</p>
        <p>Charging: {IsCharging}</p>
        <p>Battery Level: {batteryLevel}%</p>
        <p>Mobile: {isMobile}</p>
        
        

      </div>



    </div>
    
  );
}

export default App;
