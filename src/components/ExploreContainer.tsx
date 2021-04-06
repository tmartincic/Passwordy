import './ExploreContainer.css';
import { Plugins } from '@capacitor/core';
const { Geolocation, Device } = Plugins;

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  getCurrentPosition();
  return (
    <div className="container">
      <strong>{name}</strong>
      <div className='center'>
        <p>Latitude:<span id='lat'>Loading...</span></p> <br/>
        <p>Longitude:<span id='lon'>Loading...</span></p> <br/>
        <p>Operating system:<span id='os'>Loading...</span></p> <br/>
        <p>Manufacturer:<span id='manufacturer'>Loading...</span></p> <br/>
        <p>Model:<span id='model'>Loading...</span></p> <br/>
        <p>Timestamp:<span id='timestamp'>Loading...</span></p><br/>
      </div>
    </div>
  );
};
async function getCurrentPosition() {
  const coordinates = await Geolocation.getCurrentPosition();
  const info = Device.getInfo();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var d = new Date();
  var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();
  var minS = min.toString();
  if (min < 10) {
      minS = "0" + min.toString();
  }
  var ampm = "am";
  if( hr > 12 ) {
      hr -= 12;
      ampm = "pm";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  let lat = document.getElementById('lat');
  let lon = document.getElementById('lon');
  let os = document.getElementById('os');
  let model = document.getElementById('model');
  let manufacturer = document.getElementById('manufacturer');
  let timestamp = document.getElementById('timestamp');
  if(lat!= null) lat.innerHTML = coordinates.coords.latitude.toString();
  if(lon!= null) lon.innerHTML = coordinates.coords.longitude.toString();
  if(os!= null) os.innerHTML = (await info).operatingSystem;
  if(model!= null) model.innerHTML = (await info).model;
  if(manufacturer!= null) manufacturer.innerHTML = (await info).manufacturer;
  if(timestamp!= null) timestamp.innerHTML = day + " " + hr + ":" + minS + ampm + " " + date + " " + month + " " + year;

  let arr = [date.toString(), month.toString(), year.toString(), lat, lon, os, model, manufacturer, timestamp];

  let password = 0;
  //Fisher-Yates algorithm for shuffling array values (added hexing encodng to the formula)

  
    console.log("shuffle");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i]?.toString();
      let mathOp = 0;
      let lng = 0;
      if(temp?.length != null) lng = temp.length;
      for (var y = 0; y < lng; y++) {
        let val = 1;
        let charVal = temp?.charCodeAt(y);
        if(charVal != null) val += charVal;
        mathOp = Math.floor(Math.random()*7);
        
        switch(mathOp) {
          case 1: password += val; break;
          case 2: password *= val; break;
          case 3: password /= val; break;
          case 4: password -= val; break;
          case 5: password %= val; break;
          case 6: password -= val; break;
          default: password += val; break;
        }
      }
    }
  
  // while(password > 1000) password = password/100;
  let stringPwd = password.toString(36);
  
  let pwd = document.getElementById('password');
  if(pwd!= null) pwd.innerHTML = stringPwd;
}

function watchPosition() {
  const wait = Geolocation.watchPosition({}, (position, err) => {
  })
}
export default ExploreContainer;
