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
  IonSelect,
  IonSelectOption,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { moodService } from '../services/moodService';
import './Statistics.css';

const Statistics: React.FC = () => {
  const history = useHistory();
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [chartData, setChartData] = useState<any[]>([]);
  const [statistics, setStatistics] = useState({
    totalEntries: 0,
    happyPercent: 0,
    sadPercent: 0,
    neutralPercent: 0,
    mostFrequentEmoji: null as any
  });

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = async () => {
    const data = await moodService.getChartData(period);
    const stats = await moodService.getStatistics(period);
    setChartData(data);
    setStatistics(stats);
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadData();
    event.detail.complete();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      let moodLabel = 'Normal';

      if (value >= 4.5) moodLabel = 'Muy Feliz';
      else if (value >= 3.5) moodLabel = 'Feliz';
      else if (value >= 2.5) moodLabel = 'Tranquilo';
      else if (value >= 1.5) moodLabel = 'Neutral';
      else if (value > 0) moodLabel = 'Triste';

      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{moodLabel}</p>
          <p className="tooltip-value">{value.toFixed(1)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/home')}>
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Estadísticas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="statistics-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="statistics-container">
          <div className="period-selector">
            <IonSelect
              value={period}
              onIonChange={(e) => setPeriod(e.detail.value)}
              interface="popover"
              className="period-select"
            >
              <IonSelectOption value="week">Esta Semana</IonSelectOption>
              <IonSelectOption value="month">Este Mes</IonSelectOption>
            </IonSelect>
          </div>

          {chartData.length > 0 ? (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="day"
                    stroke="#718096"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    stroke="#718096"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6C5CE7"
                    strokeWidth={3}
                    dot={{ fill: '#6C5CE7', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-empty">
              <div className="empty-chart-emoji">📊</div>
              <p>No hay datos para mostrar</p>
              <p className="empty-subtitle">Registra tu estado de ánimo para ver gráficos</p>
            </div>
          )}

          <div className="stats-cards">
            <div className="stat-card happy">
              <div className="stat-value">{statistics.happyPercent}</div>
              <div className="stat-label">Positivo</div>
            </div>

            <div className="stat-card sad">
              <div className="stat-value">{statistics.sadPercent}</div>
              <div className="stat-label">Negativo</div>
            </div>

            <div className="stat-card neutral">
              <div className="stat-value">{statistics.neutralPercent}</div>
              <div className="stat-label">Neutral</div>
            </div>
          </div>

          <div className="statistics-section">
            <h2 className="section-title">Resumen</h2>

            <div className="summary-card">
              <div className="summary-item">
                <span className="summary-label">Total de registros</span>
                <span className="summary-value">{statistics.totalEntries}</span>
              </div>

              {statistics.mostFrequentEmoji && (
                <div className="summary-item">
                  <span className="summary-label">Estado más frecuente</span>
                  <span className="summary-value-emoji">
                    <span className="emoji-large">{statistics.mostFrequentEmoji.emoji}</span>
                    <span>{statistics.mostFrequentEmoji.name}</span>
                  </span>
                </div>
              )}

              <div className="summary-item">
                <span className="summary-label">Periodo</span>
                <span className="summary-value">
                  {period === 'week' ? 'Últimos 7 días' : 'Últimos 30 días'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Statistics;
