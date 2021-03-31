import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom'

// components
import AppLayout from './HOC/Layout'
import Home from './Components/Home'
// import Notfound from './Components/Notfound'
import Inactivetickets from './Components/Home/inactive.tickets'

export default function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <AppLayout {...props}>
                    <Route path="/" exact component={Home}/>
                    <Route path="/inactivetickets" exact component={Inactivetickets}/>
                    {/* <Route  component={Notfound}/> */}
                </AppLayout>
            </Switch>
        </BrowserRouter>
    )
}
