import React from 'react';
import {AUTH_TOKEN, LINKS_PER_PAGE} from '../constants';
import {timeDifferenceForDate} from '../utils';
import { useMutation } from '@apollo/client';
import {FEED_QUERY, VOTE_MUTATION} from '../constants';

const LinkItem = (props) => {
    const {link} = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const take = LINKS_PER_PAGE;
    const skip = 0;
    const orderBy = {createdAt:'desc'};

    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id
        },
        update: (cache, {data: {vote}}) => {
            const {feed} = cache.readQuery({
                query: FEED_QUERY,
                variables: {
                    take,
                    skip,
                    orderBy
                }
            });

            const updatedLinks = feed.links.map((feedLink) => {
                if(feedLink.id === link.id) {
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote] //multiple votes possible in cache, unless no vote is returned by the mutation?
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
                },
                variables: {
                    take,
                    skip,
                    orderBy
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