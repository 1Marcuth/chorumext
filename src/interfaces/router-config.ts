import { NextFunction, Request, Response } from "express"

export type IController = (req: Request, res: Response, next: NextFunction) => any | Promise<any>

export interface IRoute {
    path: string,
    method: "get" | "post" | "put" | "delete"
    controller: IController
}

export interface IRouteConfig {
    prefix: string
    routes: IRoute[]
}