import React from 'react'
import handleLoginResponse from '../containers/handleLoginResponse'

export default function withLoginToSocials (WrappedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.login = this.login.bind(this)
    }

    login(social) {
      console.log(`Start logging in ${social} ....`)
      if(social==='FB'){
        window.FB.login((response) => handleLoginResponse(response, 'FB', response.authResponse.accessToken, this))
      } else {
        window.VK.Auth.login((response) => handleLoginResponse(response, 'VK', response.session, this))
      }
    }

    componentDidMount () {
      var LoadingCoplete = true
      if(LoadingCoplete){
        window.vkLoaded.promise.then(() => {
          window.VK.Auth.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              console.log('connected to VK')
              this.login('VK')
            } else if (response.status === 'not_authorized') {
              console.log('not_authorized in VK and my application')
              this.props.onLoadingComplete(true)
              this.props.isShowLoading(false)
            } else {
              console.log('User not logged in to VK')
              this.props.onLoadingComplete(true)
              this.props.isShowLoading(false)
            //  window.fbLoaded.promise.then(() => { 
            //    window.FB.getLoginStatus(function(response) {
            //      
            //      if (response.status === 'connected') {
            //        console.log('connected to FB')
            //        this.login('FB')
            //      } else if (response.status === 'authorization_expired') {
            //        console.log('FB authorization_expired')
            //        this.props.onLoadingComplete(true)
            //      }else if (response.status === 'not_authorized') {
            //        console.log('not_authorized in FB and my application')
            //        this.props.onLoadingComplete(true)
            //        this.props.isShowLoading(false)
            //      } else {
            //        console.log('User not logged in to Facebook')
            //        this.props.onLoadingComplete(true)
            //        this.props.isShowLoading(false)
            //      }
            //     
            //     }.bind(this)) 
            //  })

            }
           
           }.bind(this))
        })
        
      } else {}
    }

    render () {
      return <WrappedComponent {...this.props} login={this.login}/>
    }
  }
}
