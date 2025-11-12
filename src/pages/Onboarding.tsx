import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './Onboarding.css';

const Onboarding: React.FC = () => {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const slides = [
    {
      emoji: '👋',
      title: 'Bienvenido a MoodTrack',
      description: 'Tu diario emocional personal para entender mejor tus estados de ánimo'
    },
    {
      emoji: '😊',
      title: 'Registra tu Ánimo Diario',
      description: 'Selecciona cómo te sientes cada día con solo un toque. Agrega notas opcionales para más contexto'
    },
    {
      emoji: '📊',
      title: 'Visualiza tus Patrones',
      description: 'Descubre tendencias en tu estado de ánimo con gráficos semanales y mensuales'
    }
  ];

  const handleFinish = async () => {
    // Guardar que ya vio el onboarding
    await Preferences.set({
      key: 'hasSeenOnboarding',
      value: 'true'
    });
    
    // Ir a la pantalla principal
    history.replace('/home');
  };

  const handleSkip = async () => {
    await Preferences.set({
      key: 'hasSeenOnboarding',
      value: 'true'
    });
    history.replace('/home');
  };

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <IonPage>
      <IonContent className="onboarding-content" fullscreen>
        <div className="onboarding-container">
          <button className="skip-button" onClick={handleSkip}>
            Saltar
          </button>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="onboarding-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="slide-content">
                  <div className="slide-emoji">{slide.emoji}</div>
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-description">{slide.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="button-container">
            {activeIndex === slides.length - 1 ? (
              <IonButton 
                expand="block" 
                className="action-button"
                onClick={handleFinish}
              >
                Comenzar
              </IonButton>
            ) : (
              <IonButton 
                expand="block" 
                className="action-button"
                onClick={handleNext}
              >
                Siguiente
              </IonButton>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;