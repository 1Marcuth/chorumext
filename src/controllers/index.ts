import { Request, Response } from "express"

function rootController(req: Request, res: Response) {
    return res.send({
        batata: "frita"
    })
}

export { rootController }