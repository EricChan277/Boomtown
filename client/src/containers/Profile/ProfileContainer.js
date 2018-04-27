import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../../components/Loader';
import Profile from './Profile';
import ItemCardList from '../../components/ItemCardList';

const profileData = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            email
            fullname
            bio
            owneditems {
                id
                description
                title
                tags
                imageurl
                created
                itemowner {
                    id
                }
            }
            borroweditems {
                id
            }
        }
    }
`;

class ProfileContainer extends Component {
    render() {
        const id = this.props.match.params.id;
        return (
            <Query query={profileData} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) return <Loader />;
                    if (error) return <p>Error!</p>;

                    return (
                        <div className="profileCardWrapper">
                            <Profile profileData={data.user} />
                            <ItemCardList itemsData={data.user.owneditems} />
                        </div>
                    );
                }}
            </Query>
        );
    }
}

// ProfileContainer.propTypes = {
// dispatch: PropTypes.func.isRequired
//     isLoading: PropTypes.object.isRequired,
//     items: PropTypes.array.isRequired
// };

export default connect(state => ({
    users: state.users,
    itemsData: state.itemsData,
    isLoading: state.isLoading
}))(ProfileContainer);
