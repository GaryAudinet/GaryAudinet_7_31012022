// Import des packages requis

import './css/styles.min.css';
import { AuthContext } from './context/authContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './components/Routes';

// Déclaration du hook useState, et vDOM principal de l'api

function App() {

  const [authState, setAuthState] = useState({
    id: 0,
    username: '',
    email: '',
    biography: '',
    image: '',
    isAdmin: false,
    status: false,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/sign/auth`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            biography: res.data.biography,
            image: res.data.image,
            isAdmin: res.data.isAdmin,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Header />
        <Routes />
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
