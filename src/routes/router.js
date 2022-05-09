import express from 'express';
import loginController from '../controller/loginController';
import createAccountController from '../controller/createAccountController';
const router = express.Router();

const initRouter = (app) => {
    // tao tai khoan
    router.post('/create-account', createAccountController.createAccount);
    //mo trang tao tai khoan
    router.get('/get-create-account', createAccountController.getCreateAccount);
    //trang dang nhap
    router.post('/login', loginController.handleLogin);
    router.get('/', loginController.getLogin);
    return app.use('/', router);
};

export default initRouter;
