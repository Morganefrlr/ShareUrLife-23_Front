
import WritePost from '../components/writePost/WritePost.jsx';
import Post from '../components/post/Post.jsx';
import WidgetFriends from '../components/widgetFriends/WidgetFriends.jsx';
import { request } from '../axios.js';
import {AuthContext} from '../authContext.js'
import { useContext } from 'react';
import { useQuery } from 'react-query'



const Home = () => {
    const {userOnline} = useContext(AuthContext)



////////////////////////////////// GET POSTS //////////////////////////////////
    const { isLoading, error, data } = useQuery('posts', () =>
        request.get('/post').then((res) => {
            return res.data
        })
    )
   

////////////////////////////////// GET FOLLOWED //////////////////////////////////
    const { data : followed } = useQuery('followed', () =>
            request.get('/relation/followed/' + userOnline).then((res) => {
                return res.data
            })
    )


    return (
        <div className='home'>
            <div className="home_right">
                <WritePost />
                {error ? "Il y a une erreur!" : isLoading ? "En chargement!"
                    : data && data.map(item => 
                        <Post key={item.id} post={item}/>
                    )
                }
            </div>
            <div className="home_left">
                <WidgetFriends followed={followed} userId={userOnline}/>
            </div>
        </div>
    );
};

export default Home;