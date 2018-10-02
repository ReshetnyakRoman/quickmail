export default function fetchWithTimeOut ( url, config, timeout ) {
      return new Promise( (resolve, reject) => {
          // Set timeout timer
          let timer = setTimeout(
              () => {
                reject( new Error('Long response time from server, request timed out') )
              },
              timeout
          )
          fetch( url, config ).then(
              response => resolve( response ),
              err => reject( err )
          ).finally( () => clearTimeout(timer) );
      })
    }