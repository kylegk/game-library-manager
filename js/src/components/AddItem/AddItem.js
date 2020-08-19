import React, { Component } from 'react'
import './AddItem.css'
import GameForm from '../GameForm/GameForm'

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  // POST - add an item to the collection
  submitForm(formData) {
    fetch(`http://localhost:8000/api/collection`, {
      method: 'POST',
			body: JSON.stringify(formData),
			headers: {
			  "Content-type": "application/json; charset=UTF-8"
			}
		}).then(
      response => { 
        return response.json()
		}).then(json => {
			this.setState({
        redirect: true
      })
		})
  }

  render() {
    return(
      <div>
        <GameForm id={Math.random()} handleSubmit={this.submitForm.bind(this)} redirect={this.state.redirect} />
      </div>
    )
  }
}

export default AddItem