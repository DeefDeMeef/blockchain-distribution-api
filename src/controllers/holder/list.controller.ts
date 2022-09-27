import express, { Request, Response } from 'express'
import HolderService from '@/services/HolderService';

export const ListHolderController = async (req: Request, res: Response) => {
  const holders = await HolderService.listHolders()
  res.status(200).send(holders)
};