import './index.css'

const AppointmentItem = props => {
  const {appointment, toggleStar, deleteAppointment} = props
  const {id, title, date, starred} = appointment
  const starImg = starred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onClickStar = () => {
    toggleStar(id)
  }
  const onClickDeleteAppointment = () => {
    deleteAppointment(id)
  }
  return (
    <li className="appointmentItem">
      <div className="ai-ts">
        <h4 className="ai-title">{title}</h4>
        <button type="button" className="star-btn" onClick={onClickStar}>
          <img src={starImg} className="star-img" />
        </button>
      </div>
      <div className="date-box">
        <p className="date">{`Date: ${date}`}</p>
        <button
          type="button"
          className="delete-btn"
          onClick={onClickDeleteAppointment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
