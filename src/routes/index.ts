import { Router } from 'express';
import { IModuleRoute } from '../interfaces/route';
import { ProductRoutes } from '../modules/product/product.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = Router();

const moduleRoutes: IModuleRoute[] = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route: IModuleRoute) =>
  router.use(route.path, route.route),
);

export default router;
