import { useRef } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { submitFeedback } from "../redux/actions/actions"

export default function Feedback(props){
    const feedbackRef = useRef()
    const dispatch = useDispatch()

    let clickHandler = () => {
        dispatch(submitFeedback(props.match.params.id, feedbackRef.current.value))
    }

    return(
        <div className="feedback-form">
            <div className="profile">
                <img src="./blank-profile.png" alt="" />
                <p>{props.match.params.id}</p>
            </div>
            <div className="feedback-area">
                <label htmlFor="feedback-text-area">Leave constructive feedback</label>
                <textarea id = 'feedback-text-area' rows = '4' ref = {feedbackRef}/>
                <button className="submit" onClick = {clickHandler}>Submit</button>
            </div>
        </div>
    )
}