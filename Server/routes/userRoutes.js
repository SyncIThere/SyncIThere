
import express from 'express';
import { signupUser, loginUser, logoutUser, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, unFriend, getFriends, getCommonFriends, getFriendRequests, getSentFriendRequests } from '../controllers/userController.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.post('/sendFriendRequest/:id', protectRoute, sendFriendRequest);
router.post('/acceptFriendRequest/:id', protectRoute, acceptFriendRequest);
router.post('/rejectFriendRequest/:id', protectRoute, rejectFriendRequest);
router.post('/unFriend/:id', protectRoute, unFriend);

router.get('/getFriends', protectRoute, getFriends);
router.get('/getCommonFriends/:id', protectRoute, getCommonFriends);
router.get('/getFriendRequests', protectRoute, getFriendRequests);
router.get('/getSentFriendRequests', protectRoute, getSentFriendRequests);

router.get('*', (req, res) => res.status(404).send('404, Page Not Found'));
router.post('*', (req, res) => res.status(404).send('404, Page Not Found'));
router.put('*', (req, res) => res.status(404).send('404, Page Not Found'));
router.delete('*', (req, res) => res.status(404).send('404, Page Not Found'));
router.patch('*', (req, res) => res.status(404).send('404, Page Not Found'));


export default router;

