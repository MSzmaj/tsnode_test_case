import express from 'express';
import { Client, Fact } from '../../common';

function pushFacts (
        clients: Array<Client>, 
        facts: Array<Fact>,
        subscriptionId: string,
        data: string,
        response: express.Response) {
    const fact = new Fact(subscriptionId, data);
    facts.push(fact);
    response.json(fact);
    clients
        .filter(client => client.subscriptionId === subscriptionId)
        .forEach(client => {
            fact.clientId = client.id;
            client.response.write(`data: ${JSON.stringify(fact)}\n\n`);
        });
}

export { pushFacts };