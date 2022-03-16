import { EachMessageHandler, ProducerRecord } from "kafkajs";

interface IKafkaClient {
    send(message: ProducerRecord): Promise<void>;
    subscribe (topic: string, group: string, callback: EachMessageHandler): Promise<void>
}

export { IKafkaClient };