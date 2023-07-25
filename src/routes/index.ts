import { rootController } from "../controllers"

import { IRouteConfig } from "../interfaces/router-config"

export const routeConfig: IRouteConfig = {
    prefix: "/",
    routes: [
        {
            path: "/",
            method: "get",
            controller: (req, res) => {
                return res.render("index")
            }
        },
        {
            path: "/test",
            method: "get",
            controller: (req, res) => {
                return res.send("Hello World")
            }
        }
    ]
}