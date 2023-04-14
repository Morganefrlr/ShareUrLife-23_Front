
import WritePost from '../components/writePost/WritePost.jsx';
import Post from '../components/post/Post.jsx';
import WidgetFriends from '../components/widgetFriends/WidgetFriends.jsx';
import { request } from '../axios.js';
import {AuthContext} from '../authContext.js'

import { useContext, useEffect, useState } from 'react';


const Home = () => {
    const {userOnline} = useContext(AuthContext)
    const [post, setPost] = useState([])
    const [followed, setFollowed] = useState()

    useEffect(() => {
        const fetchPost = async () =>{
            await request.get('/post')
            .then(res => {
                setPost(res.data.reverse())
            })
        }
        fetchPost()
    },[])

////////////////////////////////// GET FOLLOWED //////////////////////////////////
    useEffect(() => {
        const fetchFollowed = async () =>{
            const id = userOnline && userOnline
            await request.get('/relation/followed/' + id)
            .then(res => {
                setFollowed(res.data)
            })
        }
        fetchFollowed()
    },[userOnline]) 


    return (
        <div className='home'>
            <div className="home_right">
                <WritePost />
                {post && post.map(item => 
                    <Post key={item.id} post={item}/>
                )}
            </div>
            <div className="home_left">
                <WidgetFriends followed={followed} userId={userOnline}/>
            </div>
        </div>
    );
};

export default Home;