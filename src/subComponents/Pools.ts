import { RequestServices } from '../RequestService';
import {
    e621POSTResponse
} from '../interfaces';

export default class Pools {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }


    listPools() {

    }

    listPoolPosts() {

    }

    update() {

    }

    destroy() {

    }

    addPost() {

    }

    removePost() {

    }
}