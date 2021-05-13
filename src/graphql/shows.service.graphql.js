import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import Show from "../../domain_objects/show";

class GraphQLShowService {

    constructor(baseUrl, port, fetch) {
        this.client = new ApolloClient({
            link: new createHttpLink({
                uri: `${baseUrl}:${port}/graphql`,
                fetch: fetch
            }),
            cache: new InMemoryCache()
        });
    }

    getShow(titleFilter) {
        return this.client.query({
            query: gql`
              {
                show {
                  title
                  rating
                }
              }
            `,
            variables: {}
        }).then((response) => {
            console.log('response', response);
            return new Promise((resolve, reject) => {
                try {
                    const show = new Show(response.data.show[0].title, response.data.show[0].rating);
                    Show.validateTitle(show);
                    Show.validateRating(show);
                    resolve(show);
                } catch (error) {
                    reject(error);
                }
            })
        });
    };

}

export default GraphQLShowService;
