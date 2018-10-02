import React from 'react'

export default function ReceivingDate (props) {
  const positioning = props.view === 'short'
    ? 'receivingDate-short align-items-center pr-2'
    : 'receivingDate'
  const dateShortHand = new Date( Date.parse(props.emailInfo.receivingDate))
  const date = props.view === 'short'
    ? dateShortHand.toLocaleString('ru-RU', { month: 'short', day: 'numeric' })
    : dateShortHand.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) + ', ' +
    dateShortHand.toLocaleString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <div className={`small text-black-50 d-flex ${positioning} ${props.className}`}>
      {date}
    </div>
  )
}
