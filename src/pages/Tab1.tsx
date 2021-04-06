import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { Plugins } from '@capacitor/core';
const { Geolocation, Device, Modals, Storage } = Plugins;

const Tab1: React.FC = () => {
  const storePassword = async () => {
    let applicationValue = (document.getElementById("applicationValue") as HTMLInputElement).value;
    let passwordValue = (document.getElementById("passValue") as HTMLInputElement).value;
    let alertRet = await Modals.alert({
      title: 'Password generated',
      message: `Your new password for ${applicationValue} is: ${passwordValue}`
    });

    await Storage.set({
      key: applicationValue,
      value: passwordValue
    });
  }
  const generatePassword = async () => {
    let passwordItem = document.getElementById("password");
    const coordinates = await Geolocation.getCurrentPosition();
    const info = Device.getInfo();
    var d = new Date();
    var day = d.getDay();
    var hr = d.getHours();
    var min = d.getMinutes();
    var minS = min.toString();
    let timestamp = day + " " + hr + ":" + minS  + " " + day + " " + minS + " ";
    let arr = [day.toString(), hr.toString(), minS.toString(), coordinates.coords.latitude, coordinates.coords.longitude,(await info).operatingSystem, (await info).model, (await info).manufacturer, timestamp];
    let password = 0;
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
  
    if(passwordItem) passwordItem.innerHTML = `
      <h3>Your password</h3>
      <div class="input-container">
        <input id="passValue" class="input-field" type="text" value=${stringPwd}>
      </div>
      <h3>For application</h3>
      <div class="input-container">
        <input id="applicationValue" class="input-field" type="text" placeholder="eg. Facebook">
      </div>
      `;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Generator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
          <IonCol>
            <ExploreContainer name="Your very specific personal info" />
          </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
            <IonButton color="primary" onClick={generatePassword}>
              Generate Token
            </IonButton>
            <div id="password">
              
            </div>
            <IonButton color="primary" onClick={storePassword}>
              Store Password
            </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
