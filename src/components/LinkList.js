import React from 'react';
import LinkItem from './LinkItem';
import {useQuery, gql} from '@apollo/client';

const FEED_QUERY = gql`
query {
    feed {
        links {
            id
            url
            description
        }
    }
}
`;

const LinkList = () => {
    const {data} = useQuery(FEED_QUERY);

    return (
        <div>
            {data && <>
                {data.feed.links.map((link) => (
                    <LinkItem key = {link.id} link = {link}/>
                ))}
            </>
            }
        </div>
    );
};

export default LinkList;