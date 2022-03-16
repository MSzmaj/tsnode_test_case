class Fact {
    public constructor (clientId: string,
                        subscriptionId: string,
                        data: string) {
        this.clientId = clientId;
        this.subscriptionId = subscriptionId;
        this.data = data;
    }
    
    clientId: string;
    subscriptionId: string;
    data: string;
}

export { Fact };