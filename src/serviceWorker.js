
// Este código opcional se utiliza para registrar un trabajador de servicio.
// el registro () no se llama por defecto.

// Esto permite que la aplicación se cargue más rápido en visitas posteriores en producción y da
// es capacidades fuera de línea. Sin embargo, también significa que los desarrolladores (y usuarios)
// solo verá actualizaciones implementadas en visitas posteriores a una página, después de todo
// las pestañas existentes abiertas en la página se han cerrado, ya que previamente se almacenaron en caché
// los recursos se actualizan en segundo plano.

// Para obtener más información sobre los beneficios de este modelo y las instrucciones sobre cómo
// opt-in, lee https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||  
// [:: 1] es la dirección localhost de IPv6.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
   // El constructor de URL está disponible en todos los navegadores que admiten SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
    // Nuestro trabajador de servicio no funcionará si PUBLIC_URL está en un origen diferente
    // de donde se sirve nuestra página. Esto podría suceder si se usa un CDN para
    // servir activos; ver https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
       // Esto se está ejecutando en localhost. Verifiquemos si un trabajador de servicio todavía existe o no.
        checkValidServiceWorker(swUrl, config);

        // Agregue algunos registros adicionales a localhost, señalando a los desarrolladores
        // trabajador de servicio / documentación de PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
     // No es localhost. Solo registra al trabajador de servicio
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // En este punto, se ha recuperado el contenido precached actualizado,
              // pero el trabajador de servicio anterior seguirá sirviendo a los mayores
              // contenido hasta que todas las pestañas del cliente estén cerradas.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

             // Ejecutar devolución de llamada
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
             // En este punto, todo ha sido preestablecido.
             // Es el momento perfecto para mostrar un
             // "El contenido se almacena en caché para su uso sin conexión". mensaje.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
 // Compruebe si se puede encontrar al trabajador de servicio. Si no puede volver a cargar la página.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      // Asegúrese de que el trabajador de servicio exista y que realmente estemos obteniendo un archivo JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
