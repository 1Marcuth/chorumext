import express, { Router } from "express"
import morgan from "morgan"
import http from "http"
import path from "path"
import fs from "fs"

import settings from "./settings"
import Logger from "./utils/logger"
import { IRouteConfig } from "./interfaces/router-config"

const serverSettings = settings.server

class App {
    private app: express.Application
    private server?: http.Server
    private logger: Logger

    public constructor() {
        this.app = express()
        this.logger = new Logger("app")

        this.useLogger()
        this.useMiddlewares()
        this.useRouters()
    }

    private useLogger() {
        this.app.use(morgan(serverSettings.environment))
    }

    private useMiddlewares() {
        this.app.set("view engine", "ejs")
        this.app.set("views", path.resolve("./src/views"))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.static(path.resolve("./src/public")))
    }

    private async useRouters() {
        const routesDirPath = path.resolve("./src/routes")
        const routesFilenames = await fs.promises.readdir(routesDirPath)
        const routesFilePaths = routesFilenames.map(routesFilename => path.join(routesDirPath, routesFilename))

        const routesConfig = await Promise.all(
            routesFilePaths.map(async (routeFilePath) => {
                return await importRouteConfig(routeFilePath)
            })
        )

        for (const routeConfig of routesConfig) {
            const router = Router()

            for (const route of routeConfig.routes) {
                if (route.method === "get") {
                    router.get(route.path, route.controller)
                } else if (route.method === "post") {
                    router.post(route.path, route.controller)
                } else if (route.method === "put") {
                    router.put(route.path, route.controller)
                } else if (route.method === "delete") {
                    router.delete(route.path, route.controller)
                } else {
                    throw new Error("Method not allowed!")
                }
            }

            this.app.use(routeConfig.prefix, router)
        }

        async function importRouteConfig(filePath: string): Promise<IRouteConfig> {
            const module = await import(filePath) as { routeConfig: IRouteConfig }
            return module.routeConfig
        }

    }

    public start(): Promise<null> {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(serverSettings.port, serverSettings.host, () => {
                this.logger.info(`Server started on http://${serverSettings.host}:${serverSettings.port}/`)
                return resolve(null)
            })
        })
    }

    public stop(): Promise<null> {
        return new Promise((resolve, reject) => {
            if (!this.server) return reject("The server has not been started!")

            this.server.close((error) => {
                if (error) {
                    this.logger.error(error.message)
                    return resolve(null)
                }

                this.logger.info("The server has been stopped successfully!")

                return resolve(null)
            })
        })
    }
}

export default App