import { Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList/TaskList';
import TaskForm from './pages/TaskForm/TaskForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<TaskForm />} />
        <Route path="/edit/:taskId" element={<TaskForm />} />
      </Routes>
    </div>
  );
}

export default App;
