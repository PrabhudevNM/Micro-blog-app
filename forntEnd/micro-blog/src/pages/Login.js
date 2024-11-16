import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Login() {
    const { handleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            email: email,
            password: password,
        };
        // runClientSideValidations()
        // after client side validations pass
        handleLogin(formData);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            placeholder='Enter email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}
