import {NetworkLayer} from './networkLayer';

export class Requests {
    getImages = (text:string):void =>{
        const network = new NetworkLayer();
        network.getRequest(`?method=flickr.photos.search&api_key=ce2bf03bb7203e14ac69788d4c842957&format=json&nojsoncallback=1&text=${text}`)
        .then(value=>console.log(value))
        .catch(err=>console.log(err))
    }
}