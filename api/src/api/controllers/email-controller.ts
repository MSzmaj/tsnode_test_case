import express from 'express';
import { inject, singleton } from 'tsyringe';
import { action, controller, HttpMethod } from '../../common';
import { Client, Fact } from '../../common';
import { IEmailService, ServiceTokens } from '../../contracts';
import { pushFacts, subscribe } from '..';
import { processEmailRequestValidator } from '../validators/process-email-request-validator';
import { sendEmailRequestValidator } from '../validators/send-email-request-validator';
import { subscribeRequestValidator } from '../validators/subscribe-validator';
import { factRequestValidator } from '../validators/fact-request-validator';

@singleton()
@controller({route: '/emails'})
class EmailController {
    private readonly _emailService: IEmailService;
    private _clients: Array<Client>;
    private _facts: Array<Fact>;

    public constructor (@inject(ServiceTokens.IEmailService) emailService: IEmailService) {
        this._emailService = emailService;
        this._clients = new Array<Client>();
        this._facts = new Array<Fact>();
    }

    @action({ route: "/send", method: HttpMethod.POST, middlewares: [...sendEmailRequestValidator] })
    async queueEmails (request: express.Request, response: express.Response): Promise<void> {
        const { numberOfEmails } = request.body || 0;
        const jobId = await this._emailService.queueEmails(numberOfEmails);
        response.status(200).send({ jobId: jobId });
    }

    @action({ route: "/process", method: HttpMethod.POST, middlewares: [...processEmailRequestValidator] })
    async processEmail (request: express.Request, response: express.Response): Promise<void> {
        const { id, currentProcessed} = request.body;
        await this._emailService.processEmail(id, currentProcessed);
        response.status(200).send();
    }


    @action({ route: "/update", method: HttpMethod.POST, middlewares: [...processEmailRequestValidator] })
    async updateJob (request: express.Request, response: express.Response): Promise<void> {
        const { id, currentProcessed} = request.body;

        const email = await this._emailService.getTaskByJobId(id);
        if (email === undefined) {
            response.status(404).send(`JobId ${id} does not exist`);
            return;
        }

        await this._emailService.updateJob(id, currentProcessed);
        response.status(200).send();
    }

    @action({ route: "/subscribe/:jobId", method: HttpMethod.GET, middlewares: [...subscribeRequestValidator] })
    async subscribe (request: express.Request, response: express.Response): Promise<void> {
        const jobId = request.params.jobId!.toString();

        const email = await this._emailService.getTaskByJobId(jobId);
        if (email === undefined) {
            response.status(404).send(`JobId ${jobId} does not exist`);
            return;
        }

        const newClient = subscribe(this._clients, this._facts, jobId, request, response);
    }

    @action({ route: "/fact", method: HttpMethod.POST, middlewares: [...factRequestValidator] })
    async getFact (request: express.Request, response: express.Response): Promise<void> {
        const { id } = request.body;

        const email = await this._emailService.getTaskByJobId(id);
        if (email === undefined) {
            response.status(404).send(`JobId ${id} does not exist`);
            return;
        }

        const currentTotal = this._emailService.getTotalProcessed(id);
        pushFacts(this._clients, this._facts, id, currentTotal.toString(), response);
        response.status(200).send();
    }

    @action({ route: "/:jobId/status", method: HttpMethod.GET})
    async getStatusUpdate (request: express.Request, response: express.Response): Promise<void> {
        const jobId = "";
        const result = this._emailService.getTaskByJobId(jobId);

        response.status(200).send("123");
    }
}

export { EmailController };
