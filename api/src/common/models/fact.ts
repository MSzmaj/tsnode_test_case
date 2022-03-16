class Fact {
    public constructor (subscriptionId: string, 
                        data: string) {
        this.subscriptionId = subscriptionId;
        this.data = data;
    }

    clientId: string;
    subscriptionId: string;
    data: string;
}

export { Fact };