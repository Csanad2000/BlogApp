import React from 'react';
import {AUTH_TOKEN} from '../constants';
import {timeDifferenceForDate} from '../utils';
import { gql, useMutation } from '@apollo/client';
import {FEED_QUERY} from './LinkList';

const VOTE_MUTATION = gql`
mutation VoteMutation(
    $linkId: ID!
) {
    vote(
        linkId: $linkId
    ) {
        id
        link {
            votes {
                id
                user {
                    id
                }
            }
        }
        user {
            id
        }
    }
}
`;

const LinkItem = (props) => {
    const {link} = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);

    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id
        },
        update: (cache, {data: {vote}}) => {
            const {feed} = cache.readQuery({
                query: FEED_QUERY
            });

            const updatedLinks = feed.links.map((feedLink) => {
                if(feedLink.id == link.id) { //maybe ===
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote] //multiple votes possible in cache
                    };
                }
                return feedLink;
            })

            cache.writeQuery({
                query: FEED_QUERY,
                data: {
                    feed: {
                        links: updatedLinks
                    }
                }
            });
        }
    });

    return (
        <div>
            <span>{props.index + 1}.</span>
            {authToken && (
                <div onClick={vote}>
                    ▲
                </div>
            )}
            <div>
                {link.description} ({link.url})
            </div>
            {(<div>
                {link.votes.length} votes | by {' '}
                {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                {timeDifferenceForDate(link.createdAt)}
            </div>)}
        </div>
    );
};

export default LinkItem;