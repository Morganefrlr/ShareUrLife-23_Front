import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SettingsIcon from '@mui/icons-material/Settings';

import WidgetFriends from '../components/widgetFriends/WidgetFriends.jsx';
import WidgetImg from '../components/widgetImg/WidgetImg';
import WidgetUser from '../components/widgetUser/WidgetUser';
import Post from '../components/post/Post';
import {request } from '../axios.js'
import {AuthContext} from '../authContext.js'

import { useContext} from 'react';
import { Link, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'


const Profile = () => {
    const params = useParams()
    const id = parseInt(params.id)
    const {userOnline} = useContext(AuthContext)
    const queryClient = useQueryClient();
////////////////////////////////// FETCH USER //////////////////////////////////

    const { isLoading: loadUser, error: errorUser, data: user } = useQuery('user', () =>
        request.get('/user/' + id).then((res) => {
            return res.data
        })
    )

////////////////////////////////// FETCH POST //////////////////////////////////

    const { isLoading: loadPosts, error: errorPosts, data: posts } = useQuery('posts', () =>
        request.get('/post/' + id).then((res) => {
            return res.data.reverse()
        })
    )

////////////////////////////////// GET FOLLOWER //////////////////////////////////

    const { data : follower } = useQuery('follower', () =>
        request.get('/relation/follower/' + id).then((res) => {
            return res.data
        })
    )

////////////////////////////////// GET FOLLOWED //////////////////////////////////

    const { data : followed } = useQuery('followed', () =>
        request.get('/relation/followed/' + id).then((res) => {
            return res.data
        })
    )




////////////////////////////////// ADD FRIEND //////////////////////////////////
    
    const mutationFriend = useMutation(
        (relation) => {
          if (relation) return request.post('/relation', {followedUserId:id});
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["follower"]);
          },
        }
    );
    const handleRelation = () => {
        mutationFriend.mutate(id);
    };

////////////////////////////////// DELETE FRIEND //////////////////////////////////

    const mutation = useMutation(
        (relation) => {
          if (relation) return request.delete('/relation/' + id);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["follower"]);
          },
        }
    );
    const handleDeleteRelation = () => {
        mutation.mutate(id);
    };
   


    return (
        <div className="profil">
            {errorUser ? "Il y a une erreur!" : loadUser ? "En chargement!"
                    : <WidgetImg cover={user && user.coverPic} profil={user && user.profilPic} name={user && user.username} userId={user.id}/>
            }
            {id === userOnline && 
                <Link to={`/settings`}><SettingsIcon className='settingsIcon' /></Link>
            }
            {id !== userOnline && follower && follower.map(item => {
                return (
                    <div key={item.id}>
                    {item.followerUserId === userOnline ? (<PersonRemoveIcon className='settingsIcon' onClick={handleDeleteRelation}/>) : (<PersonAddIcon className='settingsIcon' onClick={handleRelation}/>)}
                    </div>
                )
            } )}
            {id !== userOnline && follower && follower.length === 0 &&
                <PersonAddIcon className='settingsIcon' onClick={handleRelation}/>
            }
            <div className="profil_infos">
                <div className="infosLeft">
                    <div className="title">
                        <span>Infos</span>
                    </div>
                    {errorUser ? "Il y a une erreur!" : loadUser ? "En chargement!"
                        : <WidgetUser location={user && user.location} birthday={user && user.birthday} from={user && user.from} occupation={user && user.occupation}/>
                    }
                    <div className="title">
                        <span>Friends</span>
                    </div>
                    {errorUser ? "Il y a une erreur!" : loadUser ? "En chargement!"
                        : <WidgetFriends followed={followed} userId={user.id}/>
                    }
                </div>
                <div className="infosRight">
                    <div className="title">
                        <span>Posts</span>
                    </div>
                    {errorPosts ? "Il y a une erreur!" : loadPosts ? "En chargement!"
                        : posts && posts.map(item => <Post key={item.id} post={item}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;