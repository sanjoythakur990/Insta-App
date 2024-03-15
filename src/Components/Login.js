import React,{useState, useContext} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [user, setUser]= useState({
        email:"",
        password: ""
    })

    const navigate=useNavigate();

    const {setToken}= useContext(UserContext);

    const {email, password}= user;

    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");

    function updateUser(e){
        let key=e.target.name;
        let value=e.target.value;
        setUser({...user, [key]: value})
    }

    async function implementLogin(e){
        e.preventDefault();
        // validations
        try{
            const response= await axios.post("https://instagram-express-app.vercel.app/api/auth/login",{
                "email": email,
                "password": password
            })
            console.log("Success", response.data);
            setSuccessMessage(response.data.message);
            setToken(response.data.data.token)
            // saving token in localStorage
            localStorage.setItem("token", response.data.data.token)
            setFailureMessage("")
            setUser({
                email:"",
                password: ""
            })
            alert("Login Successful")
            navigate("/dashboard")
        }
        catch(err){
            console.log("Failure", err);
            setFailureMessage(err.response.data.message);
            setSuccessMessage("")
        }
    }
    return (
        <div>
            <h1>Login</h1>
            {successMessage && <h2>{successMessage}</h2>}
            {failureMessage && <h2>{failureMessage}</h2>}
            <form onSubmit={implementLogin}>
                <input type="email" placeholder="Enter Email" name="email" value={email} onChange={updateUser}/>
                <input type="password" placeholder="Enter Password" name="password" value={password} onChange={updateUser}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login