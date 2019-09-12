import React from 'react'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import './GameForm.css'

// Shared form for AddItem and EditItem to ensure we keep this DRY
class GameForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      alternate_name: this.props.alternate_name,
      description: this.props.description,
      publisher: this.props.publisher,
      year: this.props.year,
      country: this.props.country,
      image: this.props.image,
      errors: {
        name: false,
        publisher: false,
        year: false,
        country: false
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCountrySelect = this.handleCountrySelect.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
    this.handleOnFileChange = this.handleOnFileChange.bind(this)
  }

  handleUserInput = e => {
    const name = e.target.name
    const value = e.target.value
    const errors = Object.assign({}, this.state.errors, { [name]: false } )
    this.setState( { [name]: value, errors } )
  } 

  handleCountrySelect = selectedOption => {
    const errors = Object.assign({}, this.state.errors, { country: false } )
    this.setState( { country: selectedOption.value, errors  })
  }  

  handleOnFileChange = e => {
    let files = e.target.files
    let reader = new FileReader()

    reader.onload = r => {
      this.setState({
        image: r.target.result
      })
     }
    reader.readAsDataURL(files[0]);
  }

  handleSubmit = e => {
    const { errors } = this.state
    e.preventDefault()

    const errorObj = {}
    for ( let key in errors ) {
      if ( this.state[key] === "" ) {
        Object.assign(errorObj, { [key]: true })
      }
    }

    if ( Object.entries(errorObj).length === 0 && errorObj.constructor === Object ) {
      const { id } = this.props
      const { name, alternate_name, description, publisher, year, country, image } = this.state

      this.props.handleSubmit({
        id,
        name,
        alternate_name,
        description,
        publisher,
        year,
        country,
        image
      })
    }
    else {
      let setErrors = Object.assign({}, errors, errorObj)
      this.setState({
        errors: setErrors
      })
    }
  }

  renderRedirect = () => {
    if (this.props.redirect) {
      return <Redirect to='/' />
    }
  }  

  componentDidMount() {
    fetch("http://localhost:8000/api/countries")
      .then(res => res.json())
      .then(
        result => {
          const countryOptions = result.countries.map(c => ({ value: c.id, label: c.name }))
          this.setState({
            isLoaded: true,
            countryOptions
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

  render() {
    const { name, alternate_name, description, publisher, year, countryOptions, country, image, errors } = this.state

    let getCountry = () => {}
    if ( typeof countryOptions !== 'undefined' ) {
      getCountry = (countryOptions, id) => countryOptions.find(o => o.value === id)
    }

    const selectStyles = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#eee" : "",
        textAlign: "left",
        cursor: "pointer"
      }),
      container: base => ({
        ...base,
        width: "100%"
      }),
      control: base => ({
        ...base,
        width: "100%",
        textAlign: "left",
        cursor: "pointer"
      }),
    }

    const setErrors = err => {
      const errorList = []

      for ( let e in err ) {
        if ( err[e] ) {
          errorList.push(<li>{e} is missing or invalid</li>)
        }
      }

      if ( errorList.length ) {
        return (
          <div className="alert alert-danger">
            An error has occurred:
            <ul>
              {errorList}
            </ul>
          </div>
        )
      }

      return ""
    }

    return (
      <div>
        {this.renderRedirect()}
        {setErrors(errors)}
        <form className="needs-validation" noValidate>
          <div className="form-group row">
            <label htmlFor="name" className="h6">Name</label>
            <input type="text" id="name" name="name" className="form-control" placeholder="Enter a name" value={name} maxLength="100" onChange={ e => this.handleUserInput(e)} required />
          </div>
          <div className="form-group row">
            <label htmlFor="alternate_name" className="h6">Alternate Name</label>
            <input type="text" id="alternate_name" name="alternate_name" className="form-control" placeholder="Enter an alternate title (if one exists)" value={alternate_name} maxLength="100" onChange={ e => this.handleUserInput(e)} />
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="h6">Description</label>
            <textarea id="description" name="description" className="form-control h-25" rows="5" placeholder="Enter a description of the game" value={description} onChange={ e => this.handleUserInput(e)} />
          </div>
          <div className="form-group row">
            <label htmlFor="title" className="h6">Publisher</label>
            <input type="text" id="publisher" name="publisher" className="form-control" placeholder="Enter the publisher" value={publisher} maxLength="100" onChange={ e => this.handleUserInput(e)} />
          </div>     
          <div className="form-group row">
            <div className="col-xs-2">
              <label htmlFor="title" className="h6">Release Year</label>
              <input type="text" id="year" name="year" className="form-control" value={year} size="4" maxLength="4" onChange={ e => this.handleUserInput(e)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="countrySelector" className="h6">Country</label>
            <Select
              id="country"
              name="country"
              value={getCountry(countryOptions, country)}
              onChange={this.handleCountrySelect}
              options={countryOptions}
              isSearchable={false}
              autosize={false}
              styles={selectStyles}
            />
          </div>                          
          <div className="form-group row">
            <img src={image} alt="" />  
          </div>              
          <div className="form-group row">
            <label htmlFor="image" className="h6">Select an image</label>
            <input type="file" className="form-control-file" id="image" onChange={ e => this.handleOnFileChange(e) }></input>
          </div>
          <div className="form-group row">
            <p/>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    )    
  }
}

GameForm.defaultProps = {
  redirect: false,
  name: '',
  alternate_name: '',
  description: '',
  publisher: '',
  year: '',
  country: '',
  image: ''
}

export default GameForm