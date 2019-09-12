import React from 'react'
import GameForm from '../GameForm/GameForm'
import './EditItem.css'

class EditItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      redirect: false,
      item: {}
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id 
    if ( !id ) {
      id = this.props.location.pathname.split('/')[2]
    }

    // GET the item
    fetch(`http://localhost:8000/api/collection/${id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            item: result
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
      .catch(rejected => console.log(rejected))
  }

  // PUT the update to the item
  subitForm(formData) {
    fetch(`http://localhost:8000/api/collection/${formData.id}`, {
      method: 'PUT',
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
    const { error, isLoaded, item, redirect } = this.state

    if ( error ) {
      return <div>Error: {error.message}</div>
    }
    else if ( !isLoaded ) {
      return <div>Fetching Item...</div>
    }
    else {
      return(
        <div>
          <GameForm
            id={item.id}
            name={item.name}
            alternate_name={item.alternate_name}
            description={item.description}
            publisher={item.publisher}
            year={item.year}
            country={item.country}
            image={item.image}
            handleSubmit={this.subitForm.bind(this)} 
            unsetErrors={true}
            redirect={redirect}
          />
        </div>
      )
    }
  }
}

export default EditItem