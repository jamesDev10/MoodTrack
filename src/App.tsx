import { Redirect, Route, useLocation } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';

/* Páginas */
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import MoodSelector from './pages/MoodSelector';
import MoodHistory from './pages/MoodHistory';
import MoodDetail from './pages/MoodDetail';
import Statistics from './pages/Statistics';
import About from './pages/About';

const exitRoutes = ['/home']; // rutas donde el botón atrás cierra la app

export const useBackButtonHandler = () => {
	const location = useLocation();

	useEffect(() => {
		let handler: any;

		const setupListener = async () => {
			handler = await CapacitorApp.addListener('backButton', () => {
				const currentRoute = location.pathname;

				// 1. Si estamos en una ruta que debe cerrar la app
				if (exitRoutes.includes(currentRoute)) {
					CapacitorApp.exitApp();
					return;
				}

				// 2. Si hay historial web, regresar
				if (window.history.length > 1) {
					window.history.back();
					return;
				}

				// 3. Si no hay historial, cerrar la app
				CapacitorApp.exitApp();
			});
		};

		setupListener();

		return () => {
			if (handler) {
				handler.remove();
			}
		};
	}, [location]);
};

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const AppContent: React.FC = () => {
	useBackButtonHandler();

	return (
		<IonRouterOutlet>
			<Route exact path='/splash'>
				<Splash />
			</Route>
			<Route exact path='/onboarding'>
				<Onboarding />
			</Route>
			<Route exact path='/home'>
				<Home />
			</Route>
			<Route exact path='/mood-selector'>
				<MoodSelector />
			</Route>
			<Route exact path='/history'>
				<MoodHistory />
			</Route>
			<Route exact path='/mood-detail/:id'>
				<MoodDetail />
			</Route>
			<Route exact path='/statistics'>
				<Statistics />
			</Route>
			<Route exact path='/about'>
				<About />
			</Route>
			<Route exact path='/'>
				<Redirect to='/splash' />
			</Route>
		</IonRouterOutlet>
	);
};

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<AppContent />
		</IonReactRouter>
	</IonApp>
);

export default App;
