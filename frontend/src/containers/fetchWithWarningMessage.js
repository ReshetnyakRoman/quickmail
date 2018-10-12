export default function fetchWithWarningMessage ( url, config, timeout, warningMessage, component ) {
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
          ).then( () => clearTimeout(timer) );
      })
    }