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
  IonTextarea,
  IonToast
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

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
      try {
        const success = await moodService.updateMoodEntry(moodEntry.id, notes);
        if (success) {
          setToastMessage('Notas actualizadas correctamente');
          setToastColor('success');
          setShowToast(true);
          setTimeout(() => {
            history.push('/history');
          }, 500);
        } else {
          setToastMessage('Error al actualizar las notas');
          setToastColor('danger');
          setShowToast(true);
        }
      } catch (error) {
        console.error('Error updating mood entry:', error);
        setToastMessage('Error al actualizar. Intenta nuevamente');
        setToastColor('danger');
        setShowToast(true);
      }
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
          <IonTitle>Historial</IonTitle>
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
          <IonTitle>Historial</IonTitle>
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
              Guardar
            </IonButton>
            <IonButton
              className="cancel-button-detail"
              expand="block"
              onClick={handleCancel}
            >
              Cancelar
            </IonButton>
          </div>
        </div>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        color={toastColor}
        position="bottom"
      />
    </IonPage>
  );
};

export default MoodDetail;
