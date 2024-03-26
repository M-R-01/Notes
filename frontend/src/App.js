import './App.scss';
import Main from './Components/Main/main';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      <Route path='/notes' element={<Main />} />
    </Routes>
    </>
  );
}

export default App;
