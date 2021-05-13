const axios = require('axios');
import adapter from 'axios/lib/adapters/http';

class ShowsRestService {

    constructor(baseUrl, port){
        this.baseUrl = baseUrl;
        this.port = port;
    }

    getShows(titleFilter) {
        return axios.request({
            method: 'GET',
            url: `/api/movies`,
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json'
            }
        }, adapter);
    };

}

export default ShowsRestService;