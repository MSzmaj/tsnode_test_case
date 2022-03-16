import { Email } from "../../domain";

interface IEmailService {
    getTotalProcessed (jobId: string): number;
    queueEmails (numberOfEmails: number): Promise<string>;
    processEmail (jobId: string, currentProcessed: number): Promise<void>;
    updateJob (jobId: string, currentProcessed: number): Promise<void>;
    getTaskByJobId (jobId: string): Promise<Email>;
}

export { IEmailService };