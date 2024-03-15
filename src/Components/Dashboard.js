import React,{useState, useEffect, useContext} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";


const Dashboard=()=>{
    const [message, setMessage] = useState("");
    const [name, setName]= useState("")
    const {token, setToken} =useContext(UserContext)
    const navigate =useNavigate()

    useEffect(()=>{
        getJoke()
    }, [token])   // the code will execute whenever this component gets loaded in case of empty array

    useEffect(()=>{
        if(!token){
            let jsonToken= localStorage.getItem("token");
            console.log(typeof(jsonToken), jsonToken);
            if(!jsonToken){
                navigate("/login")
            }
            else{
                setToken(jsonToken)
            }
        }
    }, [])
    async function getJoke(){
        console.log("abc");
        try{
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            setMessage(response.data.data.message);
            setName(response.data.data.user.name)
        }
        catch(err){
            console.log("Error", err);
            setMessage(err.response.data.message)
        }
    }

    function logout(){
        try{
            const response = axios.delete("https://instagram-express-app.vercel.app/api/auth/logout", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setToken("")
            setName("")
            setMessage("")
            alert("Logout Successful")
            navigate("/login")
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            <div className="logout">
                <button onClick={logout}>Logout</button>
            </div>
            <h1>Welcome {name}</h1>
            {message && <p>{message}</p>}
            {/* <button onClick={getJoke}>Get Joke</button> */}
        </div>
    )
}

export default Dashboard