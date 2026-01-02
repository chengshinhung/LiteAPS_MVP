import React from 'react';
import { Chart } from 'react-google-charts';
import { Card, Typography } from 'antd';
import { DEMO_ORDERS } from '../../data/mockGanttData';

const { Title } = Typography;

const GanttChart: React.FC = () => {
  const chartData = [
    [
      { type: 'string', id: 'Machine' },
      { type: 'string', id: 'Task' },
      { type: 'string', role: 'style' },
      { type: 'string', role: 'tooltip' },
      { type: 'date', id: 'Start' },
      { type: 'date', id: 'End' },
    ],
    ...DEMO_ORDERS.map(order => [
      order.resourceId,
      order.title,
      `color: ${order.color}`,
      `工單: ${order.orderId}\n產品: ${order.product}\n時間: ${order.start.toLocaleTimeString()} - ${order.end.toLocaleTimeString()}`,
      order.start,
      order.end,
    ]),
  ];

  const options = {
    timeline: {
      showRowLabels: true,
      groupByRowLabel: true,
      showBarLabels: true,
      rowLabelStyle: { fontName: 'Arial', fontSize: 14 },
      barLabelStyle: { fontName: 'Arial', fontSize: 12 },
    },
    backgroundColor: '#fafafa',
  };

  return (
    <Card style={{ marginTop: 24 }}>
      <Title level={4}>排程結果甘特圖</Title>
      <div style={{ height: '400px' }}>
        <Chart
          chartType="Timeline"
          data={chartData}
          width="100%"
          height="100%"
          options={options}
        />
      </div>
    </Card>
  );
};

export default GanttChart;
