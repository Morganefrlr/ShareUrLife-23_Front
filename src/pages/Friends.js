import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';

import {request } from '../axios.js'
import WidgetImg from "../components/widgetImg/WidgetImg";
import Card from "../components/card/Card";

import { useState} from "react";
import {useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

const Friends = () => {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('Abonnements')
    const params = useParams()
    const id = parseInt(params.id)
   
////////////////////////////////// FETCH USER //////////////////////////////////

    const { isLoading: loadUser, error: errorUser, data: user } = useQuery('user', () =>
        request.get('/user/' + id).then((res) => {
            return res.data
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

    return (
        <div className="friends">
            <WidgetImg cover={user && user.coverPic} profil={user && user.profilPic} name={user && user.username} userId={id}/>
            <div className="friends_title">
                <div className="right">
                    <span>{title}</span>
                    {open ? (<KeyboardArrowRightIcon className="right_icon" onClick={() => setOpen(false)}/>) : (<KeyboardArrowLeftIcon className="right_icon" onClick={() => setOpen(true)}/>)}
                    {open === true &&
                        <div className="menu">
                            <span onClick={() => {setTitle('Abonnés'); setOpen(false)}}>Abonnés</span>
                            <span onClick={() => {setTitle('Abonnements'); setOpen(false)}}>Abonnement</span>
                        </div>
                    }
                </div>
                <div className="left">
                    <SearchIcon className="left_icon"/>
                    <input type="text" placeholder="Chercher..." />
                </div>
            </div>
            <div className="friends_container">
                {title === "Abonnements" && followed && followed.map(item =>
                    <Card back={true} user={item} key={item.id}/>
                )}
                {title === "Abonnés" && follower && follower.map(item =>
                    <Card back={true} user={item} key={item.id}/>
                )}
            </div>
        </div>
    );
};

export default Friends;