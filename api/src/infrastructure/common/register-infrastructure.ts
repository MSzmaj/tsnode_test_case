import { Kafka, LogEntry, logLevel } from "kafkajs";
import { DependencyContainer } from "tsyringe";
import { KafkaClient } from "..";
import { Config } from "../../common";
import { InfrastructureTokens, KafkaConfig } from "../../contracts";

async function registerInfrastructure (container: DependencyContainer, config: Config) {
    const kafka = new Kafka({ clientId: config.kafka.clientId, brokers: config.kafka.brokers });
    container.register(KafkaConfig.Token, { useValue: kafka });
    container.register(InfrastructureTokens.IKafkaClient, { useClass: KafkaClient });
}

export { registerInfrastructure };