import { useEffect } from "react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { startSignup } from "../redux/actions/actions"
import firebase from '../firebaseConfig'
import { RESET_SIGNUP_PROCESS } from "../redux/actions/actions_types"

export default function SignUp() {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const password2Ref = useRef()
    const dispatch = useDispatch()
    const { success, inProcess, error } = useSelector(state => state.signupState)
    const history = useHistory()

    let signUpHandler = () => {
        if (usernameRef.current.value.trim().length === 0) {
            alert('Username cannot be empty!')
            return
        }
        if(emailRef.current.value.trim().length === 0){
            alert('Email cannot be empty')
            return
        }
        let emailCheck = /.*@.*\..*/
        if(!emailCheck.test(emailRef.current.value)){
            alert('Please enter a valid email address')
            return
        }
        if (passwordRef.current.value !== password2Ref.current.value) {
            alert(`Passwords don't match`)
            return
        }
        console.log('preliminary checks passed')
        dispatch(startSignup({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }))

    }

    useEffect(() => {
        return () => {
            console.log('cleanup called')
            dispatch({
                type: RESET_SIGNUP_PROCESS
            })
        }
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if (success) {
            console.log('after signup success')
            usernameRef.current.value = ''
            emailRef.current.value = ''
            passwordRef.current.value = ''
            password2Ref.current.value = ''
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                history.push('/')
              }).catch((error) => {
                // An error happened.
              });
        }
        // eslint-disable-next-line
    }, [success])

    return (
        <div className="signup">
            <h2>Sign-up</h2>
            <div className="form">
                <div className="signup-username">
                    <label htmlFor="signup-username">Username: </label>
                    <input type="email" id="signup-username" ref={usernameRef} />
                </div>
                <div className="signup-email">
                    <label htmlFor="signup-email">Email: </label>
                    <input type="email" id="signup-email" ref={emailRef} />
                </div>
                <div className="signup-password">
                    <label htmlFor="signup-password">Password: </label>
                    <input type="password" id="signup-password" ref={passwordRef} />
                </div>
                <div className="signup-password2">
                    <label htmlFor="signup-password2">Confirm Password: </label>
                    <input type="password" id="signup-password2" ref={password2Ref} />
                </div>
                <div className="signup-button-div"><button className='signup-button' disabled = {inProcess} onClick={signUpHandler}>Sign Up</button></div>
                <div className="error-message">{!success && error}</div>
            </div>
        </div>
    )
}