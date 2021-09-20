import axios from 'axios';

export class NetworkLayer {
    private baseURL:string = 'https://api.flickr.com/services/rest/';

    getRequest = (endpoint:string):Promise<any> =>{
        const url = this.baseURL + endpoint;
        return new Promise(function (resolve, reject) {
          try {
            axios
              .get(url, {
                timeout: 30000,
              })
              .then((res) => {
                resolve(res.data);
              })
              .catch((err) => { reject(err) });
          } catch (err) {
            reject(err);
          }
        });
    }
}