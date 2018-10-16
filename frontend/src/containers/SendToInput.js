import React from 'react'
import RecipentBage from '../containers/RecipentBage'

class SendToInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleCopyInput = this.handleCopyInput.bind(this)
    this.addressInput = React.createRef()
    this.handleInputBlur = this.handleInputBlur.bind(this)

    this.state = {
      addressList: this.props.recipentsList.slice()
    }
  }

  componentDidMount () {
    const recipentsList = this.state.addressList

    if(String(this.props.prefix).toLowerCase().indexOf('to') > -1 && this.props.isChangable)
      { this.addressInput.current.focus() }
    if(String(this.props.prefix).toLowerCase().indexOf('forward') > -1 && this.props.isChangable)
      { this.addressInput.current.focus() }
    if(recipentsList.length > 0 && typeof this.props.onInputChange === 'function') //this is to popUp cc recipients to emailReply obj
      {this.props.onInputChange(recipentsList)}    
  }

  componentDidUpdate(prevProps) {
    const newAddressList = this.props.recipentsList.slice()

    //check for toogle between reply and replyToAll buttons to manage 'Copy' field
    if( JSON.stringify(newAddressList) !== JSON.stringify(prevProps.recipentsList)){
      this.setState( {addressList: newAddressList } )
      this.props.onInputChange(newAddressList)
    }

    //check for toogle between reply and replyToAll buttons to manage 'To' field
    if ( this.props.toogleChange !== prevProps.toogleChange ){
      this.setState( {addressList: newAddressList} )
      this.props.onInputChange(newAddressList)
    }

  }

  handleCloseClick (email) {
    const newAddressList = this.state.addressList.filter(person => person.email !== email)
    this.setState({
      addressList: newAddressList
    })
    this.props.onInputChange(newAddressList)
  }

  handleCopyInput (props) {
    // проверяем что данного адреса еще нет в списке и добавляем иначе обнуляем поле ввода
    if (props.key === 'Backspace' && this.addressInput.current.value.length === 0) {
      let newAddressList = this.state.addressList
      newAddressList.pop()

      this.setState({
        addressList: newAddressList
      })
      this.props.onInputChange(newAddressList)

    }
    if (props.key === 'Enter' || props.key === ' ') {

      if (this.state.addressList.filter(person => person.email === this.InputValue).length === 0 
          && this.InputValue !== '' 
          && this.InputValue !== undefined) {
        
        const newAddressList = this.state.addressList.concat([{email: this.InputValue, name:this.InputValue}])
        
        this.setState({
          addressList: newAddressList
        })
        this.props.onInputChange(newAddressList)

      }

      this.addressInput.current.value = ''

    } else {
      this.InputValue = this.addressInput.current.value
    }
  }

  handleInputBlur() {
    let newAddressList = this.state.addressList
    if (this.state.addressList.filter(person => person.email === this.InputValue).length === 0 
        && this.InputValue !== '' 
        && this.InputValue !== undefined) {

        const newAddressList = this.state.addressList.concat([{email: this.InputValue, name:this.InputValue}])
        this.setState({
          addressList: newAddressList
        })
        this.props.onInputChange(newAddressList)

      }

      this.addressInput.current.value = ''
  }

  render () {
    const underline = this.props.isUnderlined ? 'border-bottom' : ''
    const isClosable = this.props.isChangable
    const prefix = <span className='text-black-50 pr-1'>{this.props.prefix}&nbsp;</span>

    const RecipentBages = <RecipentBage
        recipentsList={this.state.addressList}
        isClosable={isClosable}
        onCloseClick={this.handleCloseClick}
        type={this.props.prefix} />

    const Input = this.props.isChangable
      ? <input type='text'
        className='my-email-header-input'
        aria-label='to'
        autocomplete='on'
        ref={this.addressInput}
        onKeyUp={this.handleCopyInput}
        onBlur={this.handleInputBlur} />
      : null
   
    
    return (<div className={`${this.props.className} ${underline} my-font-size-md d-flex flex-wrap align-items-center`}>
       {prefix}{RecipentBages}{Input}
      </div>)
  }
}

export default SendToInput
