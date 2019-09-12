import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => (
  <ul>
  <li><Link to='/add'>Add A Game</Link></li>
  <li><Link to='/'>View Collection</Link></li>
  </ul>  
)

export default Nav