import { useState, useContext } from 'react' 
import AuthContext from '../context/AuthContext'
import "../register.css"

export default function Register(){
    const { handleRegister} = useContext(AuthContext)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: email,
            password: password
        }
        // runClientSideValidations() 
        // after client side validations pass
        handleRegister(formData)
        setEmail('')
        setPassword('')
    }
    return (
        <div className='form-group'>
            <h2>Register Page</h2>
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input 
                    type="text" 
                    placeholder='Enter email' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                /> <br />
                </div>
            <div className='form-group'>
                <input 
                    type="password" 
                    placeholder='Enter password' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                /> <br /> 
                </div>
                <input type="submit" />
            </form>
        </div>
    )
}