import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PinEditor } from './pin-editor/PinEditor.tsx';

const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(
  window.location.hostname,
);
const showPinEditor = isLocalhost && window.location.hash === '#pin-editor';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{showPinEditor ? <PinEditor /> : <App />}</StrictMode>,
);
