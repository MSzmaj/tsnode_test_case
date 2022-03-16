import express from 'express';
import { Client, Fact } from '../../common';
import { v4 as uuidv4 } from 'uuid';

function subscribe (
        clients: Array<Client>, 
        facts: Array<Fact>,
        subscriptionId: string,
        request: express.Request, 
        response: express.Response): Client {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    response.writeHead(200, headers);

    const data = JSON.stringify(facts);
    response.write(data);

    const clientId = uuidv4();
    const newClient = new Client(clientId, subscriptionId, response);
    clients.push(newClient);

    request.on('close', () => {
        clients.filter(x => x.id != clientId);
    });

    return newClient;
}

export { subscribe };