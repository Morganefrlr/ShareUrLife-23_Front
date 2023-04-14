import { Link} from 'react-router-dom'

const WidgetImg = ({cover, profil, name, userId}) => {
    const urlImg = "https://shareurlife-23-back.onrender.com/images/"

    return (
        <>
            <div className="widgetImg">
                <img src={cover && urlImg + cover} alt="" className="imgCover"/>
                <div className="userImg">
                    <img src={profil && urlImg + profil} alt="" />
                </div>
            </div>
            <div className="widgetImg_name">
            <Link to={`/profile/${userId}`}><span>{name && name}</span></Link>
            </div>
        </>
    );
};

export default WidgetImg;