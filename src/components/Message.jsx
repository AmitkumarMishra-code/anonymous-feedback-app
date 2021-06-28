import { useDispatch, useSelector } from "react-redux"
import { removeMessage } from "../redux/actions/actions"

export default function Message({message, id}){
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    let removeHandler = () => {
        dispatch(removeMessage(user.email, id))
    }
    return(
        <div className="message">
            <p>{message}</p>
            <button className="remove" onClick = {removeHandler}>
                x
            </button>
        </div>
    )
}