import { CompressionTypes, Message, ProducerRecord } from "kafkajs";

class KafkaMessage implements ProducerRecord {
    topic: string;
    messages: Message[];
    acks?: number | undefined;
    timeout?: number | undefined;
    compression?: CompressionTypes | undefined;
}

export { KafkaMessage };