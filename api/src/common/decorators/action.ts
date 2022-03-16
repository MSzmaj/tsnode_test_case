import { ActionInfo, EXPRESS_ACTION } from "..";

function action(info: ActionInfo): (target: any, propertyKey: string) => void {
    return function(target: any, propertyKey: string) {
        if (target.constructor) {
            Reflect.defineMetadata(EXPRESS_ACTION, info, target.constructor, propertyKey);
        }
    }
}

export { action };