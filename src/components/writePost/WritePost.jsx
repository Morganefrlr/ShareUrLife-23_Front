import CancelIcon from '@mui/icons-material/Cancel';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImageIcon from '@mui/icons-material/Image';

import { useContext, useState } from "react";
import { AuthContext } from "../../authContext";
import { request } from "../../axios";





const WritePost = () => {


    const urlImg = "https://shareurlife-23-back.onrender.com/images/"
    const {userInfos} = useContext(AuthContext)


    const[file, setFile] = useState(null)
    const[desc, setDesc] = useState("")
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(desc === ""){
            alert('Ecrivez quelque chose...')
        }
        else{
            const newPost = {
                desc,
            }
            if (file){
                const data= new FormData()
                const filename = Date.now() + file.name
                data.append('name', filename)
                data.append('file', file)
                newPost.img = filename
                try{
                    await request.post('/upload', data)
                }
                catch(err){
                    console.log(err)
                }
            }
            try {
                await request.post('/post/add', newPost)
                window.location.reload()
            }
            catch(err){
                console.log(err)
            }
        }    
    }





    return (
        <div className="writePost">
            <div className="writePost_top">
                <div className="userImg">
                    <img src={userInfos && urlImg + userInfos.profilPic} alt="" />
                </div>
                <textarea className={file ? "width" : ""} name="" id="" cols="30" rows="10" placeholder="Partagez vos envies......." required onChange={e => setDesc(e.target.value)}></textarea>
                {file && 
                    <div className="filePost">
                        <img src={URL.createObjectURL(file)} alt="" className="imgPost"/>
                        <CancelIcon className="icon" onClick={() => setFile(null)} />
                    </div>
                }
            </div>
            <hr />
            <div className="writePost_bottom">
                <div className="item">
                    <PersonOutlineIcon className="item_icon" />
                </div>
                <div className="item">
                    <LocationOnIcon className="item_icon" />
                </div>
                <div className="item">
                    <input type="file" id="file" style={{display : 'none'}} onChange={e => setFile(e.target.files[0])} />
                    <label htmlFor="file">
                        <ImageIcon className="item_icon"/>
                    </label>
                </div>
                <button onClick={handleSubmit}>Publiez!</button>
            </div>
        </div>
    );
};

export default WritePost;