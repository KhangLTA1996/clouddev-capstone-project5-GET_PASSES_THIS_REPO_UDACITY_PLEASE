import {Router, Request, Response} from 'express';
import {CartRouter} from './cart/routes/cart.router';

const router: Router = Router();

router.use('/cart', CartRouter);

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
