import React from 'react';
import LinkItem from './LinkItem';
import {useQuery} from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { LINKS_PER_PAGE, FEED_QUERY, NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../constants';

const LinkList = () => {
    const location = useLocation();
    const isNewPage = location.pathname.includes('new');
    const pageIndexParams = location.pathname.split('/');
    const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
    const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;
    const getQueryVariables = (isNewPage, page) => {
        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
        const take = isNewPage ? LINKS_PER_PAGE : 100;
        const orderBy = {createdAt: 'desc'};

        return {take, skip, orderBy};
    };
    const {data, loading, error, subscribeToMore} = useQuery(FEED_QUERY, {
        variables: getQueryVariables(isNewPage, page)
    });

    subscribeToMore({
        document: NEW_LINKS_SUBSCRIPTION,
        updateQuery: (prev, {subscriptionData}) => {
            if(!subscriptionData.data) return prev;
            const newLink = subscriptionData.data.newLink;
            const exists = prev.feed.links.find(
                ({id}) => id === newLink.id
            );
            if (exists) return prev;

            return Object.assign({}, prev, {
                feed: {
                    links: [newLink, ...prev.feed.links],
                    count: prev.feed.links.length + 1,
                    __typename: prev.feed.__typename
                }
            });
        }
    });

    subscribeToMore({
        document: NEW_VOTES_SUBSCRIPTION //does this work?
    });

    const getLinksToRender = (isNewPage, data) => {
        if(isNewPage) return data.feed.links;
        const rankedLinks = data.feed.links.slice();
        rankedLinks.sort(
            (l1, l2) => l2.votes.length - l1.votes.length
        );
        return rankedLinks;
    };

    const navigate = useNavigate();

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && <> 
                {getLinksToRender(isNewPage, data).map((link, index) => ( //are tags needed?
                    <LinkItem key = {link.id} link = {link} index = {index}/>
                ))}
                {isNewPage && <>
                    <div onClick={() => {
                        if (page > 1) {
                            navigate(`/new/${page - 1}`);
                        }
                    }}>
                        Previous
                    </div>
                    <div onClick={() => {
                        if (page <= data.feed.count / LINKS_PER_PAGE) {
                            navigate(`/new/${page + 1}`);
                        }
                    }}>
                        Next
                    </div>
                </>}
            </>}
        </div>
    );
};

export default LinkList;