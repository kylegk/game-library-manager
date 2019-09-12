import React from 'react'
import { Link } from 'react-router-dom'
import EllipsisText from "react-ellipsis-text";
import './List.css'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      collection: [],
      reload: false
    }
  }

  // GET the entire list of items
  // TODO: Add pagination
  componentDidMount() {    
    fetch("http://localhost:8000/api/collection")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            collection: result.collection
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

  imageCol = src => {
    if (src) {
      return (
        <div className="col">
          <img src={src} className="resize" alt="" />
        </div>            
      )
    }
    return ""
  }  

  displayImage = src => {
    const image = new Image();
    image.src = src
    return image
  }

  forceListUpdate = () => {
    this.forceUpdate();
  }

  render() {
    const { error, isLoaded } = this.state

    if ( error ) {
      return <h1>Error: {error}</h1>
    }
    else if ( !isLoaded ) {
      return <h1>Fetching Game Collection...</h1>
    }
    else {
      let displayList
      if ( this.state.collection.length ) {
        displayList = (
          <ul>
          {this.state.collection.map( (item, index) => (
            <Link to={{
              pathname: `view/${item.id}`, 
              state: { item }
            }} key={item.id}>
            <li key={item.id} className="list-group-item">
              <div>
                <h2>{item.name}</h2>
                <div className="row">
                  {this.imageCol(item.image)}
                  <div className="col">
                    <b>Description:</b>
                    <br/>
                    <EllipsisText text={item.description || ""} length={200} />
                  </div>
                </div>
              </div>
            </li>
            </Link>
          ))}
          </ul>
        )
      }
      else {
        displayList = (
          <div>Your game collection is empty. Use the link on the left to add some games.</div>
        )
      }

      return (
        <div>
          {displayList}
        </div>
      )        
    }
  }
}

export default List