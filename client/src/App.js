import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './common/Header';
import SignUp_Form from './auth/SignUp_Form';
import SignUp from './pages/Signup';

function App() {
  return (
      <Router>
            <Routes>
                <Route path='/' element={<Header/>}></Route>
                <Route path='/suf' element={<SignUp_Form/>}></Route>
                <Route path='/signup' element={<SignUp/>}></Route>
            </Routes>
        </Router>
  );
}

export default App;
