import { NavigationItem } from '../types';
import { DashboardOutlined, ExperimentOutlined, DatabaseOutlined } from '@ant-design/icons';
import React from 'react';

export const MENU_ITEMS: NavigationItem[] = [
  {
    key: 'dashboard',
    label: '儀表板',
    icon: React.createElement(DashboardOutlined),
    path: '/dashboard',
    disabled: true,
  },
  {
    key: 'simulation',
    label: '排程模擬',
    icon: React.createElement(ExperimentOutlined),
    path: '/simulation',
    disabled: false,
  },
  {
    key: 'resources',
    label: '資源管理',
    icon: React.createElement(DatabaseOutlined),
    path: '/resources',
    disabled: true,
  },
];
