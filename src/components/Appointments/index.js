import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    inputDate: '',
    appointmentList: [],
    showStarred: false,
  }

  componentDidMount() {
    const storedAppointments = localStorage.getItem('appointments')
    if (storedAppointments) {
      this.setState({
        appointmentList: JSON.parse(storedAppointments),
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.appointmentList !== this.state.appointmentList) {
      localStorage.setItem(
        'appointments',
        JSON.stringify(this.state.appointmentList),
      )
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({inputDate: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, inputDate} = this.state

    if (title.trim() === '' || inputDate.trim() === '') {
      return
    }

    const appointmentDate = format(new Date(inputDate), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      title,
      date: appointmentDate,
      starred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      inputDate: '',
    }))
  }

  onClickStarred = () => {
    this.setState(prevState => ({
      showStarred: !prevState.showStarred,
    }))
  }

  renderAppointments = () => {
    const {appointmentList, showStarred} = this.state
    if (showStarred) {
      return appointmentList.filter(eachItem => eachItem.starred === true)
    }
    return appointmentList
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem =>
        eachItem.id === id
          ? {...eachItem, starred: !eachItem.starred}
          : eachItem,
      ),
    }))
  }

  deleteAppointment = id => {
    const {appointmentList} = this.state
    const updatedAppointementList = appointmentList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({appointmentList: updatedAppointementList})
  }

  render() {
    const {title, inputDate, showStarred} = this.state
    const renderAppointmentList = this.renderAppointments()
    const starredBtnClass = showStarred
      ? 'starred-btn-active'
      : 'starred-btn-inactive'
    return (
      <div className="Appointments-bg">
        <div className="Appointments-card">
          <div className="section-1">
            <div className="section-01">
              <h1 className="s01-title">Add Appointment</h1>
              <form className="form-box" onSubmit={this.addAppointment}>
                <div className="input-box">
                  <label htmlFor="title">TITLE</label>
                  <input
                    type="text"
                    className="input-style"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="date">DATE</label>
                  <input
                    type="date"
                    className="input-style"
                    id="date"
                    value={inputDate}
                    onChange={this.onChangeDate}
                  />
                </div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>

            <div className="section-02">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="s02-img"
              />
            </div>
          </div>
          <div className="section-2">
            <div className="top-section">
              <h3 className="ts-title">Appointments</h3>
              <button
                type="button"
                className={`starred-btn ${starredBtnClass}`}
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            </div>
            <ul className="appointmentItem-container">
              {renderAppointmentList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointment={eachItem}
                  toggleStar={this.toggleStar}
                  deleteAppointment={this.deleteAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
