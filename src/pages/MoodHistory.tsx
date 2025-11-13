import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { MoodEntryWithEmoji } from '../types/mood';
import { moodService } from '../services/moodService';
import './MoodHistory.css';

const MoodHistory: React.FC = () => {
  const history = useHistory();
  const [moodEntries, setMoodEntries] = useState<MoodEntryWithEmoji[]>([]);

  useIonViewWillEnter(() => {
    loadMoodEntries();
  });

  const loadMoodEntries = async () => {
    const entries = await moodService.getAllMoodEntries();
    setMoodEntries(entries);
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadMoodEntries();
    event.detail.complete();
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const entryDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (entryDate.getTime() === today.getTime()) {
      return 'TODAY';
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (entryDate.getTime() === yesterday.getTime()) {
      return 'YESTERDAY';
    }

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} min`;
    }

    if (hours < 24) {
      return `${hours} h`;
    }

    const days = Math.floor(hours / 24);
    return `${days} d`;
  };

  const handleEntryClick = (id: string) => {
    history.push(`/mood-detail/${id}`);
  };

  const groupedEntries = moodEntries.reduce((groups, entry) => {
    const dateKey = formatDate(entry.timestamp);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(entry);
    return groups;
  }, {} as Record<string, MoodEntryWithEmoji[]>);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/home')}>
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="mood-history-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="history-container">
          {moodEntries.length === 0 ? (
            <div className="empty-state">
              <div className="empty-emoji">📝</div>
              <h2>No hay registros</h2>
              <p>Comienza registrando tu primer estado de ánimo</p>
              <IonButton
                className="add-mood-button"
                onClick={() => history.push('/mood-selector')}
              >
                Registrar Estado de Ánimo
              </IonButton>
            </div>
          ) : (
            Object.keys(groupedEntries).map((dateKey) => (
              <div key={dateKey} className="history-group">
                <div className="history-date-header">{dateKey}</div>
                {groupedEntries[dateKey].map((entry) => (
                  <div
                    key={entry.id}
                    className="history-item"
                    onClick={() => handleEntryClick(entry.id)}
                  >
                    <div className="history-item-emoji">{entry.emoji.emoji}</div>
                    <div className="history-item-content">
                      <div className="history-item-name">{entry.emoji.name}</div>
                      <div className="history-item-notes">
                        {entry.notes || 'Sin notas'}
                      </div>
                    </div>
                    <div className="history-item-meta">
                      <div className="history-item-time">{getTimeAgo(entry.timestamp)}</div>
                      <IonIcon icon={chevronBack} className="history-item-arrow" />
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MoodHistory;
