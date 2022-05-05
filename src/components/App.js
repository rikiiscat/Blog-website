import React from 'react';
import Signup from './Signup'
import {Container} from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Blog from './Blog';

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-item-center justify-content-center"
      style={{ minHeight:"100vh" }}>
        <div className="w-100" style={{ maxWidth:"600px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<Dashboard />}></Route>
                <Route exact path="/signup" element={<Signup />}></Route>
                <Route exact path="login" element={<Login />}></Route>
                <Route exact path="forgot_password" element={<ForgotPassword />}></Route>
                <Route exact path="blog" element={<Blog />}></Route>
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App;
