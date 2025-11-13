import { IonContent, IonPage, IonButton, IonIcon } from '@ionic/react';
import { addCircleOutline, timeOutline, statsChartOutline, informationCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="home-content">
        <div className="home-container">
          <div className="home-header">
            <div className="home-logo">😊</div>
            <h1 className="home-title">MoodTrack</h1>
            <p className="home-subtitle">Registra y comprende tus emociones</p>
          </div>

          <div className="home-actions">
            <IonButton
              className="home-button primary"
              expand="block"
              onClick={() => history.push('/mood-selector')}
            >
              <IonIcon slot="start" icon={addCircleOutline} />
              Registrar Estado de Ánimo
            </IonButton>

            <IonButton
              className="home-button secondary"
              expand="block"
              fill="outline"
              onClick={() => history.push('/history')}
            >
              <IonIcon slot="start" icon={timeOutline} />
              Ver Historial
            </IonButton>

            <IonButton
              className="home-button secondary"
              expand="block"
              fill="outline"
              onClick={() => history.push('/statistics')}
            >
              <IonIcon slot="start" icon={statsChartOutline} />
              Ver Estadísticas
            </IonButton>

            <IonButton
              className="home-button secondary"
              expand="block"
              fill="outline"
              onClick={() => history.push('/about')}
            >
              <IonIcon slot="start" icon={informationCircleOutline} />
              Acerca de
            </IonButton>
          </div>

          <div className="home-footer">
            <p>Cuida tu salud mental día a día</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
