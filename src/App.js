import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import './App.css';
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";

function App() {
  const [alert, setAlert] = useState(null);


  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <div className="body">
      <NoteState>
        <Router>
          <Navbar />

          <Alert alert={alert} />
          <div className="container my-3">


            <h1 className="text-center my-3">iSmartbook</h1>
            <div>
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />}>

                </Route>
                <Route exact path="/about" element={<About />} >

                </Route>

                <Route exact path="/users" element={<></>}>
                </Route>

                <Route exact path="/login" element={<Login showAlert={showAlert} />}>
                </Route>

                <Route exact path="/signup" element={<Signup showAlert={showAlert} />}>
                </Route>

              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
