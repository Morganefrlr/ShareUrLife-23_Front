import React, { useContext, useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

import { AuthContext} from '../authContext.js'

import {request } from '../axios.js'



const Connect = () => {
    const[slide, setSlide] = useState(true)
    const [file, setFile] = useState(null)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()


////////////////////////////////// LOGIN ////////////////////////////////// 
    


    const {login} = useContext(AuthContext)
    const [inputsLogin, setInputsLogin] = useState({
        email:"",
        password:""
    })
    
    const handleChangeLogin = e =>{
        const value = e.target.value
        setInputsLogin({
            ...inputsLogin,
            [e.target.name]:value
        })
    }
    const handleLogin = async e => {
        e.preventDefault()
        try{
            await login(inputsLogin)
            window.location = "https://shareyourlife-23.netlify.app/"
        }
        catch(err){
            console.log(err)
        }
    }


////////////////////////////////// REGISTER ////////////////////////////////// 

    const [errRegister, setErrRegister] = useState(null)
    const [errRegisPass, setErrRegisPass] = useState(false)
    const [errPassword, setErrPassword] = useState(false)
    const [errFile, setErrFile] = useState(false)


    const handlePassword = e =>{
        const regEx = /^[A-Za-z0-9]\w{8,}$/

        if(regEx.test(e.target.value)){
            setPassword(e.target.value)
            setErrPassword(false)
        }
        if(!regEx.test(e.target.value)){
            setErrPassword(true)
            setPassword(false)
        }
    }

    const handleRegister = async e =>{
        e.preventDefault();
        if(password){
            const newUser = {
                username,
                email,
                password
            }; 
            if(!file){
                setErrFile(true)
            } 
            if (file) {
            const data =new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newUser.profilPic = filename;
            try {
                await request.post("/upload", data);
            } catch (err) {}
            }
            try {
                await request.post("auth/register", newUser);
                alert('Votre compte a bien été crée, vous pouvez vous connecter.')
                window.location.reload()
            } catch (err) {
                setErrRegister(err.response.data)
            }
        } else if (!password){
            return setErrRegisPass(true)
        }
    }
   


    return (
        <div className='connectPage'>
            <div className={slide === true ? "connectMainBox" : "connectMainBox slider"}>

                {slide === false &&
                    <div className="connectMainBox_title">
                        <h1>Share your Life</h1>
                        <span>Vous avez déjà un compte?</span>
                        <button onClick={() => setSlide(true)}>Se Connecter</button>
                    </div>
                }
                {slide === true &&
                    <div className="connectMainBox_title">
                        <h1>Share your Life</h1>
                        <span>Vous n'avez pas de compte?</span>
                        <button onClick={() => setSlide(false)}>S'enregistrer</button>
                    </div>
                }
                
            </div>
            <div className={slide === true ? "sliderBox" : "sliderBox slide"}>
                    <div className="formSlider">
                        {slide === false && 
                            <>
                                <div className="formSlider_img">
                                    <input type="file" id='file' style={{display : "none"}} required onChange={e => setFile(e.target.files[0])}/>
                                    <label htmlFor="file">
                                        <div className='imgCircle'>
                                            <div className='imgBack'>{file ? (<img src={URL.createObjectURL(file)} alt="" className='imgBack'/>) : (<span>+</span>)}</div>
                                        </div>
                                    </label>
                                </div>
                                <form>
                                    <div className="formBox" >
                                        <MailOutlineIcon className='formBox_icon'/>
                                        <input type="text" placeholder='Email' required onChange={e => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="formBox">
                                        <AccountCircleIcon className='formBox_icon'/>
                                        <input type="text" placeholder='Username' required onChange={e => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="formBox">
                                        <LockIcon className='formBox_icon'/>
                                        <input type="password" placeholder='Mot de passe' required onChange={e => handlePassword(e)}/>
                                    </div>
                                    <button onClick={handleRegister}>S'enregistrer</button>
                                    {errRegister && 
                                        <span className="errMessageConnect">{errRegister}</span>
                                    }
                                    {errFile && 
                                        <span className="errMessageConnect">Vous devez ajouter une photo de profil</span>
                                    }
                                    {errRegisPass && 
                                        <span className="errMessageConnect">Votre mot de passe doit contenir minimum 8 caractères,dont au moins une majuscule, une minuscule et un chiffre.</span>
                                    }
                                </form>
                            </>
                        }
                        {slide === true && 
                            <>
                                <form className='connect'>
                                    <div className="formBox" >
                                        <MailOutlineIcon className='formBox_icon'/>
                                        <input type="text" placeholder='Email' name='email' onChange={handleChangeLogin}/>
                                    </div>
                                    <div className="formBox">
                                        <LockIcon className='formBox_icon'/>
                                        <input type="password" placeholder='Mot de passe' name="password" onChange={handleChangeLogin}/>
                                    </div>
                                    <button onClick={handleLogin}>Se Connecter</button>

                                </form>
                            </>
                        }
                    </div>
            </div>
        </div>
    );
};

export default Connect;