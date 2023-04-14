
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import moment from "moment"
import { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom'

import { AuthContext } from '../../authContext';
import { request } from '../../axios';




const Comment = ({postId}) => {

    const urlImg = "https://shareurlife-23-back.onrender.com/images/"
    const {userInfos} = useContext(AuthContext)
    const [update, setUpdate] = useState()
    const [desc, setDesc] = useState()
    const [comment, setComment] = useState()
    const [ descUpdate, setDescUpdate] = useState()
   
 
   ////////////////////////////////// CREATE COMMENT ////////////////////////////////// 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newComment = {
            desc,
            postId,
        }
        try {
            await request.post('/comment/', newComment)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }


    ////////////////////////////////// ADD COMMENT ////////////////////////////////// 
    useEffect(() => {
        const fetchComment = async () =>{
            await request.get('/comment/' + postId)
            .then(res => {
                setComment(res.data.reverse())
            })
        }
        fetchComment()
    },[postId])

    ////////////////////////////////// UPDATE COMMENT ////////////////////////////////// 
    const handleUpdate = async e =>{
        const updateComment = {
            desc: descUpdate,
        }
        try{
            await request.put("/comment/" + update, updateComment)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }

    ////////////////////////////////// DELETE POST //////////////////////////////////

    const handleDelete = async e =>{
        e.preventDefault()
        try{
            await request.delete('/comment/' + update)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <div className="comment">
            <div className="comment_edit">
                <div className="top">
                    <div className="userImg">
                        <img src={urlImg + userInfos.profilPic} alt="" />
                    </div>
                    <textarea rows="1" placeholder="Partagez vos envies......." required onChange={e => setDesc(e.target.value)}></textarea>
                    <button onClick={handleSubmit}><SendIcon/></button>
                </div>
            </div>
            {comment && comment.map(item =>
                <div className='comment_read' key={item.id}>
                    <div className="userImg">
                        <img src={urlImg + item.profilPic} alt="" />
                    </div>
                    <div className="left">
                        <div className='top'>
                            <div className="comInfos">
                                <Link to={`/profile/${item.userId}`}><span>{item.username}</span></Link>
                                <span>{moment(item.createdAt).fromNow()}</span>
                            </div>
                            {userInfos && userInfos.id === item.userId &&
                                <div className="comIcons">
                                    {update ? (
                                        <>
                                            <CheckCircleIcon className='icon' onClick={handleUpdate}/>
                                            <DeleteForeverIcon className='icon' onClick={handleDelete}/>
                                        </>
                                    ) : (<BorderColorIcon className='icon' onClick={() => {setUpdate(item.id); setDescUpdate(item.desc)}}/>)}
                                </div>
                            
                            }
                            
                        </div>
                        {update && update === item.id ? 
                        ( <textarea className='comDescEdit' name="desc" rows="1" value={descUpdate} required onChange={e => setDescUpdate(e.target.value)}></textarea>)
                        : 
                        ( <span className='comDesc'>"{item.desc}"</span>)}

                    </div>
                </div>
            )}
            
        </div>
    );
};

export default Comment;