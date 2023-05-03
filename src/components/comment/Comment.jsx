
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import moment from "moment"
import { useState, useContext} from 'react';
import {Link} from 'react-router-dom'

import { AuthContext } from '../../authContext';
import { request } from '../../axios';
import { useQueryClient, useMutation } from "react-query";


const Comment = ({postId, comments}) => {

    const urlImg = "https://shareurlife-23-back.onrender.com/images/"
    const queryClient = useQueryClient();
    const {userInfos} = useContext(AuthContext)
    const [update, setUpdate] = useState()
    const [desc, setDesc] = useState()

    ////////////////////////////////// ADD COMMENT ////////////////////////////////// 

    const mutation = useMutation(
        (newComment) => {
          return request.post('/comment/', {desc, postId});
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
          },
        }
    );
    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId});
        setDesc("");

    };

    ////////////////////////////////// UPDATE COMMENT ////////////////////////////////// 
    const updateMutation = useMutation(
        (comment) => {
            console.log(comment)
          return request.put("/comment/" + update, comment);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
          },
        }
      );
      const handleUpdate = async (e) => {
        e.preventDefault();
        updateMutation.mutate({desc})
        setDesc("")
        setUpdate(false)
    };

    ////////////////////////////////// DELETE POST //////////////////////////////////
    const deleteMutation = useMutation(
        (commentId) => {
          return request.delete("/comment/" + commentId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
          },
        }
    );

    const handleDelete = (commentId) =>{
        deleteMutation.mutate(commentId)
    }
   



    return (
        <div className="comment">
            <div className="comment_edit">
                <div className="top">
                    <div className="userImg">
                        <img src={urlImg + userInfos.profilPic} alt="" />
                    </div>
                    <textarea rows="1" placeholder="Partagez vos envies......." required onChange={e => setDesc(e.target.value)} value={update ? "" : desc}></textarea>
                    <button onClick={handleSubmit}><SendIcon/></button>
                </div>
            </div>
            {comments && comments.map(item =>
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
                                            <DeleteForeverIcon className='icon' onClick={() => handleDelete(item.id)}/>
                                        </>
                                    ) : (<BorderColorIcon className='icon' onClick={() => {setUpdate(item.id); setDesc(item.desc)}}/>)}
                                </div>
                            }
                        </div>
                        {update && update === item.id ? 
                        ( <textarea className='comDescEdit' name="desc" rows="1" value={desc} required onChange={e => setDesc(e.target.value)}></textarea>)
                        : 
                        ( <span className='comDesc'>"{item.desc}"</span>)}
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default Comment;