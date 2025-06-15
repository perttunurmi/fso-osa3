import PropTypes from 'prop-types'

const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  switch (style) {
    case 'ok':
      style = { color: "green" }
      break;
    case 'error':
      style = { color: "red" }
      break;
    default:
      style = { color: "grey" }
  }

  return (
    <div className="ilmoitus" style={style}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  style: PropTypes.string
}

export default Notification
