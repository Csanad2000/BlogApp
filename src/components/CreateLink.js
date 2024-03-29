import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LINKS_PER_PAGE, CREATE_LINK_MUTATION, FEED_QUERY } from '../constants';

const CreateLink = () => {
    const [formState, setFormState] = useState({
        description: '',
        url: ''
    });

    const navigate = useNavigate();

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description: formState.description,
            url: formState.url
        },
        onCompleted: () => navigate('/'),
        update: (cache, { data: { post } }) => {
            const take = LINKS_PER_PAGE;
            const skip = 0;
            const orderBy = { createdAt: 'desc' };

            const data = cache.readQuery({
                query: FEED_QUERY,
                variables: {
                    take,
                    skip,
                    orderBy
                }
            });

            cache.writeQuery({
                query: FEED_QUERY,
                data: {
                    feed: {
                        links: [post, ...data.feed.links]
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
            <form onSubmit={(e) => { e.preventDefault(); createLink(); }}>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={formState.description}
                        onChange={(e) => setFormState({
                            ...formState,
                            description: e.target.value
                        })}
                        type='text'
                        placeholder='A description for the link'
                    />
                    <input
                        className="mb2"
                        value={formState.url}
                        onChange={(e) => setFormState({
                            ...formState,
                            url: e.target.value
                        })}
                        type='text'
                        placeholder='The URL for the link'
                    />
                </div>
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateLink;