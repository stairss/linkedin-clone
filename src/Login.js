import { useState } from 'react';
import './Login.css'
import { auth } from './firebase';
import { login } from './features/userSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const dispatch = useDispatch()

    const loginToApp = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(userAuth => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    profileUrl: userAuth.user.photoURL,
                }))
            })
            .catch(error => alert(error));
    };
    const register = () => {
        if (!name) {
            return alert("Please enter a full name")
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(userAuth => {
                userAuth.user.updateProfile({
                    displayName: name,
                    photoURL: profilePic
                })
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: name,
                            photoURL: profilePic
                        }))
                    })
            })
            .catch(err => alert(err.message))
    }
    return (
        <div className="login">
            <img
                src="https://www.fort.pl/wp-content/uploads/2020/06/Linkedin-1.png"
                alt="linkin logo"
            />

            <form>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full name (required if registering)"
                />
                <input
                    type="text"
                    value={profilePic}
                    onChange={e => setProfilePic(e.target.value)}
                    placeholder="Profile picture URL (optional)"
                />
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>
            <p>Not a member?
                <span className="login__register" onClick={register}> Register Now</span>
            </p>
        </div>
    )
}

export default Login
