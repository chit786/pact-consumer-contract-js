import ShowsRestService from './shows.service.rest';
import * as Pact from '@pact-foundation/pact';
import Show from '../../domain_objects/show';

describe('ShowService Rest API', () => {
    const showService = new ShowsRestService('http://localhost', global.port);

    // a matcher for the content type "application/json" in UTF8 charset
    // that ignores the spaces between the ";2 and "charset"
    const contentTypeJsonMatcher = Pact.Matchers.term({
        matcher: "application\\/json",
        generate: "application/json"
    });

    describe('getShow()', () => {

        beforeEach((done) => {

            global.provider.addInteraction({
                state: 'provider allows getting shows',
                uponReceiving: 'a GET request to get list of movies',
                withRequest: {
                    method: 'GET',
                    path: '/api/movies',
                    headers: {
                        'Accept': 'application/json'
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': contentTypeJsonMatcher
                    },
                    body: Pact.Matchers.somethingLike([
                        new Show("Ozark", 5),
                        new Show("Stranger Things", 5)])
                }
             }).then(() => done());
        });

        it('sends a request according to contract', (done) => {
            showService.getShows("Oz")
                .then(response => {
                    expect(response.data[0].title).toEqual('Ozark');
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
