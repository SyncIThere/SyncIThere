
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';

// signup User
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ $or: [{ name }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        if (newUser) {

            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// login User
const loginUser = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            return res.status(400).json({ message: 'Already logged in' });
        }

        const { name, password } = req.body;
        const user = await User.findOne({ name });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }

}

// logout User
const logoutUser = (req, res) => {
    try {
        res.clearCookie('jwt', "", { maxAge: 1 });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// send friend request
const sendFriendRequest = async (req, res) => {
    try {
        const { id } = req.params;

        if (id.length !== 24) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const userToRequest = await User.findById(id);
        const currentUser = await User.findById(req.user._id.toString());

        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot send request to yourself' });
        }

        if (!userToRequest || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isAlreadyFriend = currentUser.friends.includes(id);
        const isAlreadySentRequest = currentUser.sentRequests.includes(id);
        const isAlreadyReceivedRequest = currentUser.friendRequests.includes(id);

        if (isAlreadyFriend || isAlreadySentRequest || isAlreadyReceivedRequest) {
            return res.status(400).json({ message: 'Request already sent or already friends' });
        }

        currentUser.sentRequests.push(id);
        userToRequest.friendRequests.push(currentUser._id.toString());

        await currentUser.save();
        await userToRequest.save();

        res.status(200).json({ message: 'Request sent successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// accept friend request
const acceptFriendRequest = async (req, res) => {
    try {
        const { id } = req.params;

        if (id.length !== 24) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const userToAccept = await User.findById(id);
        const currentUser = await User.findById(req.user._id.toString());

        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot accept request from yourself' });
        }

        if (!userToAccept || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isAlreadyFriend = currentUser.friends.includes(id);

        if (isAlreadyFriend) {
            return res.status(400).json({ message: 'Already friends' });
        }

        const isRequestReceived = currentUser.friendRequests.includes(id);
        if (!isRequestReceived) {
            return res.status(400).json({ message: 'No request received' });
        }

        currentUser.friends.push(id);
        userToAccept.friends.push(currentUser._id);

        currentUser.friendRequests = currentUser.friendRequests.filter(request => request.toString() !== id);

        await currentUser.save();

        userToAccept.sentRequests = userToAccept.sentRequests.filter(request => request.toString() !== currentUser._id.toString());

        await userToAccept.save();

        res.status(200).json({ message: 'Request accepted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// reject friend request
const rejectFriendRequest = async (req, res) => {
    try {
        const { id } = req.params;

        if (id.length !== 24) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const userToReject = await User.findById(id);
        const currentUser = await User.findById(req.user._id.toString());

        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot reject request from yourself' });
        }

        if (!userToReject || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isRequestReceived = currentUser.friendRequests.includes(id);
        if (!isRequestReceived) {
            return res.status(400).json({ message: 'No request received' });
        }

        currentUser.friendRequests = currentUser.friendRequests.filter(request => request.toString() !== id);
        userToReject.sentRequests = userToReject.sentRequests.filter(request => request.toString() !== currentUser._id.toString());

        await currentUser.save();
        await userToReject.save();

        res.status(200).json({ message: 'Request rejected successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// unfriend
const unFriend = async (req, res) => {
    try {
        const { id } = req.params;

        if (id.length !== 24) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const userToUnFriend = await User.findById(id);
        const currentUser = await User.findById(req.user._id.toString());

        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot unfriend yourself' });
        }

        if (!userToUnFriend || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isAlreadyFriend = currentUser.friends.includes(id);
        if (!isAlreadyFriend) {
            return res.status(400).json({ message: 'Not friends' });
        }

        currentUser.friends = currentUser.friends.filter(friend => friend.toString() !== id);
        userToUnFriend.friends = userToUnFriend.friends.filter(friend => friend.toString() !== currentUser._id.toString());

        await currentUser.save();
        await userToUnFriend.save();

        res.status(200).json({ message: 'Unfriended successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// get friends
const getFriends = async (req, res) => {
    try {

        const currentUser = await User.findById(req.user._id.toString()).populate('friends');

        if (!currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        currentUser.friends.forEach(friend => {
            friend.email = undefined;
            friend.friends = undefined;
            friend.friendRequests = undefined;
            friend.sentRequests = undefined;
            friend.password = undefined;
        });

        res.status(200).json(currentUser.friends);


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// get common friends
const getCommonFriends = async (req, res) => {
    try {

        const { id } = req.params;

        if (id.length !== 24) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const user = await User.findById(id).populate('friends');
        const currentUser = await User.findById(req.user._id.toString()).populate('friends');

        if (!user || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const commonFriends = [...user.friends].filter(friend => currentUser.friends.map(friend => friend._id.toString()).includes(friend._id.toString()));

        commonFriends.forEach(friend => {
            friend.email = undefined;
            friend.friends = undefined;
            friend.friendRequests = undefined;
            friend.sentRequests = undefined;
            friend.password = undefined;
        });

        res.status(200).json(commonFriends);

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// get friend requests
const getFriendRequests = async (req, res) => {
    try {

        const currentUser = await User.findById(req.user._id.toString()).populate('friendRequests');

        if (!currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        currentUser.friendRequests.forEach(request => {
            request.password = undefined;
        });


        res.status(200).json(currentUser.friendRequests);

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// get sent friend requests
const getSentFriendRequests = async (req, res) => {
    try {

        const currentUser = await User.findById(req.user._id.toString()).populate('sentRequests');

        if (!currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json(currentUser.sentRequests);

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}



export { signupUser, loginUser, logoutUser, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, unFriend, getFriends, getCommonFriends, getFriendRequests, getSentFriendRequests };

