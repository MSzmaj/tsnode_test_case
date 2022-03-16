# tsnode_test_case

Issues:
- The health-check for Kafka in the docker-compose doesn't seem to be working as expected. In order to get this to work you have to wait for Kafka to finish starting up and then manually click the `run` buttons for the API container and then the APP container.
- Clicking the `run email job` button will result in a CORS error. If run locally the application works to an extent...
- I didn't have time to implement the resubscription feature as requested. However, the infrastructure is there; it just needs to be hooked up.
- The emails are processed and Kafka and the MySql database report the correct number of emails sent. However the number on the client only gets up to around 60-80% and then stops. The application still works as you can run the process again without issue.
  - This seems to be an issue with the Kafka queue and I'm not experienced enough in Kafka to fix it right now. The subscriber for the `Processed` queue just stops receiving messages. NOTE: I'm running this on an M1 macbook. The Kakfa and Zookeeper containers do not support arm processors it seems so they are running in compatability mode on my machine. Perhaps this is why this happens. I don't have an intel machine to test on at the moment.

TODO Items:
- Fix CORS in `app` project
- Fix healthcheck for Kafka in the Docker-Compose
- Investigate subscriber issue for the `Processed` queue.
- Unit tests
- Remove hard-coded urls in the `app` project


In order to start the application run the following command:

`docker compose -p tsnode up -d`

You will have to wait until Kafka starts up in order for the API to work. However due to the unresolved CORS issue it still won't work unless ran locally.

If inclined you can open the entire project up in VS code and run the apps.
- API: `npm run start`
- APP: `npm run start`

This will require changing some of the urls in the projects to use localhost instead of their container equivalents though. Once changed then browse to http://localhost:3000.
