interface SubscriptionConfig {
    topic: string;
    groupId: string;
    destination: string;
}

class Subscription {
    constructor (config: SubscriptionConfig) {
        this.topic = config.topic;
        this.groupId = config.groupId;
        this.destination = config.destination;
    }
    topic: string;
    groupId: string;
    destination: string;
}

export { Subscription };