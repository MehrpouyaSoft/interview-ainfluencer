import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/sass/app.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux'
import { Provider as ProviderMobx } from 'mobx-react'
import { CookiesProvider } from 'react-cookie';
import { store } from './lib/redux/store';
import AppStore from 'lib/mobx/AppStore';
const queryClient = new QueryClient()

const storeMobx = {
  AppStore
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <Provider store={store}>
            <ProviderMobx {...storeMobx}>
              <App />
            </ProviderMobx>
          </Provider>
        </CookiesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
