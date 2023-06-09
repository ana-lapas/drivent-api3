import { error } from 'console';
import { off } from 'process';
import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response): Promise<Response> {
  const { userId } = req;
  try {
    const hotels = await hotelService.getAllHotels(Number(userId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotShowHotelsError') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
  }
}

export async function getHotelsById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;
  try {
    const hotels = await hotelService.getHotelsById(Number(userId), Number(hotelId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotShowHotelsError') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
  }
}
