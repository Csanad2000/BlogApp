import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import LinkItem from './LinkItem';
import {FEED_SEARCH_QUERY} from '../constants';

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
                    <LinkItem key={link.id} link={link} index={index}/> //site malfunctions after second voting on found link (search/vote/duplicate vote, narrow down)
                ))}
        </div>
    );
};

export default Search;