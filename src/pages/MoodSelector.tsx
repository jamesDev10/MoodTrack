import React, { useState } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { MOOD_EMOJIS } from '../types/mood';
import { moodService } from '../services/moodService';
import './MoodSelector.css';

const MoodSelector: React.FC = () => {
  const history = useHistory();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (selectedMood) {
      try {
        await moodService.saveMoodEntry(selectedMood);
        history.push('/history');
      } catch (error) {
        console.error('Error saving mood:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedMood(null);
  };

  const selectedEmoji = selectedMood
    ? MOOD_EMOJIS.find(e => e.id === selectedMood)
    : null;

  if (showConfirmation && selectedEmoji) {
    return (
      <IonPage>
        <IonContent className="mood-selector-content">
          <div className="confirmation-container">
            <div className="confirmation-header">
              <div className="illustration">
                <svg viewBox="0 0 400 300" className="illustration-svg">
                  <rect x="0" y="100" width="400" height="200" fill="#6C5CE7" rx="20"/>
                  <circle cx="200" cy="80" r="40" fill="#FFE5CC"/>
                  <circle cx="200" cy="70" r="35" fill="#FFD4A3"/>
                  <ellipse cx="185" cy="65" rx="6" ry="8" fill="#333"/>
                  <ellipse cx="215" cy="65" rx="6" ry="8" fill="#333"/>
                  <path d="M 190 75 Q 200 80 210 75" stroke="#333" strokeWidth="2" fill="none"/>
                  <rect x="170" y="90" width="60" height="80" fill="#87CEEB" rx="30"/>
                  <path d="M 160 120 L 140 140 L 160 145" fill="#87CEEB"/>
                  <path d="M 240 120 L 260 140 L 240 145" fill="#87CEEB"/>
                  <ellipse cx="135" cy="160" rx="15" ry="25" fill="#98D8C8" opacity="0.6"/>
                  <ellipse cx="265" cy="160" rx="15" ry="25" fill="#98D8C8" opacity="0.6"/>
                  <ellipse cx="115" cy="180" rx="10" ry="20" fill="#98D8C8" opacity="0.4"/>
                  <ellipse cx="285" cy="180" rx="10" ry="20" fill="#98D8C8" opacity="0.4"/>
                </svg>
              </div>
            </div>

            <div className="confirmation-card">
              <div className="selected-emoji">{selectedEmoji.emoji}</div>
              <div className="selected-name">{selectedEmoji.name}</div>
            </div>

            <div className="confirmation-actions">
              <IonButton
                className="confirm-button"
                expand="block"
                onClick={handleConfirm}
              >
                Confirmar
              </IonButton>
              <IonButton
                className="cancel-button"
                expand="block"
                fill="clear"
                onClick={handleCancel}
              >
                Cancelar
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="mood-selector-content">
        <div className="mood-selector-container">
          <div className="mood-header">
            <div className="illustration">
              <svg viewBox="0 0 400 300" className="illustration-svg">
                <rect x="0" y="100" width="400" height="200" fill="#6C5CE7" rx="20"/>
                <circle cx="200" cy="80" r="40" fill="#FFE5CC"/>
                <circle cx="200" cy="70" r="35" fill="#FFD4A3"/>
                <ellipse cx="185" cy="65" rx="6" ry="8" fill="#333"/>
                <ellipse cx="215" cy="65" rx="6" ry="8" fill="#333"/>
                <path d="M 190 75 Q 200 82 210 75" stroke="#333" strokeWidth="2.5" fill="none"/>
                <rect x="170" y="90" width="60" height="80" fill="#74E6D3" rx="30"/>
                <path d="M 160 120 L 140 140 L 160 145" fill="#74E6D3"/>
                <path d="M 240 120 L 260 140 L 240 145" fill="#74E6D3"/>
                <ellipse cx="250" cy="110" rx="35" ry="45" fill="#FF8B94" opacity="0.3"/>
                <path d="M 240 95 L 255 85 L 250 100" fill="#FF8B94" opacity="0.5"/>
                <path d="M 260 100 L 270 88 L 265 105" fill="#FF8B94" opacity="0.5"/>
                <circle cx="255" cy="98" r="3" fill="#FF6B6B"/>
                <circle cx="262" cy="105" r="2" fill="#FF6B6B"/>
              </svg>
            </div>
          </div>

          <div className="mood-grid">
            {MOOD_EMOJIS.map((mood) => (
              <button
                key={mood.id}
                className="mood-option"
                onClick={() => handleMoodSelect(mood.id)}
              >
                <span className="mood-emoji">{mood.emoji}</span>
              </button>
            ))}
          </div>

          <div className="back-button-container">
            <button className="back-button" onClick={() => history.goBack()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MoodSelector;
