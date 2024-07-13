import { Router } from 'express';
import { ProductControllers } from './product.controller';

const router: Router = Router();

router.post('/', ProductControllers.createProduct);

export const ProductRoutes = router;
