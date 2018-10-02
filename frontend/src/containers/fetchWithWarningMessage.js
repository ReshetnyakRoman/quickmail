export default function fetchWithWarningMessage ( url, config, warningMessage, timeout,component ) {
      return new Promise( (resolve, reject) => {
          // Set timeout timer
          let timer = setTimeout(
              () => {
                const state = {contentBoxMessage: warningMessage, isLoading:false}
                component.setState(state)
                //reject( new Error('Long response time from server, request timed out') )
              },
              timeout
          )
          fetch( url, config ).then(
              response => resolve( response ),
              err => reject( err )
          ).finally( () => clearTimeout(timer) );
      })
    }