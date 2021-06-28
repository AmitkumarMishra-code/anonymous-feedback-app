import { useEffect } from "react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { logIn } from "../redux/actions/actions"

import firebase from '../firebaseConfig'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const dispatch = useDispatch()
    const history = useHistory()
    const { user, error, inProcess } = useSelector(state => state.user)

    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            // dispatch(setUser(user))
            history.push('/')
        }
    });

    let loginHandler = () => {
        if (emailRef.current.value.trim().length === 0) {
            alert('Email cannot be empty')
            return
        }
        let emailCheck = /.*@.*\..*/
        if (!emailCheck.test(emailRef.current.value)) {
            alert('Please enter a valid email address')
            return
        }
        if (passwordRef.current.value.trim().length === 0) {
            alert('Password Field cannot be empty')
            return
        }
        dispatch(logIn(emailRef.current.value, passwordRef.current.value))
    }

    useEffect(() => {
        console.log('here', user)
        if (user !== null && !inProcess) {
            history.push(`/messages`)
        }
        // eslint-disable-next-line 
    }, [user])

    return (
        <div className="login">
            <h2>
                Login
            </h2>
            <div className="form">
                <div className="login-email">
                    <label htmlFor="login-email">Email: </label>
                    <input type="email" id="login-email" ref={emailRef} />
                </div>
                <div className="login-password">
                    <label htmlFor="login-password">Password: </label>
                    <input type="password" id="login-password" ref={passwordRef} />
                </div>
                <div className="login-button-div"><button className='login-button' disabled={inProcess} onClick={loginHandler}>Log In</button></div>
            </div>
            <div className="new-user">
                <Link to={`/signup`}>
                    <p>New User? Click here to sign-up</p>
                </Link>
            </div>
            <div className="error-message">{!user && error}</div>
        </div>
    )
}