import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // header format 'BEARER TOKEN'
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) { 
            const token = authorizationHeader.split(' ')[1]
            const decoded = jwt.verify(token, String(process.env.TOKEN_SECRET))
            next()
        } else {
            throw "Undefined Authorization Header"
        }
    } catch (err) {
        res.status(401).send({error: `Unauthorized: ${err}` })
    }
}
