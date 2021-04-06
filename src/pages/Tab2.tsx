import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import List from '../components/List';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <List/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
