const express = require('express');

const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');
const ItemController = require('./controllers/ItemController');
const CustomerController = require('./controllers/CustomerController');
const EmployeeController = require('./controllers/EmployeeController');

const routes = express.Router();

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.get('/orders/:id', OrderController.indexOne);
routes.delete('/orders/', OrderController.delete);
routes.delete('/orders/:id', OrderController.deleteOne);
routes.put('/orders/', OrderController.update);
routes.put('/orders/:id', OrderController.updateOne);

routes.post('/products', ProductController.store);
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.indexOne);
routes.delete('/products/', ProductController.delete);
routes.delete('/products/:id', ProductController.deleteOne);
routes.put('/products/', ProductController.update);
routes.put('/products/:id', ProductController.updateOne);

routes.post('/customers', CustomerController.store);
routes.get('/customers', CustomerController.index);
routes.get('/customers/:id', CustomerController.indexOne);
routes.delete('/customers/', CustomerController.delete);
routes.delete('/customers/:id', CustomerController.deleteOne);
routes.put('/customers/', CustomerController.update);
routes.put('/customers/:id', CustomerController.updateOne);

routes.post('/orders/:order_id/items/:id', ItemController.store);
routes.get('/items', ItemController.index);
routes.get('/items/:id', ItemController.indexOne);
routes.delete('/items/', ItemController.delete);
routes.delete('/orders/:order_id/items/:id', ItemController.deleteOne);
routes.put('/items/', ItemController.update);
routes.put('/orders/:order_id/items/:id', ItemController.updateOne);

routes.post('/employees', EmployeeController.store);
routes.get('/employees', EmployeeController.index);
routes.get('/employees/:id', EmployeeController.indexOne);
routes.delete('/employees/', EmployeeController.delete);
routes.delete('/employees/:id', EmployeeController.deleteOne);
routes.put('/employees/', EmployeeController.update);
routes.put('/employees/:id', EmployeeController.updateOne);

module.exports = routes;