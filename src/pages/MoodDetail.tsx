import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonTextarea
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import { MoodEntryWithEmoji } from '../types/mood';
import { moodService } from '../services/moodService';
import './MoodDetail.css';

interface MoodDetailParams {
  id: string;
}

const MoodDetail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<MoodDetailParams>();
  const [moodEntry, setMoodEntry] = useState<MoodEntryWithEmoji | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMoodEntry();
  }, [id]);

  const loadMoodEntry = async () => {
    setLoading(true);
    const entry = await moodService.getMoodEntryById(id);
    if (entry) {
      setMoodEntry(entry);
      setNotes(entry.notes || '');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (moodEntry) {
      await moodService.updateMoodEntry(moodEntry.id, notes);
      history.push('/history');
    }
  };

  const handleCancel = () => {
    history.push('/history');
  };

  if (loading || !moodEntry) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => history.push('/history')}>
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="mood-detail-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/history')}>
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="mood-detail-content">
        <div className="detail-container">
          <div className="detail-emoji-container">
            <div className="detail-emoji">{moodEntry.emoji.emoji}</div>
          </div>

          <div className="detail-name">{moodEntry.emoji.name}</div>

          <div className="detail-notes-container">
            <IonTextarea
              className="detail-notes-input"
              placeholder="Agrega una nota sobre cómo te sientes..."
              value={notes}
              onIonInput={(e) => setNotes(e.detail.value || '')}
              rows={6}
              autoGrow={false}
            />
          </div>

          <div className="detail-actions">
            <IonButton
              className="save-button"
              expand="block"
              onClick={handleSave}
            >
              Save
            </IonButton>
            <IonButton
              className="cancel-button-detail"
              expand="block"
              onClick={handleCancel}
            >
              Cancel
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MoodDetail;
