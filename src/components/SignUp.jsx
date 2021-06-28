import { useEffect } from "react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { startSignup } from "../redux/actions/actions"

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
        if (passwordRef.current.value !== password2Ref.current.value) {
            alert(`Passwords don't match`)
            return
        }
        dispatch(startSignup({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }))

    }

    useEffect(() => {
        if (success) {
            usernameRef.current.value = ''
            emailRef.current.value = ''
            passwordRef.current.value = ''
            password2Ref.current.value = ''
            history.push('/')
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
                <div className="signup-button"><button className='signup' disabled = {inProcess} onClick={signUpHandler}>Sign Up</button></div>
                <div className="error-message">{!success && error}</div>
            </div>
        </div>
    )
}