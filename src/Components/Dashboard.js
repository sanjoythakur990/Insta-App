import React,{useState} from "react";
import axios from "axios";

const Dashboard=({token})=>{
    const [message, setMessage] = useState("");
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
        }
        catch(err){
            console.log("Error", err);
            setMessage(err.response.data.message)
        }
    }
    return (
        <div>
            <h1>Dashboard</h1>
            {message && <h2>{message}</h2>}
            <button onClick={getJoke}>Get Joke</button>
        </div>
    )
}

export default Dashboard