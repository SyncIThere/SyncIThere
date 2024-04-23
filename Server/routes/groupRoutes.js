
import express from 'express';
import { createGroup, getGroupInfo, changeName, changeIcon, changeOwner, deleteGroup, addUserToGroup, removeUserFromGroup, quitGroup } from '../controllers/groupController.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/createGroup', protectRoute, createGroup);
router.get('/getGroupInfo/:id', protectRoute, getGroupInfo);
router.patch('/changeName/:id', protectRoute, changeName);
router.patch('/changeIcon/:id', protectRoute, changeIcon);
router.patch('/changeOwner/:id', protectRoute, changeOwner);
router.delete('/deleteGroup/:id', protectRoute, deleteGroup);
router.post('/addUserToGroup/:id', protectRoute, addUserToGroup);
router.post('/removeUserFromGroup/:id', protectRoute, removeUserFromGroup);
router.post('/quitGroup/:id', protectRoute, quitGroup);

export default router;



