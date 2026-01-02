export type OrderType = 'normal' | 'urgent' | 'sample';

export interface WorkOrder {
  id: string;
  orderId: string;
  resourceId: string;
  product: string;
  title: string;
  start: Date;
  end: Date;
  type: OrderType;
  color: string;
  quantity?: number;
  customer?: string;
}

export type MachineStatus = 'active' | 'maintenance' | 'idle';

export interface Machine {
  id: string;
  name: string;
  displayName: string;
  status?: MachineStatus;
}

export type SimulationStep = 
  | 'idle'       // 初始狀態
  | 'uploaded'   // 已上傳
  | 'simulating' // 模擬中
  | 'completed'; // 完成

export interface SimulationState {
  step: SimulationStep;
  isUploaded: boolean;
  isSimulating: boolean;
  progress: number;
  currentMessage: string;
}

export interface NavigationItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path: string;
  disabled: boolean;
}
