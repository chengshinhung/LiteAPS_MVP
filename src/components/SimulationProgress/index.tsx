import React, { useEffect, useState } from 'react';
import { Progress, Typography, Card } from 'antd';
import { PROGRESS_MESSAGES } from '../../data/mockGanttData';

const { Text } = Typography;

interface SimulationProgressProps {
  onComplete: () => void;
}

const SimulationProgress: React.FC<SimulationProgressProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // 50 steps * 50ms = 2500ms approx
      });
    }, 50);

    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => {
        if (prev >= PROGRESS_MESSAGES.length - 1) {
          clearInterval(messageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400); // Rotate messages every 400ms

    // Completion check
    const completionTimeout = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds total duration

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <Card style={{ marginTop: 24, textAlign: 'center' }}>
      <Progress type="circle" percent={percent} status="active" />
      <div style={{ marginTop: 16 }}>
        <Text strong>{PROGRESS_MESSAGES[messageIndex]}</Text>
      </div>
    </Card>
  );
};

export default SimulationProgress;
