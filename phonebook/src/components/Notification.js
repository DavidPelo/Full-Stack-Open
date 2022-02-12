import React from 'react'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.message.error === true ? 'error' : 'notification'}>
      {props.message.message}
    </div>
  )
}

export default Notification