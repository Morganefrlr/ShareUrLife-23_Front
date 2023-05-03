import CancelIcon from '@mui/icons-material/Cancel';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImageIcon from '@mui/icons-material/Image';

import { useContext, useState } from "react";
import { AuthContext } from "../../authContext";
import { request } from "../../axios";
import { useMutation, useQueryClient } from "react-query";




const WritePost = () => {


    const urlImg = "https://shareurlife-23-back.onrender.com/images/"
    const {userInfos} = useContext(AuthContext)
    const queryClient = useQueryClient();
    const[file, setFile] = useState(null)
    const[desc, setDesc] = useState("")

    const mutation = useMutation(
        (newPost) => {
          return request.post('/post/add', newPost);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
          },
        }
    );
    const handleSubmit = async (e) => {
        e.preventDefault();
        let img =""
        if (file){
            const data= new FormData()
            const filename = Date.now() + file.name
            data.append('name', filename)
            data.append('file', file)
            img = filename
            try{
                await request.post('/upload', data)
            }
            catch(err){
                console.log(err)
            }
        }
        mutation.mutate({ desc, img});
        setDesc("");
        setFile(null);
    };

    return (
        <div className="writePost">
            <div className="writePost_top">
                <div className="userImg">
                    <img src={userInfos && urlImg + userInfos.profilPic} alt="" />
                </div>
                <textarea className={file ? "width" : ""} name="" id="" cols="30" rows="10" placeholder="Partagez vos envies......." required onChange={e => setDesc(e.target.value)}  value={desc}></textarea>
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