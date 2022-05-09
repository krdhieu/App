import express from "express";
import { route } from "express/lib/application";
import req from "express/lib/request";
import phongbanController from '../controller/phongbanController';

let router = express.Router();

const initRouter = (app) => {
    router.get('/quanlyphongban', phongbanController.viewPhongBan);
    router.get('/quanlyphongban/sua/:id', phongbanController.editPhongBan);
    router.post('/uploadphongban', phongbanController.uploadPhongban);
    return app.use('/', router)
}
export default initRouter;