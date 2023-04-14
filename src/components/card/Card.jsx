
import { Link } from 'react-router-dom'

const Card = ({back, user}) => {

    const urlImg = "https://shareurlife-23-back.onrender.com/images/"
    
    return (
        <div className={back === true ? "card background" : "card"}>
            <div className="userImg">
                <img src={user && urlImg + user.profilPic} alt="" />
            </div>
            <div className="userInfos">
                <Link to={`/profile/${user && user.followedUserId}`}><span>{user && user.username}</span></Link>
                <span>{user && user.occupation}</span>
            </div>
        </div>
    );
};

export default Card;