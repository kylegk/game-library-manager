import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from '../List/List'
import AddItem from '../AddItem/AddItem'
import EditItem from '../EditItem/EditItem'
import ViewItem from '../ViewItem/ViewItem'
import NotFound from '../NotFound/NotFound'
import './Main.css'

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={List} />
      <Route path="/add" component={AddItem} />
      <Route path="/edit" component={EditItem} />
      <Route path="/view" component={ViewItem} />
      <Route component={NotFound} />
    </Switch>
  </main>
)

export default Main