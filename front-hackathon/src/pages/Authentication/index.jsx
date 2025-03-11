import { useEffect, useState } from "react";
import { login, register } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Authentication () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [page, setPage] = useState(true);

    const user = useSelector(state => state.auth)
    
    useEffect(() => {

        if(user.isAuthenticated) {
            navigate('/home')
        } else if (!user.Authentication) {
            navigate('/login')
        }
    }, [user])

    function handleLogin ({username, password}) {

        dispatch(login({username, password}))
        
    }

    function handleRegister ({email, username, password}) {
        
        dispatch(register({email, username, password}))
    }


    return (
        <>
            <div className="page-content">
                <div className="loginPage">
                    <div className="leftArea">
                        <h1>Authentification</h1>
                        <p>Bienvenue sur la page d'authentification!</p>
                    </div>
                    <div className="rightArea">

                        {page ? (
                                <div className="loginContainer">
                                <span>
                                    <p className="label-input">Username</p>
                                    <input className="input-primary" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                                </span>
                                <span>
                                    <p className="label-input">Password</p>
                                    <input className="input-primary" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </span>
                                <button className="btn-primary loginBtn" onClick={() => {handleLogin({username, password})}}>Connexion</button>
                            </div>
                        ) : (
                            <div className="loginContainer">
                            <span>
                                <p className="label-input">Email</p>
                                <input className="input-primary" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                            </span>
                            <span>
                                <p className="label-input">Username</p>
                                <input className="input-primary" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                            </span>
                            <span>
                                <p className="label-input">Password</p>
                                <input className="input-primary" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                            </span>
                            <button className="btn-primary loginBtn" onClick={() => {handleRegister({email, username, password})}}>Enregistrer</button>
                        </div>
                        )}
                        <button className="btn-primary" onClick={() => {setPage(!page)}}>
                            {page ? "Vous n'avez pas de compte?" : "Vous avez déjà un compte?"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}