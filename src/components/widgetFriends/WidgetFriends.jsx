import Card from '../card/Card.jsx'
import {Link} from 'react-router-dom'

const WidgetFriends = ({followed , userId}) => {
    return (
        <div className="widgetFriends">
            <div className="widgetFriends_top">
                <span>Friends</span>
            </div>
            <hr />
            <div className="widgetFriends_container">
                {followed && followed.map(item =>
                    <Card key={item.id} user={item}/>
                )}
            </div>
            <div className="widgetFriends_bottom">
                <Link to={`/friends/${userId}`}><span>Plus....</span></Link>
            </div>
            
        </div>
    );
};

export default WidgetFriends;