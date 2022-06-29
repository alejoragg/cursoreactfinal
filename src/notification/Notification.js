import { useState, createContext, useContext } from "react"
import { Alert } from "reactstrap"

const Notification = ({message, type}) => {

    if(message === '') {
        return 
    }
    return(
        <Alert color={type} className='position-absolute'>
            {message}
        </Alert>
    )
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [message, setMessage] = useState('')
    const [type, setType] = useState('success')

    const setNotification = (type, message) => {
        setMessage(message)
        setType(type)
        setTimeout(() => {
            setMessage('')
        }, 2000)
    }   

    return (
        <NotificationContext.Provider value={{ setNotification }}>
            <Notification message={message} type={type}/>
            { children }
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}