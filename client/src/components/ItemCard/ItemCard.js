import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles';

const ItemCard = props => {
    const item = props.itemsData;
    return (
        <Card>
            <CardMedia>
                <img src={item.imageurl} alt="" />
            </CardMedia>
            <Link to={`/profile/${item.itemowner.id}`}>
                <CardHeader
                    style={{ borderRadius: '50%' }}
                    avatar={
                        <Gravatar
                            style={styles.avatar}
                            email={item.itemowner.email}
                        />
                    }
                    title={item.itemowner.fullname}
                />
            </Link>
            <CardTitle title={item.title} />
            <CardText>{item.description}</CardText>
            <CardActions>
                <FlatButton
                    backgroundColor={'black'}
                    hoverColor={'grey'}
                    labelStyle={styles.borrowBtn}
                    label="Borrow"
                />
            </CardActions>
        </Card>
    );
};

ItemCard.propTypes = {
    itemsData: PropTypes.object.isRequired
};

export default ItemCard;
