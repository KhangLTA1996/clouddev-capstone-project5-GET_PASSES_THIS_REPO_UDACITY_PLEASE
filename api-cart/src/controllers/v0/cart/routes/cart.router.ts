import {Router, Request, Response} from 'express';
import {CartItem} from '../models/CartItem';
import {NextFunction} from 'connect';
import * as jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws';
import * as c from '../../../../config/config';

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send({message: 'Malformed token.'});
  }

  const token = tokenBearer[1];
  return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
    }
    return next();
  });
}

// Get all cart items
router.get('/', async (req: Request, res: Response) => {
  const items = await CartItem.findAndCountAll({order: [['id', 'DESC']]});
  items.rows.map((item) => {
    if (item.path) {
      item.path = AWS.getGetSignedUrl(item.path);
    }
  });
  res.send(items);
});

// Get the selected cart resource
router.get('/:id',
  async (req: Request, res: Response) => {
    const {id} = req.params;
    const item = await CartItem.findByPk(id);

    if (item != null) {
      res.send(item);
    } else {
      res.status(404).send("Item not found!");
    }
  });

// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
    requireAuth,
    async (req: Request, res: Response) => {
      const {fileName} = req.params;
      const url = AWS.getPutSignedUrl(fileName);
      res.status(201).send({url: url});
    });

// Create a cart with metadata
router.post('/',
  requireAuth,
  async (req: Request, res: Response) => {
    const {price, name, description} = req.body;
    const fileName = req.body.url;

    if (!price) {
      return res.status(400).send({message: 'Price is required.'});
    }

    if (!name) {
      return res.status(400).send({message: 'Name is required.'});
    }

    if (!description) {
      return res.status(400).send({message: 'Description is required.'});
    }
    if (!fileName) {
      return res.status(400).send({message: 'File url is required.'});
    }

    const item = new CartItem({
      name: name,
      price: price,
      path: fileName,
      description: description
    });

    const savedItem = await item.save();

    savedItem.path = AWS.getGetSignedUrl(savedItem.path);
    res.status(201).send(savedItem);
  });

// Update a cart
router.put('/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const {price, name, description} = req.body;
    const fileName = req.body.url;
    const {id} = req.params;
    let cartItem = await CartItem.findByPk(id);

    if (cartItem != null) {
      if (!name) {
        return res.status(400).send({message: 'Name is required.'});
      }

      if (!price) {
        return res.status(400).send({message: 'Price is required.'});
      }
  
      if (!description) {
        return res.status(400).send({message: 'Description is required.'});
      }

      if (!fileName) {
        return res.status(400).send({message: 'File url is required.'});
      }
  
      const item = new CartItem({
        name: name,
        price: price,
        path: fileName,
        description: description
      });
  
      await CartItem.update({
        name: name,
        price: price,
        path: fileName,
        description: description
      }, {
        where: {
          id: id
        }
      });

      item.id = parseInt(id);
      item.path = AWS.getGetSignedUrl(item.path);
      res.status(201).send(item);
    } else {
      res.status(404).send("Item not found!");
    }
  });
  
// Delete a cart
router.delete('/:id',
  async (req: Request, res: Response) => {
    const {id} = req.params;
    const item = await CartItem.findByPk(id);

    if (item != null) {
      await CartItem.destroy({
        where: {
          id: id
        }
      });

      res.send("Item has been deleted successfully!");
    } else {
      res.status(404).send("Item not found!");
    }
  });

export const CartRouter: Router = router;
