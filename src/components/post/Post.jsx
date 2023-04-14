import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsIcon from '@mui/icons-material/Textsms';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {Link} from 'react-router-dom'
import moment from 'moment'
import { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../authContext';
import { request } from '../../axios';
import Comment from '../comment/Comment';


const Post = ({post}) => {
    const [open, setOpen]= useState(false)
    const {userOnline} = useContext(AuthContext)
    const urlImg = "https://shareurlife-23-back.onrender.com/images/"
    const[update, setUpdate] = useState(false)
    const [desc, setDesc] = useState(post && `${post.desc}`)
    const[openComment, setOpenComment] = useState(false)
    const [comments, setComments] = useState()
    const[likes, setLikes] = useState()
    const postId = post && post.id

    ////////////////////////////////// UPDATE POST //////////////////////////////////
    const handleUpdate = async e =>{
        const updatePost = {
            desc,
            img: post && post.img,
        }
        try{
            await request.put("/post/" + postId, updatePost)
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
            await request.delete('/post/' + postId)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }


    ////////////////////////////////// ADD COMMENT NUMBER ////////////////////////////////// 
    useEffect(() => {
        const fetchComments = async () =>{
            await request.get('/comment/' + postId)
            .then(res => {
                setComments(res.data)
            })
        }
        fetchComments()
    },[postId])



    ////////////////////////////////// CREATE LIKE ////////////////////////////////// 
    const handleLike = async e =>{
        e.preventDefault()
        const newLike = {
            postId
        }
        try{
            await request.post('/like', newLike)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }

    ////////////////////////////////// ADD LIKE ////////////////////////////////// 
    useEffect(() => {
        const fetchLikes = async () =>{
            await request.get('/like/' + postId)
            .then(res => {
                setLikes(res.data)
            })
        }
        fetchLikes()
    },[postId])

    ////////////////////////////////// DELETE LIKE ////////////////////////////////// 
     const handleDeleteLike = async e =>{
        e.preventDefault()
        try{
            await request.delete('/like/' + postId)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <div className="post">
            <div className="post_top">
                <div className="userImg">
                    <img src={post && urlImg + post.profilPic} alt="" />
                </div>
                <div className="postInfos">
                    <Link to={`/profile/${post.userId}`}><span>{post && post.username}</span></Link>
                    <span>{moment(post && post.createdAt).fromNow()}</span>
                </div>
                <div className="menu">
                    {userOnline && post && userOnline === post.userId &&
                      <MoreHorizIcon className='icon' onClick={() => setOpen(true)}/>
                    }
                        {open === true &&
                            <div className='menuOpen'>
                                <BorderColorIcon className='menuOpen_icon' onClick={() => {setUpdate(true); setOpen(false)}}/>
                                <DeleteForeverIcon className='menuOpen_icon' onClick={handleDelete}/>
                                <hr />
                                <CloseIcon className='menuOpen_icon' onClick={() => setOpen(false)}/>
                            </div>
                        }
                </div>
            </div>
            <div className="post_desc">
                {update ? ( <textarea name="desc"  cols="30" rows="10" value={desc} required onChange={e => setDesc(e.target.value)}></textarea>) : ( <span>{post && post.desc}</span>)}
                {post && post.img &&
                    <img src={urlImg + post.img} alt="" />
                }
            </div>
            <div className="post_icons">
                {update === true && 
                    <div className="item">
                        <CheckCircleIcon className='icon green' onClick={handleUpdate}/>
                    </div>
                }
                <div className="item">
                    {likes && likes.includes(userOnline) ? (<FavoriteIcon className='icon red' onClick={handleDeleteLike}/>) : (<FavoriteBorderIcon className='icon' onClick={handleLike}/>)}
                    
                    <span>{likes && likes.length}</span>
                </div>
                <div className="item">
                    <TextsmsIcon className='icon' onClick={() => setOpenComment(true)}/>
                    <span>{comments && comments.length}</span>
                </div>
            </div>
            {openComment && 
                <Comment  postId={post.id}/>
            }
        </div>
    );
};

export default Post;