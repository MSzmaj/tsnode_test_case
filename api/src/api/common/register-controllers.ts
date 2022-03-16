import { Application } from "express";
import { DependencyContainer, InjectionToken } from "tsyringe";
import { ActionInfo, ControllerInfo, controllersRegsitry, EXPRESS_ACTION, EXPRESS_CONTROLLER } from "../../common";
import { EmailController } from "../controllers/email-controller";

/** this is necessary in order for the `controller` decorator to be called. */
const controllerRegistry = [EmailController];

function cleanRoute (route: string): string {
    return route.trim().replace(/^\//, '').replace(/\/$/, '')
}

function createRoute(...routes: string[]): string {
    return routes.reduce((prev, next) => `/${cleanRoute(prev)}/${cleanRoute(next)}`);
}

function registerControllers (app: Application, container: DependencyContainer) {
    controllersRegsitry.forEach(controller => {
        const controllerInfo: ControllerInfo = Reflect.getMetadata(EXPRESS_CONTROLLER, controller);

        if (!controllerInfo) {
            return;
        }

        const instance = container.resolve(<InjectionToken<any>> controller);

        const controllerMethods = Object.getOwnPropertyNames(controller.prototype);

        controllerMethods.forEach(actionKey => {
            const actionInfo: ActionInfo = Reflect.getMetadata(EXPRESS_ACTION, controller, actionKey);

            if (!actionInfo) {
                return;
            }

            const route = createRoute(controllerInfo.route, actionInfo.route);

            if (actionInfo.middlewares) {
                app[actionInfo.method](route, ...actionInfo.middlewares, (req, res, next) => instance[actionKey](req, res, next));
            } else {
                app[actionInfo.method](route, (req, res, next) => instance[actionKey](req, res, next));
            }
        })
    })
}

export { registerControllers };