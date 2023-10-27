import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import LinkItem from './LinkItem';

const FEED_SEARCH_QUERY = gql`
query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
        id
        links {
            id
            url
            description
            createdAt
            postedBy {
                id
                name
            }
            votes {
                id
                user {
                    id
                }
            }
        }
    }
}
`;

const Search = () => {
    const [searchFilter, setSearchFilter] = useState('');
    const [executeSearch, {data}] = useLazyQuery(FEED_SEARCH_QUERY);

    return (
        <div>
            Search
            <input
                type='text'
                onChange={(e) => setSearchFilter(e.target.value)}
            />
            <button onClick={() => executeSearch({
                variables: {filter: searchFilter}
            })}>OK</button>
            {data &&
                data.feed.links.map((link, index) => (
                    <LinkItem key={link.id} link={link} index={index}/>
                ))}
        </div>
    );
};

export default Search;