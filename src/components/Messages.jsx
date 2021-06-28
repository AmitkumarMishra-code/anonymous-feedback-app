import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { loadUserMessages } from "../redux/actions/actions"
import Message from "./Message"

export default function Messages() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const history = useHistory()
    const { messages, isLoading, error } = useSelector(state => state.messages)
    let getMessages = () => {
        console.log(user)
        dispatch(loadUserMessages(user.email))
    }

    useEffect(() => {
        if (!user) {
            history.push('/')
        }
        getMessages()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="messages">
            <div className="profile">
                <img src="./blank-profile.png" alt="" />
                <p>{user.email}</p>
            </div>
            <div className="display-messages">
                {isLoading && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}
                {messages.length > 0 && messages.map((message, index) => <Message message={message.message} key={index} id={message.id} />)}
            </div>
        </div>
    )
}