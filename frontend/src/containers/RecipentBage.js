import React from 'react'
import EmailValidation from '../containers/EmailValidation'

function RecipentBage (props) {
  function handleCloseClick (email, event) {
    props.onCloseClick(email)
  }

  function closeButton (email) {
    if (props.isClosable) {
      return (<span onClick={(e) => handleCloseClick(email, e)} className='my-cursor-pointer px-1 ml-1 my-font-size-md badge-close'>&nbsp; &times; &nbsp;</span>)
    }
    return null
  }

  const len = props.recipentsList.length
  const recipents = props.recipentsList.map(

    function (person, index) {
      const mainInfo = person.name ? person.name : person.email
      const coma = index === len - 1 ? <span>&nbsp;</span> : <span>,&nbsp;</span>
      const badgeType = EmailValidation(person.email) ? 'my-badge-light' : 'badge-danger'

      const popup = EmailValidation(person.email)
        ? <div className='mailFrom-popup small text-black-50'>
            email:&nbsp;<span className='my-text-blue'>{person.email}</span>
          </div>
        : <div className='mailFrom-popup invalid-email small text-black-50'>
            <span>invalid email</span>
          </div>

      const From = /from/g
      const Reply = /reply/g

      let personInfo =
        (
          <span className={`badge ${badgeType}`}>
            {mainInfo}
            {closeButton(person.email)}
          </span>
        )

      if (From.test(String(props.type).toLowerCase())) {
        personInfo = <span className={`my-font-size-md shorten-text`} >{mainInfo} </span>
      }

      if (Reply.test(String(props.type).toLowerCase())) {
        personInfo = <span className={`my-font-size-md shorten-text font-weight-bold`} style={{color: EmailValidation(person.email) ? 'black' : '#f86c6b' }}>{mainInfo} </span>
      }

      return (
        <div className='d-flex m-0 mailFrom-block position-relative align-items-center' key={mainInfo}>
          {personInfo}{popup}{coma}
        </div>)
    }
  )

  return (
    <React.Fragment>
      {recipents}
    </React.Fragment>
  )
}

export default RecipentBage
