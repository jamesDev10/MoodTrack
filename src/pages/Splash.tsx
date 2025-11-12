import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import './Splash.css';

const Splash: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const checkFirstTime = async () => {
      // Verificar si es la primera vez que abre la app
      const { value } = await Preferences.get({ key: 'hasSeenOnboarding' });
      
      setTimeout(() => {
        if (value === 'true') {
          // Si ya vio el tutorial, ir directo a Home
          history.replace('/home');
        } else {
          // Si es primera vez, ir a Onboarding
          history.replace('/onboarding');
        }
      }, 3000); // Mostrar splash por 3 segundos
    };

    checkFirstTime();
  }, [history]);

  return (
    <IonPage>
      <IonContent className="splash-content" fullscreen>
        <div className="splash-container">
          <div className="logo-container">
            <div className="emoji-logo">😊</div>
            <h1 className="app-name">MoodTrack</h1>
            <p className="app-tagline">Registra tu estado de ánimo</p>
          </div>
          
          <div className="loading-container">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;