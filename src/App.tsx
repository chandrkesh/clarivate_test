import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ListPage from './pages/ItemPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/list" element={<ListPage />} />
    </Routes>
  );
}

export default App;
