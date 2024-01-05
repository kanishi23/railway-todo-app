import './asset/App.scss';
import { Router } from './routes/Router';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router />
        <Outlet />
    </div>
  );
}

export default App;
