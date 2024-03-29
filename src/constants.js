import {gql} from '@apollo/client';

export const AUTH_TOKEN='auth-token';
export const LINKS_PER_PAGE=5;

export const SIGNUP_MUTATION = gql`
mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
) {
    signup(
        email: $email
        password: $password
        name: $name
    ) {
        token
    }
}
`;

export const LOGIN_MUTATION = gql`
mutation LoginMutation(
    $email: String!
    $password: String!
) {
    login(
        email: $email
        password: $password
    ) {
        token
    }
}
`;

export const FEED_QUERY = gql`
query FeedQuery(
    $take: Int
    $skip: Int
    $orderBy: LinkOrderByInput
) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
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
        count
    }
}
`;

export const FEED_SEARCH_QUERY = gql`
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

export const NEW_LINKS_SUBSCRIPTION = gql`
subscription {
    newLink {
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
`;

export const NEW_VOTES_SUBSCRIPTION = gql`
subscription {
    newVote {
        id
        link {
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
        user {
            id
        }
    }
}
`;

export const CREATE_LINK_MUTATION = gql`
mutation PostMutation(
    $description: String!
    $url: String!
) {
    post(description: $description, url: $url) {
        id
        createdAt
        url
        description
    }
}
`;

export const VOTE_MUTATION = gql`
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