import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import {AuthContext} from '../../authContext.js'

import { NavLink, Link } from 'react-router-dom';
import { useContext, useState } from 'react';

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const {logout, userInfos} = useContext(AuthContext)
    const urlImg = "https://shareurlife-23-back.onrender.com/images/"
    

    return (
        <>
        <div className='navbar'>

            <div className='navbar_searchBar'>
                <SearchIcon className='icon'/>
                <input type="text" placeholder='Chercher...'/>
            </div>

            <div className='navbar_user'>
                <div className='navbarUserCircle'>
                    <img src={userInfos && urlImg + userInfos.profilPic} alt="" className='navbarUserImg'/>
                </div>
                <span className='navbarUserName'>{userInfos && userInfos.username}</span>
            </div>

            <div className='navbar_menu'>
                <NavLink to='/' end className={({isActive}) => isActive ? 'navbarMenuItem actif' : 'navbarMenuItem'}>
                    <AccessTimeIcon className='icon'/>
                    <span>Feed</span>
                </NavLink>
                <NavLink to={`/profile/${userInfos && userInfos.id}`} className={({isActive}) => isActive ? 'navbarMenuItem actif' : 'navbarMenuItem'}>
                    <PersonOutlineIcon className='icon'/>
                    <span>Profil</span>
                </NavLink>
                <NavLink to={`/friends/${userInfos && userInfos.id}`} end className={({isActive}) => isActive ? 'navbarMenuItem actif' : 'navbarMenuItem'}>
                    <PeopleAltIcon className='icon'/>
                    <span>Friends</span>
                </NavLink>
            </div>

            {open === true ? (<CloseIcon className='menuIcon' onClick={() => setOpen(false)} />) : (<MenuIcon className='menuIcon' onClick={() => setOpen(true)}/>)}

            <div className='navbar_logout'>
                <LogoutIcon className='icon' onClick={() => {logout()}}/>
            </div>

            <Link to={'/credits'} className='navbar_credits'><span>@Credit Images</span></Link>

        </div>
        {open === true && 
            <div className='menuIconOpen'>
                <Link to={'/'}><span onClick={() => setOpen(false)}>Feed</span></Link>
                <hr />
                <Link to={`/profile/${userInfos && userInfos.id}`}><span onClick={() => setOpen(false)}>Profil</span></Link>
                <hr />
                <Link to={`/friends/${userInfos && userInfos.id}`}><span onClick={() => setOpen(false)}>Friends</span></Link>
                <hr />
                <LogoutIcon className='icon' onClick={() => {logout()}}/>
            </div>
        }
        
        </>
    );
};

export default Navbar;