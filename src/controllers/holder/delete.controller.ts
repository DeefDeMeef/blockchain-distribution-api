import express, { Request, Response } from 'express';
import HolderService from '@/services/HolderService';
import { NotFoundError } from '@/util/errors';

export const DeleteHolderController = async (req: Request, res: Response) => {
    try {
        const holder = await HolderService.removeHolder(req.params.address);

        if (holder) res.status(200).send(holder);
        else res.send('No user found');
    } catch (err) {
        res.send(err.message);
    }
};
