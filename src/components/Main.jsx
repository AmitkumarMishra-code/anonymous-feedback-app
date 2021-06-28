import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./Login"
import SignUp from "./SignUp"
import Messages from "./Messages"
import Feedback from "./Feedback"
export default function Main(){
    return(
        <Router>
            <Switch>
                <Route exact path ='/'>
                    <Login />
                </Route>
                <Route path = '/signup'>
                    <SignUp />
                </Route>
                <Route path = '/messages'>
                    <Messages />
                </Route>
                <Route path = '/:id' component = {Feedback}/>
            </Switch>
        </Router>
    )
}