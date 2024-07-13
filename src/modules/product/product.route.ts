import { Router } from 'express';
import { ProductControllers } from './product.controller';

const router: Router = Router();

router.post('/', ProductControllers.createProduct);

router.get('/', ProductControllers.getAllProducts);

router.get('/:id', ProductControllers.getSingleProduct);

export const ProductRoutes = router;
