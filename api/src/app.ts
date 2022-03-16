import "reflect-metadata";
import { appStart } from "./api";

async function startServer () {
    await appStart();
}

startServer();