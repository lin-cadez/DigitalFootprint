import React from 'react';
import './App.css';
import axios from 'axios';




function App() {
  
  const [localTime, setLocalTime] = React.useState('/')
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
  const [orientation, setOrientation] = React.useState('/')
  const [orientationAngle, setOrientationAngle] = React.useState('/')
  const [City, setCity] = React.useState('/')
  const [currency, setCurrency] = React.useState('/')
  const [OS, setOS] = React.useState('/')
  const [browser, setBrowser] = React.useState('/')
  const [ISP, setISP] = React.useState('/')
  const [touchScreen, setTouchScreen] = React.useState('/')
  const [userTime, setUserTime] = React.useState('/')
  const [AdBlock, setAdBlock] = React.useState('/')
  

  
  React.useEffect(() => {

    async function detectAdBlock() {
      let adBlockEnabled = false
      const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      try {
        await fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true)
      } catch (e) {
        adBlockEnabled = true
      } finally {
        setAdBlock(adBlockEnabled ? 'Yes' : 'No')
      }
    }
    detectAdBlock()


    const date = new Date();
    const userTime = date.toLocaleTimeString();
    setUserTime(userTime)


    

    setTouchScreen(navigator.maxTouchPoints>0 ? 'Yes' : 'No')


    function getBrowserInfo() {
      const userAgent = navigator.userAgent;
      let browser = "Unknown";

      if (userAgent.indexOf("Chrome") !== -1) {
        browser = "Google Chrome";
      } else if (userAgent.indexOf("Safari") !== -1) {
        browser = "Apple Safari";
      } else if (userAgent.indexOf("Opera") !== -1) {
        browser = "Opera";
      } else if (userAgent.indexOf("Firefox") !== -1) {
        browser = "Mozilla Firefox";
      } else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1) {
        browser = "Microsoft Internet Explorer";
      }

      return browser;
    }

    const browserInfo = getBrowserInfo();
    setBrowser(browserInfo)




    function getOSInfo() {
      const userAgent = navigator.userAgent;
      let osInfo = "Unknown";
    
      if (userAgent.indexOf("Win") !== -1) {
        osInfo = "Windows";
      } else if (userAgent.indexOf("Mac") !== -1) {
        osInfo = "macOS";
      } else if (userAgent.indexOf("Linux") !== -1) {
        osInfo = "Linux";
      } else if (userAgent.indexOf("Android") !== -1) {
        osInfo = "Android";
      } else if (userAgent.indexOf("iOS") !== -1) {
        osInfo = "iOS";
      } else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1 || userAgent.indexOf("iPod") !== -1) {
        osInfo = "iOS";
      }
    
      return osInfo;
    }
    
    const osInfo = getOSInfo();
    
    setOS(osInfo)

     
    if ('orientation' in window.screen) {
      const orientation = window.screen.orientation;
      setOrientation(orientation.type)
      setOrientationAngle(orientation.angle)
      

    axios.get('https://ipapi.co/json/')

      .then(results => results.data)
      .then(data => {
        setCity(data.country_name+ ", "+data.city)
        setCurrency(data.currency_name)
        setLocalTime(data.timezone)
        setISP(data.org)
        console.log(data)
      })

    

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
    }


  }, [])

  


  return (
    <div>

      <h1>Your computer specs</h1>

      <div className='specs'>
        <p>IP: {ip}</p>
        <p>Platform: {os}</p>
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
        <p>TimeZone: {localTime}</p>
        <p>Orientation: {orientation}</p>
        <p>Orientation Angle: {orientationAngle}</p>	
        <p>City: {City}</p>
        <p>Currency: {currency}</p>
        <p>OS: {OS}</p>
        <p>Browser: {browser}</p>
        <p>ISP: {ISP}</p>
        <p>Touch Screen: {touchScreen}</p>
        <p>User Time: {userTime}</p>
        <p>AdBlock: {AdBlock}</p>
        

        
        
        

      </div>



    </div>
    
  );
}

export default App;
