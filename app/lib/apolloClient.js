import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// Gestion des erreurs
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    }

    if (networkError) {
    }
});

const httpLink = new HttpLink({
    uri: process.env.WORDPRESS_API_URL,
    fetchOptions: {
        timeout: 30000,  // Timeout de 30 secondes
    },
});

// Création du client Apollo avec gestion des erreurs
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, httpLink]), // Combine ErrorLink et HttpLink
});

export function getClient() {
    return client;
}