import React from 'react';
import ReactDOM from 'react-dom/client';
import 'assets/css/index.css';
import App from 'App';
import reportWebVitals from './reportWebVitals';

// Importing reactfire providers
import { AuthProvider, FirebaseAppProvider } from 'reactfire';
import { auth, firebaseApp } from 'providers/firebase';

// Redux
import { Provider } from 'react-redux';
import store from 'store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <AuthProvider sdk={auth}>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
