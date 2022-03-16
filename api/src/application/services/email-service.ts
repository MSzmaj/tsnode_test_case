import { EachMessagePayload } from "kafkajs";
import { inject, injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { IEmailService, IKafkaClient, InfrastructureTokens, ServiceTokens } from "../../contracts";
import { Email } from "../../domain";
import { EmailEntity, KafkaMessage } from "../../infrastructure";
import { autoMapper } from "../common/auto-mapper";
import { HttpClient } from 'typed-rest-client/HttpClient';
import { Subscription } from "../../common";
import { ApiTokens } from "../../contracts/symbols/api";
import { IDebugger } from "debug";

@injectable()
class EmailService implements IEmailService {
    private readonly _emailRepository: Repository<EmailEntity>;
    private readonly _kafkaClient: IKafkaClient;
    private readonly _httpClient: HttpClient;
    private readonly _logger: IDebugger;
    private readonly _jobTotal: Map<string,number>;

    public constructor (@inject(InfrastructureTokens.IKafkaClient) kafkaClient: IKafkaClient,
                        @inject(ServiceTokens.Subscriptions) subscriptions: Array<Subscription>,
                        @inject(ApiTokens.Logger) logger: debug.IDebugger) {
        this._emailRepository = getRepository(EmailEntity);
        this._kafkaClient = kafkaClient;
        this._httpClient = new HttpClient('');
        this._logger = logger;
        this._jobTotal = new Map();
        this.setupSubscribers(subscriptions);
    }

    setupSubscribers (subscriptions: Array<Subscription>) {
        for (const subscription of subscriptions) {
            this._kafkaClient.subscribe(subscription.topic, subscription.groupId, async (payload) => this.processEvent(subscription.destination, payload));
        }
    }

    async queueEmails (numberOfEmails: number): Promise<string> {
        const emailJob = new Email();
        emailJob.target = numberOfEmails;
        emailJob.currentProcessed = 0;

        const inputModel = autoMapper.map(emailJob, EmailEntity, Email);
        const jobId = await (await this._emailRepository.insert(inputModel)).generatedMaps[0].id.toString();
        this._jobTotal.set(jobId, 0);

        const message = new KafkaMessage();
        message.topic = 'Processing';
        message.messages = [];
        for (let i = 0; i < numberOfEmails; i++) {
            message.messages.push({ key: jobId, value: i.toString()});
        }
        
        this._kafkaClient.send(message);
        return jobId;
    }

    async processEmail (jobId: string, currentProcessed: number): Promise<void> {
        const message = new KafkaMessage();
        message.topic = 'Processed';
        message.messages = [{key: jobId, value: currentProcessed.toString()}];
        this._kafkaClient.send(message);
    }

    async updateJob (jobId: string, currentProcessed: number): Promise<void> {
        const current = await this._emailRepository.findOne(jobId);
        if (current === undefined) {
            return;
        }

        current.currentProcessed = currentProcessed + 1;
        current.total = this._jobTotal.get(jobId)! + 1;
        this._jobTotal.set(jobId, current.total);
        this._emailRepository.save(current);
    }

    private async processEvent (destination: string, payload: EachMessagePayload): Promise<void> {
        const emailJob = new Email();
        emailJob.id = payload.message.key!.toString();
        emailJob.currentProcessed = parseInt(payload.message.value!.toString());
        
        await this._httpClient.post(destination, JSON.stringify(emailJob), {"content-type":"application/json"}).catch((error) => console.log(`${error}`));
    }

    async getTaskByJobId (jobId: string): Promise<Email> {
        const result = await this._emailRepository.findOne(jobId);
        const email = autoMapper.map(result, Email, EmailEntity);
        return email;
    }

    getTotalProcessed(jobId: string): number {
        return this._jobTotal.get(jobId)!;
    }
}

export { EmailService };