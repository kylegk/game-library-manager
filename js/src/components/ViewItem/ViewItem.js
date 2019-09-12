import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import './ViewItem.css'

class ViewItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      error: null,
      isLoaded: false,
      redirect: false,
      delete: false,
      promptDelete: false,
      item: {}
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id 
    if ( !id ) {
      id = this.props.location.pathname.split('/')[2]
    }

    this.setState({
      id
    })

    // GET - the item to view
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

      // GET - the list of countries
      // TODO: Add a method to the API to retrieve a single country
      fetch("http://localhost:8000/api/countries")
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              isLoaded: true,
              countries: result.countries
            })
          },
          error => {
            this.setState({
              countryListError: error
            })
          }
        )
        .catch(rejected => console.log(rejected))      
  }

  deleteGame = () => {
    const { id } = this.state

    this.setState({
      redirect: true
    })

    // DELETE an item in the data store
    fetch(`http://localhost:8000/api/collection/${id}`, {
      method: 'DELETE'
		}).then(
      response => { 
        return response.json()
    })
    
    // TODO: Refactor. This is currently a hack to get around reloading the list with <Redirect /> and props
    window.location.href = 'http://' + window.location.hostname + ':' + window.location.port + '/'
  } 

  promptDelete = () => {
    this.setState({
      promptDelete: !this.state.promptDelete
    })
  }

  setLink = (path, id, name) => {
    return (
      <Link to={{
        pathname: `/${path}/${id}`, 
        state: { id }
      }}>{name || 'Link'}</Link>
    )
  }

  renderRedirect = () => {
    if (this.state.redirect || !this.state) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { reload: true }
        }}/>
      )
    }
  }  

  render() {
    const { error, isLoaded, item, countries, promptDelete } = this.state

    const displayDeletePrompt = (p) => {
      if (p) {
        return (
          <div className="alert alert-danger">
            Are you sure you want to delete this game?
            <p/>
            <span onClick={this.promptDelete}>No</span>&nbsp;&nbsp;&nbsp;&nbsp;<span onClick={this.deleteGame}>Yes</span>
          </div>
        )
      }
    }

    let getCountry = () => {}
    let countryName = 'n/a'
    
    if ( typeof countries !== 'undefined' ) {
      getCountry = (countries, id) => countries.find(o => o.id === id)
      countryName = getCountry(countries, item.country)
      if ( typeof countryName !== 'undefined' ) {
        countryName = countryName.name
      }
    }

    if ( error ) {
      return <div>Error: {error.message}</div>
    }
    else if ( !isLoaded ) {
      return <div>Fetching Item...</div>
    }
    else {
      return (
        <div className="container">
          {displayDeletePrompt(promptDelete)}
          <div className="row">
            <div className="col-lg-8">
              <h2 className="mt-4">{item.name}</h2>
              <h5 className="mt-4">{item.alternate_name}</h5>
              <hr/>
              <p>
                Published by {item.publisher || '?'} | Released in {item.year || '?'} | Country of Origin: {countryName}
              </p>
              <p>
                <img src={item.image} alt=""/>
              </p>
              <p className="lead">
                {item.description}
              </p>
            </div>
            <div className="row">
              {this.setLink('edit',item.id,'Edit')}&nbsp;&nbsp;|&nbsp;&nbsp;<span onClick={this.promptDelete}>Delete</span>
            </div>
          </div>
        </div>
      )  
    }
  }
}

export default ViewItem