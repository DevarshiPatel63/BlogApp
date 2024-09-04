import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/common/Header';
import SignUp_Form from './components/auth/SignUp_Form';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Login_Form from './components/auth/Login_Form';
import Forget_Password from './pages/Forget_Password';

function App() {
  return (
      <Router>
            <Routes>
                <Route path='/' element={<Header/>}></Route>
                <Route path='/suf' element={<SignUp_Form/>}></Route>
                <Route path='/signup' element={<SignUp/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/lfm' element={<Login_Form/>}></Route>
                <Route path='/forget-password' element={<Forget_Password/>}></Route>

            </Routes>
        </Router>
  );
}

export default App;
