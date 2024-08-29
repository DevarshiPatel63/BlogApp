import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './common/Header';
import CustomInput from './common/CustomInput';
import SignUp_Form from './auth/SignUp_Form';

function App() {
  return (
      <Router>
            <Routes>
                <Route path='/' element={<Header/>}></Route>
                <Route path='/input' element={<CustomInput/>}></Route>
                <Route path='/suf' element={<SignUp_Form/>}></Route>
            </Routes>
        </Router>
  );
}

export default App;
