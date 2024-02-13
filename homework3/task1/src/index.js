import { config } from "./config/config.js"
import { app } from "./server.js";

app.listen(config.server.port,() => {
    console.log(`App listening on port ${config.server.port}`)
})
