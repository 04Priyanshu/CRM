import express  from 'express';
import{addUser , login} from '../controllers/user_controller.js';

const router = express.Router();

router.route('/adduser').post(addUser);
router.route('/login').post(login);


export default router;