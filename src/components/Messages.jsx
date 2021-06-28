import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { loadUserMessages, removeMessage, resetUser } from "../redux/actions/actions"
import Message from "./Message"
import firebase from '../firebaseConfig'
import { useState } from "react"

export default function Messages() {
    const [baseUrl] = useState(window.location.href.substring(0, window.location.href.lastIndexOf('/')))
    const dispatch = useDispatch()
    const { user, username } = useSelector(state => state.user)
    const history = useHistory()
    const { messages, isLoading, error } = useSelector(state => state.messages)
    let getMessages = () => {
        console.log(user)
        dispatch(loadUserMessages(user.email))
    }

    let logoutHandler = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            dispatch(resetUser())
        }).catch((error) => {
            // An error happened.
            alert('Error: ' + error)
        });
    }

    let removeHandler = (id) => {
        dispatch(removeMessage(user.email, id, messages))
    }

    useEffect(() => {
        console.log(user, username)
        if (!user) {
            history.push('/')
        } else {
            getMessages()
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className="messages">
            <div className="profile">
                <img src="./blank-profile.png" alt="" />
                <p>{username}</p>
                <p>Your personalised feedback link: <a href = { baseUrl + `/${username}`} target = '_blank' rel = 'noreferrer noopener'>{ baseUrl + `/${username}`}</a></p>
                <button className="logout" onClick={logoutHandler}>Logout</button>
            </div>
            <div className="display-messages">
                {isLoading && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}
                {messages.length > 0 && messages.map((message, index) => <Message message={message.message} key={index} id={message.id} method={removeHandler} />)}
            </div>
        </div>
    )
}