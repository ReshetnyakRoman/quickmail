import React from 'react' 
import {vkAppID, FbAppID} from '../config'

function Deferred() {
  var self = this
  this.promise = new Promise(function(resolve, reject) {
    self.reject = reject
    self.resolve = resolve
  })
}

export default function connectedToSocials (WrappedComponent) {
	return class extends React.Component {
		constructor (props) {
      super(props)
      this.loadFBSDK = this.loadFBSDK.bind(this)
      this.loadVKSDK = this.loadVKSDK.bind(this)
    }

    loadFBSDK () {
      
      
      (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0]
           if (d.getElementById(id)) {return}
           js = d.createElement(s); js.id = id
           js.src = "https://connect.facebook.net/en_US/sdk.js"
           fjs.parentNode.insertBefore(js, fjs)
         }(document, 'script', 'facebook-jssdk'))

      console.log("Loading FB API")      
      window.fbLoaded = (new Deferred())

      window.fbAsyncInit = function() {
          window.FB.init({
            appId            : FbAppID,
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v3.1'
          }) 
          window.fbLoaded.resolve()
        }
    }
    
    loadVKSDK () {
      setTimeout(function() {
        var el = document.createElement("script");
        el.type = "text/javascript";
        el.src = "//vk.com/js/api/openapi.js";
        el.async = true;
        document.getElementById("vk_api_transport").appendChild(el);
      }, 0)

      console.log("Loading VK API")
      window.vkLoaded = (new Deferred())

      window.vkAsyncInit = function() {
        window.VK.init({
          apiId: vkAppID
        })
        window.vkLoaded.resolve()
      }

      
    }

    componentDidMount () {
      // uncoment below line to allow Facebook login
      //this.loadFBSDK() 
      this.loadVKSDK()
    }

    render () {
    	return <WrappedComponent {...this.props} />
    }
	}
}