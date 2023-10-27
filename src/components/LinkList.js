import React from 'react';
import LinkItem from './LinkItem';
import {useQuery, gql} from '@apollo/client';

export const FEED_QUERY = gql`
query {
    feed {
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

const LinkList = () => {
    const {data} = useQuery(FEED_QUERY);

    return (
        <div>
            {data && <>
                {data.feed.links.map((link, index) => (
                    <LinkItem key = {link.id} link = {link} index = {index}/>
                ))}
            </>
            }
        </div>
    );
};

export default LinkList;