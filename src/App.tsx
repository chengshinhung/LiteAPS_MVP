import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import SimulationView from './pages/Simulation';

// Placeholder for Resources
const Resources = () => <div>Resources View (Coming Soon)</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/simulation" replace />} />
        <Route path="simulation" element={<SimulationView />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="resources" element={<Resources />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
