export default function Message({message, id, method}){
    return(
        <div className="message">
            <p>{message}</p>
            <button className="remove" onClick = {() => method(id)}>
                x
            </button>
        </div>
    )
}