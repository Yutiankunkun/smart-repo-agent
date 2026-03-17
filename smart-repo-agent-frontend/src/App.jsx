import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StudentManagement from './pages/StudentManagement';
import AgentChat from './pages/AgentChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentManagement />} />
          <Route path="chat" element={<AgentChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
