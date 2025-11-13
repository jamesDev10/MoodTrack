import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon
} from '@ionic/react';
import { heartOutline, happyOutline, trendingUpOutline, shieldCheckmarkOutline, chevronBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './About.css';

const About: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/home')}>
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Acerca de</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="about-content">
        <div className="about-container">
          <div className="about-hero">
            <div className="about-logo">😊</div>
            <h1 className="about-title">MoodTrack</h1>
            <p className="about-version">Versión 1.0.0</p>
            <p className="about-tagline">Tu compañero para el bienestar emocional</p>
          </div>

          <div className="about-description">
            <p>
              MoodTrack es una aplicación diseñada para ayudarte a registrar,
              visualizar y comprender tus estados de ánimo a lo largo del tiempo.
            </p>
          </div>

          <div className="features-grid">
            <IonCard className="feature-card">
              <IonCardContent>
                <IonIcon icon={happyOutline} className="feature-icon" />
                <h3>Registro Fácil</h3>
                <p>Registra tu estado de ánimo en segundos con emojis intuitivos</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="feature-card">
              <IonCardContent>
                <IonIcon icon={trendingUpOutline} className="feature-icon" />
                <h3>Visualiza Patrones</h3>
                <p>Observa tendencias y patrones en tus emociones</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="feature-card">
              <IonCardContent>
                <IonIcon icon={heartOutline} className="feature-icon" />
                <h3>Notas Personales</h3>
                <p>Añade contexto y reflexiones a tus registros</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="feature-card">
              <IonCardContent>
                <IonIcon icon={shieldCheckmarkOutline} className="feature-icon" />
                <h3>Privacidad Total</h3>
                <p>Tus datos están seguros en tu dispositivo</p>
              </IonCardContent>
            </IonCard>
          </div>

          <div className="about-footer-content">
            <h3>¿Por qué MoodTrack?</h3>
            <p>
              Entender tus emociones es el primer paso hacia el bienestar mental.
              MoodTrack te ayuda a tomar consciencia de tus patrones emocionales
              y a identificar qué factores afectan tu estado de ánimo.
            </p>

            <div className="tips-section">
              <h4>Consejos para usar MoodTrack:</h4>
              <ul>
                <li>Registra tu estado de ánimo al menos una vez al día</li>
                <li>Añade notas para recordar el contexto</li>
                <li>Revisa tus estadísticas semanalmente</li>
                <li>Busca patrones en tus emociones</li>
                <li>Comparte insights con profesionales si es necesario</li>
              </ul>
            </div>

            <div className="contact-section">
              <p className="contact-text">Desarrollado con ❤️ para tu bienestar</p>
              <p className="copyright">© 2025 MoodTrack. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
