import React, { Component } from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../../components/Loader';
// import { getDatafromUrls } from '../../redux/modules/items';
import Items from './Items';

const fetchItems = gql`
    query {
        items {
            id
            title
            description
            imageurl
            tags
            itemowner {
                id
                fullname
                email
            }
            created
            available
            borrower {
                id
                fullname
                email
            }
        }
    }
`;

class ItemsContainer extends Component {
    // filterItems = itemsData => {
    //     if (itemsData.itemFilters.length > 0) {
    //         const filteredItems = itemsData.items.filter(
    //             item =>
    //                 item.tags.filter(tag =>
    //                     itemsData.itemFilters.find(filter => filter === tag)
    //                 ).length
    //         );
    //         return filteredItems;
    //     }
    //     return itemsData.items;
    // };

    render() {
        return (
            <Query query={fetchItems}>
                {({ loading, error, data }) => {
                    if (loading) return <Loader />;
                    if (error) return <p>Error!</p>;

                    return <Items itemsData={data.items} />;
                }}
            </Query>
        );
    }
}

// ItemsContainer.propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     isLoading: PropTypes.object.isRequired,
//     itemsData: PropTypes.array.isRequired
// };

// const mapStateToProps = state => ({
//     itemFilters: state.items.itemFilters
// });

export default ItemsContainer;
