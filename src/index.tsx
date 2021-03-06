import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { createStore ,applyMiddleware, compose} from "redux";
import reducers from './Reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'
declare let window: any;

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk))
);
// composeWithDevTools()
// const handler = (event: { preventDefault: () => void; }) => {
//   event.preventDefault();
// }
// document.addEventListener('touchstart', handler, {passive: true});
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()
// serviceWorkerRegistration.register({
//   onUpdate: registration => {
//     alert('New version available!  Ready to update?');
//     if (registration && registration.waiting) {
//       registration.waiting.postMessage({ type: 'SKIP_WAITING' });
//     }
//     window.location.reload();
//   }
// });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



