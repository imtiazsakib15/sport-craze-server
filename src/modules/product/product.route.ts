import { Router } from 'express';
import { ProductControllers } from './product.controller';

const router: Router = Router();

router.post('/', ProductControllers.createProduct);

router.get('/', ProductControllers.getAllProducts);

router.get('/:id', ProductControllers.getSingleProduct);

router.patch('/:id', ProductControllers.updateProduct);

export const ProductRoutes = router;
