import { ApolloClient, InMemoryCache, gql, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL,
});

const authLink = setContext(async (_, { headers }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        slug
        title
        date
        excerpt
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
    }
  }
`;

export async function fetchGqlPosts() {
    const { data } = await client.query({
        query: GET_POSTS,
        context: {
            headers: {} // Force context update
        }
    });
    return data.posts.nodes;
}

export async function fetchGqlPostBySlug(slug: string) {
    const { data } = await client.query({
        query: GET_POST_BY_SLUG,
        variables: { slug },
    });
    return data.post;
}
