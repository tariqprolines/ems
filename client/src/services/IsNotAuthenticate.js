import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const IsNotAuthenticate = () => {
    const auth = localStorage.getItem('jwt');
    const navigate = useNavigate()
    useEffect(() => {
     if(auth == null){
       navigate('/')
     }
    }, [auth])
}

export default IsNotAuthenticate