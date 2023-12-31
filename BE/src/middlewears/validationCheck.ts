import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationCheckError = (req: Request, res: Response, next: NextFunction)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({status: 400, errors: errors.array() });
    }
    next();
} 