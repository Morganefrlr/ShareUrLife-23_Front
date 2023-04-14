import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useContext, useState } from "react";

import { request} from '../axios.js'
import {AuthContext} from '../authContext.js'

const Settings = () => {
    const {userInfos} = useContext(AuthContext)
    const[cover, setCover] = useState()
    const[profil, setProfil] = useState()
    const urlImg = "https://shareurlife-23-back.onrender.com/images/"


////////////////////////////////////// UPDATE LE COMPTE //////////////////////////////////////
    const [username, setUsername] = useState(userInfos && `${userInfos.username}`)
    const [email, setEmail] = useState(userInfos && `${userInfos.email}`)
    const [location, setLocation] = useState(userInfos && `${userInfos.location}`)
    const [birthday, setBirthday] = useState(userInfos && `${userInfos.birthday}`)
    const [from, setFrom] = useState(userInfos && `${userInfos.from}`)
    const [occupation, setOccupation] = useState(userInfos && `${userInfos.occupation}`)

    const handleUpdate = async (e) => {
        e.preventDefault()
        const userUpdate ={
            username,
            email,
            location,
            birthday,
            from,
            occupation,
            coverPic: userInfos && userInfos.coverPic,
            profilPic:  userInfos && userInfos.profilPic
        };
        if(cover) {
            const data =new FormData();
            const filename = Date.now() + cover.name;
            data.append("name", filename);
            data.append("file", cover);
            userUpdate.coverPic = filename;
            try {
              await request.post("/upload", data);
            } catch (err) {
                  console.log(err)
              }
        }
        if(profil) {
            const data =new FormData();
            const filename = Date.now() + profil.name;
            data.append("name", filename);
            data.append("file", profil);
            userUpdate.profilPic = filename;
            try {
              await request.post("/upload", data);
            } catch (err) {
                  console.log(err)
              }
        }
        try{
            console.log(userUpdate)
            await request.put('user/' + userInfos.id, userUpdate)
            window.location = `https://shareyourlife-23.netlify.app/profile/${userInfos.id}`
        }
        catch(err){
            console.log(err)
        }
    }




////////////////////////////////////// SUPPRIMER LE COMPTE //////////////////////////////////////

    const handleDelete = async e =>{
        e.preventDefault()
        try{
            alert('Vous êtes sur le point de supprimer votre compte')
            await request.delete('user/' + userInfos.id)
            window.location = "https://shareyourlife-23.netlify.app/connect"
        }
        catch(err){
            console.log(err)
        }
    }




    return (
        <div className="settings">
            <h1>Mettre votre profil à jour</h1>
            <DeleteForeverIcon className="icon" onClick={handleDelete}/>
            <div className="settings_top">
                <div className="coverSettings">
                    {cover ? 
                    (<img src={URL.createObjectURL(cover)} alt=''/>) : 
                    (<img src={userInfos ? urlImg + userInfos.coverPic : ""}alt=''/>) }
                    <input type="file" id="cover" style={{display : 'none'}} onChange={e => setCover(e.target.files[0])} />
                        <label htmlFor="cover">
                            <span>+</span>
                        </label>
                    <span>Changez votre photo de couverture</span>    
                </div>
                <div className="profilSettings">
                {profil ? 
                (<img src={URL.createObjectURL(profil)}alt=''/>) : 
                (<img src={userInfos ? urlImg + userInfos.profilPic : ""}alt=''/>) }
                    <input type="file" id="profil" style={{display : 'none'}} onChange={e => setProfil(e.target.files[0])} />
                        <label htmlFor="profil">
                            <span>+</span>
                        </label>
                    <span>Changez votre photo de couverture</span>
                </div>
            </div>
            <div className="settings_bottom">
                <div className="settingsItem">
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="settingsItem">
                    <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)}/>
                    <input type="text" placeholder="Birthday" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                    <input type="text" placeholder="From" value={from} onChange={e => setFrom(e.target.value)}/>
                    <input type="text" placeholder="Occupation" value={occupation} onChange={e => setOccupation(e.target.value)}/>
                </div>
                <div className="settingsItem">
                    <input type="text" placeholder="Facebook" />
                    <input type="text" placeholder="Instagram" />
                    <input type="text" placeholder="Pinterest" />
                </div>
            </div>
            <button onClick={handleUpdate}>Mettre à jour!</button>
        </div>
    );
};

export default Settings;