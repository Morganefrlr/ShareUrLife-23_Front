import { createContext, useEffect, useState } from "react";
import { request } from "./axios";



export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{


    const [userOnline, setUserOnline] = useState(
        JSON.parse(localStorage.getItem('userOnline')) || false
    )
    const login = async (inputs) =>{
        const res = await request.post('/auth/login', inputs)
        setUserOnline(res.data.id)
    }
    
    useEffect(() =>{
        localStorage.setItem('userOnline', JSON.stringify(userOnline))
    },[userOnline])

    const [userInfos, setUserInfos] = useState()

    useEffect(() =>{
        if(userOnline){
            const infosUser = async () =>{
            await request.get('/user/' + userOnline)
                .then(res =>{
                    setUserInfos(res.data)
                })
            }
            infosUser()
        }
        
    },[userOnline])

    const logout = async () => {
        await request.post('/auth/logout',{}, { withCredentials: true });
        localStorage.removeItem("userOnline");
        window.location = "https://shareyourlife-23.netlify.app/connect";
       
    };


    return(
        <AuthContext.Provider value={{ userOnline, login, userInfos, logout}}>
            {children}
        </AuthContext.Provider>
    )
}