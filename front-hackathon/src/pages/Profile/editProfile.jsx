import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import myAxios from "../../utils/axios";

export default function EditProfile() {
    const user = useSelector(state => state.auth.user?.user);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        bio: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Remplissage du formulaire avec les infos actuelles
        if(user){
            setFormData({
                username: user.username,
                email: user.email,
                bio: user.bio || ""
            });
        }
    }, [user]);

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await myAxios.put(`/users/${user.id}`, formData);
            if(response.data){
                setMessage("Profil mis à jour");
                setTimeout(() => {
                    navigate(`/profil/${user.id}`);
                }, 1500);
            }
        } catch (error) {
            setMessage("Erreur lors de la mise à jour");
        }
    };

    return (
        <div className="editProfileContainer">
            <h1>Modifier Mon Profil</h1>
            <form onSubmit={handleSubmit}>
                <label>Nom d'utilisateur:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                />
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
                <label>Bio:</label>
                <textarea 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange}
                />
                <button type="submit">Enregistrer</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}
