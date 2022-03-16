import { ControllerInfo, EXPRESS_CONTROLLER } from "..";

const controllersRegsitry = new Array<Function>()

function controller (info: ControllerInfo): (target: Function) => void {
    return function (target: Function) {
        Reflect.defineMetadata(EXPRESS_CONTROLLER, info, target)
        controllersRegsitry.push(target);
    }
}

export { controller, controllersRegsitry };