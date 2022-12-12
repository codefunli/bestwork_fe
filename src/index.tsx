import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './core/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './transaction/i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';

library.add(fas, faTwitter, faFontAwesome);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

document.onkeydown = KeyCheck;
function KeyCheck(event: any) {
    var KeyID = event.keyCode;
    
    switch (KeyID) {
        case 112: //F1  
        case 117: //F6        
        case 118: //F7
        case 121: //F10
        case 122: //F11
        case 123: //F12
            return false;          
    }

}
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </I18nextProvider>
    </React.StrictMode>,
);

reportWebVitals();
