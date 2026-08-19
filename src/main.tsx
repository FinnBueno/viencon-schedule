import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PinEditor } from './pin-editor/PinEditor.tsx';
import * as Sentry from '@sentry/react';

const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(
  window.location.hostname,
);
const showPinEditor = isLocalhost && window.location.hash === '#pin-editor';

Sentry.init({
  dsn: 'https://b23566a62354d1fae260c152bf7e031e@o4511936188514304.ingest.de.sentry.io/4511936221544528',
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#dataCollection
    userInfo: false,
    httpBodies: [],
    urlQueryParams: { deny: ['frnd'] },
  },
  // Enable logs to be sent to Sentry
  enableLogs: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>{showPinEditor ? <PinEditor /> : <App />}</StrictMode>,
);
