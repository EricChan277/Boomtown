import React from 'react';
// import Masonry from "react-masonry-component";
import {
    Card,
    // CardActions,
    CardHeader
    // CardMedia,
    // CardTitle
    // CardText
} from 'material-ui/Card';
// import FlatButton from "material-ui/FlatButton";
import Gravatar from 'react-gravatar';
// import { Link } from "react-router-dom";

import './styles.css';

const Profile = ({ profileData }) => (
    // console.log(profileData);

    <Card className="profileCard">
        <CardHeader
            avatar={<Gravatar email={profileData.email} />}
            title={profileData.fullname}
        />
        {/* <p> hello </p> */}
    </Card>
);
export default Profile;
