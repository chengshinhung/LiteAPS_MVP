import React, { useState } from 'react';
import { Typography, Card, Button, Steps } from 'antd';
import { CloudUploadOutlined, PlayCircleOutlined, BarChartOutlined } from '@ant-design/icons';
import FileUploader from '../../components/FileUploader';
import SimulationProgress from '../../components/SimulationProgress';
import GanttChart from '../../components/GanttChart';
import { SimulationState } from '../../types';

const { Title } = Typography;

const SimulationView: React.FC = () => {
  const [state, setState] = useState<SimulationState>({
    step: 'idle',
    isUploaded: false,
    isSimulating: false,
    progress: 0,
    currentMessage: '',
  });

  const handleUploadSuccess = () => {
    setState(prev => ({
      ...prev,
      step: 'uploaded',
      isUploaded: true,
    }));
  };

  const handleStartSimulation = () => {
    setState(prev => ({
      ...prev,
      step: 'simulating',
      isSimulating: true,
    }));
  };

  const handleSimulationComplete = () => {
    setState(prev => ({
      ...prev,
      step: 'completed',
      isSimulating: false,
      progress: 100,
    }));
  };

  return (
    <div>
      <Title level={2}>排程模擬</Title>
      
      <Steps
        current={state.step === 'idle' ? 0 : state.step === 'uploaded' ? 1 : state.step === 'simulating' ? 1 : 2}
        items={[
          { title: '上傳工單', icon: <CloudUploadOutlined /> },
          { title: 'AI 運算', icon: <PlayCircleOutlined /> },
          { title: '排程結果', icon: <BarChartOutlined /> },
        ]}
        style={{ marginBottom: 32 }}
      />

      <Card title="資料匯入" style={{ marginBottom: 24 }}>
        <FileUploader 
          onUploadSuccess={handleUploadSuccess} 
          disabled={state.step !== 'idle' && state.step !== 'uploaded'}
        />
      </Card>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Button 
          type="primary" 
          size="large" 
          icon={<PlayCircleOutlined />}
          disabled={!state.isUploaded || state.step === 'simulating' || state.step === 'completed'}
          onClick={handleStartSimulation}
        >
          執行 AI 排程模擬
        </Button>
      </div>

      {state.isSimulating && (
        <SimulationProgress onComplete={handleSimulationComplete} />
      )}

      {state.step === 'completed' && (
        <GanttChart />
      )}
    </div>
  );
};

export default SimulationView;
