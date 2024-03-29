import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { AuthProvider } from './contaxt/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ContactProvider } from './contaxt/ContactContaxt';
import { AppointmentProvider } from './contaxt/AppointmentContaxt';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ContactProvider>
      <AppointmentProvider>
        <Provider store={store}>
          <React.StrictMode>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </React.StrictMode>
        </Provider>
      </AppointmentProvider>
    </ContactProvider>
  </AuthProvider>
);

reportWebVitals();
