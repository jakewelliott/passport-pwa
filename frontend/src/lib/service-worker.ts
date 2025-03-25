export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', {
          type: 'module',
        })
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
}
