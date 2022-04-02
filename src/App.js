import logo from './logo.svg';
import './App.css';

import { Todo } from './redux/todo';
import { Routes,Route } from 'react-router-dom';
import { Productdetails } from './redux/productdetails';

function App() {
  return (
    <div className="App">
    
     <Routes>
       <Route path="/tdata/:id" element={<Productdetails/>}/>
       <Route path="/" element={ <Todo/>}/>
     </Routes>
    </div>
  );
}

export default App;
