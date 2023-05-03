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
import { useContext, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { AuthContext } from '../../authContext';
import { request } from '../../axios';
import Comment from '../comment/Comment';


const Post = ({post}) => {
    const urlImg = "https://shareurlife-23-back.onrender.com/images/"
    const [open, setOpen]= useState(false)
    const {userOnline} = useContext(AuthContext)
    const queryClient = useQueryClient();
    const[update, setUpdate] = useState(false)
    const [desc, setDesc] = useState(post && `${post.desc}`)
    const[openComment, setOpenComment] = useState(false)
    const postId = post && post.id
    const handleComment = () =>{
        if(!openComment){
            setOpenComment(true)
        }
        if(openComment){
            setOpenComment(false)
        }
    }

    ////////////////////////////////// UPDATE POST //////////////////////////////////
   
    const updateMutation = useMutation(
        (post) => {
          return request.put("/post/" + postId, post);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
          },
        }
      );
      const handleUpdate = async (e) => {
        e.preventDefault();
        updateMutation.mutate({desc, img: post && post.img})
        setUpdate(false)
    };
    ////////////////////////////////// DELETE POST //////////////////////////////////
    
    const deleteMutation = useMutation(
        (postId) => {
          return request.delete("/post/" + postId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
          },
        }
    );

    const handleDelete = () =>{
        deleteMutation.mutate(postId)
    }

    
    ////////////////////////////////// LIKE ////////////////////////////////// 
    
    const { isLoading, error, data } = useQuery(["likes", post.id], () =>
        request.get('/like/' + post.id).then((res) => {
            return res.data
        })
    )
    const mutation = useMutation(
        (liked) => {
          if (liked) return request.delete('/like/' + postId);
            return request.post('/like', {postId});
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["likes"]);
          },
        }
    );
    const handleLike = () => {
        mutation.mutate(data.includes(userOnline));
    };

    ////////////////////////////////// COMMENTS ////////////////////////////////// 
    const { data: coms } = useQuery(["comments", post.id], () =>
    request.get('/comment/' + post.id).then((res) => {
        return res.data 
    })
    )

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
                {error ? "Il y a une erreur!" : isLoading ? "En chargement!"
                    : data && data.includes(userOnline) ? 
                    (<FavoriteIcon className='icon red' onClick={handleLike}/>)
                    : 
                    (<FavoriteBorderIcon className='icon' onClick={handleLike} />)
                }
                    <span>{data && data.length}</span>
                </div>
                <div className="item">
                    <TextsmsIcon className='icon' onClick={handleComment}/>
                    <span>{coms && coms.length}</span>
                </div>
            </div>
            {openComment && 
                <Comment  postId={post.id} comments={coms} />
            }
        </div>
    );
};

export default Post;