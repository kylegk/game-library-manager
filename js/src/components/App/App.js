import React from 'react'
import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import Main from '../Main/Main'
import './App.css'

const App = () => (
  <div className="container">
    <div className="heading">
      <Header />
    </div>
    <div className="layout">
      <div classsname="nav">
        <Nav />
      </div>
      <div className="content">
        <Main />
      </div>
    </div>
  </div>
)

export default App