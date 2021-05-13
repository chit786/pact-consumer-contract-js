import GraphQLShowService from './shows.service.graphql';
import * as Pact from '@pact-foundation/pact';
import fetch from 'node-fetch';

describe('ShowService GraphQL API', () => {
    const showService = new GraphQLShowService('http://localhost', global.port, fetch);

    // a matcher for the content type "application/json" in UTF8 charset
    // that ignores the spaces between the ";2 and "charset"
    const contentTypeJsonMatcher = Pact.Matchers.term({
        matcher: "application\\/json; *charset=utf-8",
        generate: "application/json; charset=utf-8"
    });

    describe('getShow()', () => {

        beforeEach((done) => {

            global.provider.addInteraction(new Pact.GraphQLInteraction()
                .uponReceiving('a show Query')
                .withRequest({
                    path: '/graphql',
                    method: 'POST',
                })
                .withOperation("show")
                .withQuery(`
                {
                    show {
                      title
                      rating
                    }
                  }`)
                .withVariables({
                    
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': contentTypeJsonMatcher
                    },
                    body: {
                        data: {
                            show: [{
                                title: Pact.Matchers.somethingLike('Ozark'),
                                rating: Pact.Matchers.somethingLike(5)
                            },
                            {
                                title: Pact.Matchers.somethingLike('Stranger Things'),
                                rating: Pact.Matchers.somethingLike(5)
                            }]
                        }
                    }
                })).then(() => done());
        });

        it('sends a request according to contract', (done) => {
            showService.getShow("Oz")
                .then(show => {
                    expect(show.title).toEqual('Ozark');
                })
                .then(() => {
                    global.provider.verify()
                        .then(() => done(), error => {
                            done.fail(error)
                        })
                });
        });

    });

});
