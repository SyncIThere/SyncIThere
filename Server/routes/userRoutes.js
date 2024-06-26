
import express from 'express';
import { signupUser, loginUser, logoutUser, sendFriendRequest, cancelFriendRequest, acceptFriendRequest, rejectFriendRequest, unFriend, getUserInfo, getFriends, getCommonFriends, getFriendRequests, getSentFriendRequests, updateUser } from '../controllers/userController.js';
import { protectRoute, setUserInfo } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', protectRoute, logoutUser);

router.post('/sendFriendRequest/:name', protectRoute, sendFriendRequest);
router.post('/cancelFriendRequest/:name', protectRoute, cancelFriendRequest);
router.post('/acceptFriendRequest/:name', protectRoute, acceptFriendRequest);
router.post('/rejectFriendRequest/:name', protectRoute, rejectFriendRequest);
router.post('/unFriend/:name', protectRoute, unFriend);

router.get('/getUserInfo', protectRoute, (req, res) => res.status(200).json(req.user));
router.get('/getUserInfo/:name', setUserInfo, getUserInfo);
router.get('/getFriends', protectRoute, getFriends);
router.get('/getCommonFriends/:name', protectRoute, getCommonFriends);
router.get('/getFriendRequests', protectRoute, getFriendRequests);
router.get('/getSentFriendRequests', protectRoute, getSentFriendRequests);

router.put('/updateUser', protectRoute, updateUser);

export default router;

