import { DependencyContainer } from "tsyringe";
import { EmailService } from "..";
import { Config } from "../../common";
import { ServiceTokens } from "../../contracts";

function registerServices (container: DependencyContainer, config: Config) {
    container.register(ServiceTokens.Subscriptions, { useValue: config.subscriptions })
    container.register(ServiceTokens.IEmailService, { useClass: EmailService });
}

export { registerServices };