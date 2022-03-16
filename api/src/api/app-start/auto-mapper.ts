import { autoMapper } from "../../application";
import { EmailEntityToEmailProfile, EmailToEmailEntityProfile } from "../../infrastructure";

function setupMapper () {
    autoMapper.addProfile(EmailToEmailEntityProfile);
    autoMapper.addProfile(EmailEntityToEmailProfile);
}

export { setupMapper };