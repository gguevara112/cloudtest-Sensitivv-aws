import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import "./LogIn.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || t('RfGxBqWsJyKv')); // Error en la autenticación
        return;
      }

      const data = await response.json();

      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.name);

      if (data.language) {
        i18n.changeLanguage(data.language);
      }

      navigate('/home');
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      setError(t('LtPgNxGrLxVy')); // Hubo un error al intentar iniciar sesión.
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box2">
        <div className='ikmnbhgyuiolpoiuygvbenasd'>              
          <div className='svgIconSensitivvds'>
            <svg width="42" height="42" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="redGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#ff4d4d", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#ed0000", stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="yellowGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#ffeb3b", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#ffdb22", stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="greenGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#a4e643", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#80d425", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="50" fill="white" stroke="gray" strokeWidth="1" />
              <circle cx="40" cy="30" r="10" fill="url(#redGradient)" />
              <circle cx="70" cy="30" r="10" fill="url(#yellowGradient)" />
              <circle cx="70" cy="60" r="10" fill="url(#greenGradient)" />
            </svg>
          </div>
          <div className='brand'>Sensitivv</div> 
        </div>
        <div className="login-box">
          <h2>{t('QkPsYwVzBfHt')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating">
              <input
                type="email"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id="floatingInputInvalid"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                required
              />
              <label htmlFor="floatingInputInvalid">{t('LkMwPtHwNxLp')}</label>
            </div>
            <div className="form-floating mt-3">
              <input
                type="password"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id="floatingPassword"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder={t('MtQxGyLpNtVw')}
                required
              />
              <label htmlFor="floatingPassword">{t('MtQxGyLpNtVw')}</label>
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn btn-primary mt-3">
              {t('QkPsYwVzBfHt')}
            </button>
          </form>
          <div className="login-footer mt-4">
            <button onClick={handleSignUpClick} className="btn btn-link">
              {t('ZrNxYfQwGbLt')}
            </button>
            <a href="#" className="forgot-password">
              {t('KsLqPwGrVxFy')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
