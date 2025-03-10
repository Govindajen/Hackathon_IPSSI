import { useState } from "react";

export default function Authentication () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function login ({username, password}) {
        
    }

    return (
        <>
            <div className="page-content">
                <div className="loginPage">
                    <div className="leftArea">
                        <h1>Authentication</h1>
                        <p>Welcome to the Authentication page!</p>
                    </div>

                    <div className="rightArea">
                        <span>
                            <p className="label-input">Username</p>
                            <input className="input-primary" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                        </span>
                        <span>
                            <p className="label-input">password</p>
                            <input className="input-primary" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </span>
                        <button className="btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}