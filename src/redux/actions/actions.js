import { BEGIN_LOADING_MESSAGES, BEGIN_SIGNUP_PROCESS, EDIT_MESSAGES, ERROR_LOADING_MESSAGES, LOGIN_PROCESS_BEGIN, LOGIN_PROCESS_ERROR, RESET_USER, SET_USER, SET_USERNAME, SIGNUP_PROCESS_ERROR, SIGNUP_PROCESS_SUCCESS, SUCCESS_LOADING_MESSAGES } from "./actions_types";
import firebase from '../../firebaseConfig';

const databaseRef = firebase.firestore()

export let setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export let resetUser = () => ({
    type: RESET_USER
})

export let startSignup = (userDetails) => {
    return async(dispatch) => {
        dispatch({
            type: BEGIN_SIGNUP_PROCESS
        })
        try {
            let usernameCheck = await databaseRef.collection('users').where('username', '==', userDetails.username).get()
            console.log(usernameCheck)
            if (usernameCheck.docs.length) {
                console.log('in username check')
                dispatch({
                    type: SIGNUP_PROCESS_ERROR,
                    payload: 'Username already exists'
                })
                return
            }
            console.log('Begin Email Check')
            let emailCheck = await databaseRef.collection('users').where('email', '==', userDetails.email).get()
            if (emailCheck.docs.length) {
                console.log('in email check')
                dispatch({
                    type: SIGNUP_PROCESS_ERROR,
                    payload: 'There already exists an account with this email!'
                })
                return
            }
            console.log('Before creation')
            firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    console.log(user)
                        // ...
                })
                .catch((error) => {
                    alert('Error: ' + error.message)
                        // ..
                });

            let response = await databaseRef.collection('users').add({ username: userDetails.username, email: userDetails.email })
            console.log(response)
            dispatch({
                type: SIGNUP_PROCESS_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: SIGNUP_PROCESS_ERROR,
                payload: error + ', Something went wrong!'
            })
        }
    }
}

export let logIn = (email, password) => {
    return async(dispatch) => {
        console.log('in login')
        dispatch({
            type: LOGIN_PROCESS_BEGIN
        })
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async(userCredential) => {
                // Signed in
                dispatch(setUser(userCredential.user))
                let userInDB = await databaseRef.collection('users').where('email', '==', email).get()
                let username = userInDB.docs[0].data().username
                console.log(username)
                dispatch({
                        type: SET_USERNAME,
                        payload: username
                    })
                    // ...
            })
            .catch((error) => {
                dispatch({
                    type: LOGIN_PROCESS_ERROR,
                    payload: error.message
                })
            });
    }
}

export let loadUserMessages = (email) => {
    return async(dispatch) => {
        dispatch({
            type: BEGIN_LOADING_MESSAGES
        })

        try {
            let user = await databaseRef.collection('users').where('email', '==', email).get()
            let userId = user.docs[0].id
            let response = await databaseRef.collection('users').doc(userId).collection('feedback').get()
            let messages = []
            response.forEach(doc => messages.push({...doc.data(), id: doc.id }))
            console.log(messages)
            dispatch({
                type: SUCCESS_LOADING_MESSAGES,
                payload: messages
            })
        } catch (error) {
            dispatch({
                type: ERROR_LOADING_MESSAGES,
                payload: error.message
            })
        }
    }
}

export let submitFeedback = (username, message) => {
    return async(dispatch) => {
        console.log(username, message)
        try {
            let user = await databaseRef.collection('users').where('username', '==', username).get()
            let userId = user.docs[0].id
            let response = await databaseRef.collection('users').doc(userId).collection('feedback').add({ message: message })
            console.log(response)
            alert('Feedback submitted successfully!')
        } catch (error) {
            alert('Error: ' + error)
        }
    }
}

export let removeMessage = (email, id, messages) => {
    return async(dispatch) => {
        try {
            let user = await databaseRef.collection('users').where('email', '==', email).get()
            let userId = user.docs[0].id
            let response = await databaseRef.collection('users').doc(userId).collection('feedback').doc(id).delete()
            console.log(response)
            let newMessages = messages.filter(message => message.id !== id)
            dispatch({
                type: EDIT_MESSAGES,
                payload: newMessages
            })
        } catch (error) {
            alert('Error: ' + error)
        }
    }
}