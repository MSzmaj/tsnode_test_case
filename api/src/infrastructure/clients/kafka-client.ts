import { Consumer, EachMessageHandler, Kafka, Producer, ProducerRecord } from "kafkajs";
import { inject, injectable } from "tsyringe";
import { IKafkaClient, KafkaConfig } from "../../contracts";

@injectable()
class KafkaClient implements IKafkaClient {
    private readonly _client: Kafka;
    private readonly _producer: Producer;
    private readonly _consumer: Consumer[];

    public constructor (@inject(KafkaConfig.Token) kafka: Kafka) {
        this._client = kafka;
        this._producer = this._client.producer();
        this._consumer = [];
    }

    async send (message: ProducerRecord): Promise<void> {
        await this._producer.connect();
        await this._producer.send(message);
    }

    async subscribe (topic: string, group: string, callback: EachMessageHandler): Promise<void> {
        const consumer = this._client.consumer({ groupId: group, readUncommitted: true, allowAutoTopicCreation: true });
        await consumer.connect();
        await consumer.subscribe({ topic: topic, fromBeginning: false });
        await consumer.run({
            eachMessage: callback,
        });
        this._consumer.push(consumer);
    }
}

export { KafkaClient };