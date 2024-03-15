import React,{useState, useContext} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Signup=()=>{
    const [user, setUser]= useState({
        name: "",
        email:"",
        password: "",
        confirmPassword:""
    })

    const navigate=useNavigate()
    const {setToken}= useContext(UserContext);
    const {name, email, password, confirmPassword}= user;
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");

    function updateUser(e){
        let key=e.target.name;
        let value=e.target.value;
        setUser({...user, [key]: value})
    }

    async function implementSignup(e){
        e.preventDefault();
        // validations
        try{
            const response= await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",{
                "name": name,
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
                name: "",
                email:"",
                password: "",
                confirmPassword:""
            })
            alert("Signup Successful")
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
            <h1>SignUp</h1>
            {successMessage && <h2>{successMessage}</h2>}
            {failureMessage && <h2>{failureMessage}</h2>}
            <form onSubmit={implementSignup}>
                <input type="text" placeholder="Enter Name" name="name" value={name} onChange={updateUser}/>
                <input type="email" placeholder="Enter Email" name="email" value={email} onChange={updateUser}/>
                <input type="password" placeholder="Enter Password" name="password" value={password} onChange={updateUser}/>
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={updateUser}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup