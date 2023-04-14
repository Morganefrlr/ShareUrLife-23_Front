import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';

const WidgetUser = ({location, birthday, from, occupation}) => {
    return (
        <div className='widgetUser'>
            <div className='widgetUser_item'>
                <span>Location</span>
                <span>{location && location}</span>
            </div>
            <hr />
            <div className='widgetUser_item'>
                <span>Birthday</span>
                <span>{birthday && birthday}</span>
            </div>
            <hr />
            <div className='widgetUser_item'>
                <span>From</span>
                <span>{from && from}</span>
            </div>
            <hr />
            <div className='widgetUser_item'>
                <span>Occupation</span>
                <span>{occupation && occupation}</span>
            </div>
            <hr />
            <div className='widgetUser_item'>
                <span>Social Media</span>
                <div className="social">
                    <FacebookIcon className='social_icon' />
                    <InstagramIcon className='social_icon'/>
                    <PinterestIcon className='social_icon'/>
                </div>
            </div>
        </div>
    );
};

export default WidgetUser;