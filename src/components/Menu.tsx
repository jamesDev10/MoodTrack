import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import {
  homeOutline,
  homeSharp,
  addCircleOutline,
  addCircleSharp,
  timeOutline,
  timeSharp,
  statsChartOutline,
  statsChartSharp,
  informationCircleOutline,
  informationCircleSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inicio',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Registrar Estado',
    url: '/mood-selector',
    iosIcon: addCircleOutline,
    mdIcon: addCircleSharp
  },
  {
    title: 'Historial',
    url: '/history',
    iosIcon: timeOutline,
    mdIcon: timeSharp
  },
  {
    title: 'Estadísticas',
    url: '/statistics',
    iosIcon: statsChartOutline,
    mdIcon: statsChartSharp
  },
  {
    title: 'Acerca de',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay" maxEdgeStart={0}>
      <IonHeader className="menu-header">
        <IonToolbar>
          <div className="menu-header-content">
            <div className="menu-logo">😊</div>
            <IonTitle className="menu-title">MoodTrack</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="menu-content">
        <IonList className="menu-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={true}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>
                    <h2>{appPage.title}</h2>
                  </IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <div className="menu-footer">
          <p className="version-text">Versión 1.0.0</p>
          <p className="copyright-text">© 2025 MoodTrack</p>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
