import express from 'express';

class Client {
    public constructor (id: string, subscriptionId: string,response: express.Response) {
        this.id = id;
        this.subscriptionId = subscriptionId;
        this.response = response;
    }
    
    id: string;
    subscriptionId: string;
    response: express.Response
}

export { Client };