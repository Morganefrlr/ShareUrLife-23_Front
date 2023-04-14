import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SettingsIcon from '@mui/icons-material/Settings';

import WidgetFriends from '../components/widgetFriends/WidgetFriends.jsx';
import WidgetImg from '../components/widgetImg/WidgetImg';
import WidgetUser from '../components/widgetUser/WidgetUser';
import Post from '../components/post/Post';
import {request } from '../axios.js'
import {AuthContext} from '../authContext.js'

import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'





const Profile = () => {
    const params = useParams()
    const id = parseInt(params.id)
    const [user, setUser] = useState()
    const {userOnline} = useContext(AuthContext)
    const userId = user && user.id
    const [posts, setPosts] = useState()
    const [follower, setFollower] = useState()
    const [followed, setFollowed] = useState()
    const[icon, setIcon] = useState(null)
////////////////////////////////// FETCH USER //////////////////////////////////

    useEffect(() => {
        const fetchUser = async () => {
            request.get('user/' + id)
            .then(res => {
                setUser(res.data)
            })
        }
        fetchUser()
    },[id])

////////////////////////////////// FETCH POST //////////////////////////////////

    useEffect(() => {
        const fetchPost = async () =>{
            await request.get('/post/' + userId)
            .then(res => {
                setPosts(res.data.reverse())
            })
        }
        fetchPost()
    },[userId]) 

////////////////////////////////// ADD FRIEND //////////////////////////////////
    const handleRelation = async e =>{
        const followedUserId = {
            followedUserId: userId
        }
        try{
            await request.post("/relation", followedUserId)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }

////////////////////////////////// DELETE FRIEND //////////////////////////////////
    const handleDeleteRelation = async e =>{
        try{
            await request.delete("/relation/" + userId)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }
////////////////////////////////// GET FOLLOWER //////////////////////////////////
    useEffect(() => {
        const fetchFollower = async () =>{
            await request.get('/relation/follower/' + id)
            .then(res => {
                setFollower(res.data)
            })
        }
        fetchFollower()
    },[id]) 

////////////////////////////////// GET FOLLOWED //////////////////////////////////
    useEffect(() => {
        const fetchFollowed = async () =>{
            await request.get('/relation/followed/' + id)
            .then(res => {
                setFollowed(res.data)
            })
        }
        fetchFollowed()
    },[id]) 

////////////////////////////////// GET FOLLOWED USER ONLINE//////////////////////////////////
    useEffect(() => {
        const fetchFollowed = async () =>{
            await request.get('/relation/'+ userOnline)
            .then(res => {
                for(let i = 0; i < res.data.length; i++ ){
                    if(res.data[i].followedUserId === id){
                        setIcon(true)
                        break
                        
                    }
                    else if(res.data[i].followedUserId !== id){
                        setIcon(false)
                    }
                }
            })
        }
        fetchFollowed()
    },[userOnline, id]) 

    return (
        <div className="profil">
            <WidgetImg cover={user && user.coverPic} profil={user && user.profilPic} name={user && user.username} userId={userId}/>
            {id === userOnline && 
                <Link to={`/settings`}><SettingsIcon className='settingsIcon' /></Link>
            }
            {id !== userOnline && icon && icon &&
                <PersonRemoveIcon className='settingsIcon' onClick={handleDeleteRelation}/>
            }
            {id !== userOnline && icon === false &&
                <PersonAddIcon className='settingsIcon' onClick={handleRelation}/>
            }
            {id !== userOnline && follower && follower.length === 0 &&
                <PersonAddIcon className='settingsIcon' onClick={handleRelation}/>
            }
            <div className="profil_infos">
                <div className="infosLeft">
                    <div className="title">
                        <span>Infos</span>
                    </div>
                    <WidgetUser location={user && user.location} birthday={user && user.birthday} from={user && user.from} occupation={user && user.occupation}/>
                    <div className="title">
                        <span>Friends</span>
                    </div>
                    <WidgetFriends followed={followed} userId={userId}/>
                </div>
                <div className="infosRight">
                    <div className="title">
                        <span>Posts</span>
                    </div>
                    {posts && posts.map(item =>
                        <Post post={item} key={item.id}/>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Profile;