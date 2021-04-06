import './List.css';
import { Plugins } from '@capacitor/core';
import { IonButton } from '@ionic/react';
const { Storage, Clipboard, Modals } = Plugins;

const List: React.FC = () => {
  async function getItem(keyV: string) {
    const { value } = await Storage.get({ key: keyV });
    let list = document.getElementById('list');
    if(list) list.innerHTML += `
      <p>Application: ${keyV} is using "${value}"</p><br/> <button onclick="copy(${value}, ${keyV})">Copy!</button>
    `; 
  }
  async function tell(app:string) {
    let alertRet = await Modals.alert({
      title: 'Copied!',
      message: `You copied the password for ${app}`
    });
  }

  function copy(value:string, app:string){ 
    Clipboard.write({
      string: value
    });
    tell(app);
  }

  async function keys() {
    let list = document.getElementById('list');
    const { keys } = await Storage.keys();
    keys.forEach(element => {
      getItem(element);
    });
  }
  return (
    <div className="container">
      <IonButton onClick={keys}>
        Get keys
      </IonButton>
      <div className='center' id="list">
        <h3>Your passwords:</h3><br/>
      </div>
    </div>
  );
};

export default List;
