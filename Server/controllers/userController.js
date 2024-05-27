
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';
import { v2 as cloudinary } from 'cloudinary';

// signup User
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(422).json({ message: 'Please fill all fields' });
        }

        const user = await User.findOne({ $or: [{ name }, { email }] });
        if (user) {
            return res.status(409).json({ message: 'Please choose another username or email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            status: 'online',
        });

        await newUser.save();

        if (newUser) {

            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                bio: newUser.bio,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(404).json({ message: 'Invalid user data' });
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

        if (!name || !password) {
            return res.status(422).json({ message: 'Please fill all fields' });
        }

        const user = await User.findOne({ name });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(404).json({ message: 'Invalid username or password' });
        }

        user.status = 'online';
        await user.save();

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }

}

// logout User
const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(400).json({ message: 'Already logged out' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        user.status = 'offline';
        await user.save();

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

        const { name } = req.params;
        const userToRequest = await User.findOne({ name });
        const currentUser = await User.findById(req.user._id.toString());

        if (name === currentUser.name) {
            return res.status(400).json({ message: 'You cannot send request to yourself' });
        }

        if (!userToRequest || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isAlreadyFriend = currentUser.friends.includes(userToRequest._id.toString());
        const isAlreadySentRequest = currentUser.sentRequests.includes(userToRequest._id.toString());
        const isAlreadyReceivedRequest = currentUser.friendRequests.includes(userToRequest._id.toString());

        if (isAlreadyFriend || isAlreadySentRequest || isAlreadyReceivedRequest) {
            return res.status(400).json({ message: 'Request already sent or already friends' });
        }

        currentUser.sentRequests.push(userToRequest._id.toString());
        userToRequest.friendRequests.push(currentUser._id.toString());

        await currentUser.save();
        await userToRequest.save();

        res.status(200).json({ message: 'Request sent successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// cancel friend request
const cancelFriendRequest = async (req, res) => {
    try {
        const { name } = req.params;

        const userToCancel = await User.findOne({ name });
        const currentUser = await User.findById(req.user._id.toString());

        if (name === currentUser.name) {
            return res.status(400).json({ message: 'You cannot cancel request to yourself' });
        }

        if (!userToCancel || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isRequestSent = currentUser.sentRequests.includes(userToCancel._id.toString());
        if (!isRequestSent) {
            return res.status(400).json({ message: 'No request sent' });
        }

        currentUser.sentRequests = currentUser.sentRequests.filter(request => request.toString() !== userToCancel._id.toString());
        userToCancel.friendRequests = userToCancel.friendRequests.filter(request => request.toString() !== currentUser._id.toString());

        await currentUser.save();
        await userToCancel.save();

        res.status(200).json({ message: 'Request cancelled successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// accept friend request
const acceptFriendRequest = async (req, res) => {
    try {
        const { name } = req.params;

        const userToAccept = await User.findOne({ name });
        const currentUser = await User.findById(req.user._id.toString());

        if (name === currentUser.name) {
            return res.status(400).json({ message: 'You cannot accept request from yourself' });
        }

        if (!userToAccept || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isAlreadyFriend = currentUser.friends.includes(userToAccept._id.toString());

        if (isAlreadyFriend) {
            return res.status(400).json({ message: 'Already friends' });
        }

        const isRequestReceived = currentUser.friendRequests.includes(userToAccept._id.toString());
        if (!isRequestReceived) {
            return res.status(400).json({ message: 'No request received' });
        }

        currentUser.friends.push(userToAccept._id);
        userToAccept.friends.push(currentUser._id);

        currentUser.friendRequests = currentUser.friendRequests.filter(request => request.toString() !== userToAccept._id.toString());

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
        const { name } = req.params;

        const userToReject = await User.findOne({ name });
        const currentUser = await User.findById(req.user._id.toString());

        if (!userToReject || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isRequestReceived = currentUser.friendRequests.includes(userToReject._id.toString());
        if (!isRequestReceived) {
            return res.status(400).json({ message: 'No request received' });
        }

        currentUser.friendRequests = currentUser.friendRequests.filter(request => request.toString() !== userToReject._id.toString());
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
        const { name } = req.params;

        const userToUnFriend = await User.findOne({ name });
        const currentUser = await User.findById(req.user._id.toString());

        if (name === currentUser.name) {
            return res.status(400).json({ message: 'You cannot unfriend yourself' });
        }

        if (!userToUnFriend || !currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isAlreadyFriend = currentUser.friends.includes(userToUnFriend._id.toString());
        if (!isAlreadyFriend) {
            return res.status(400).json({ message: 'Not friends' });
        }

        currentUser.friends = currentUser.friends.filter(friend => friend.toString() !== userToUnFriend._id.toString());
        userToUnFriend.friends = userToUnFriend.friends.filter(friend => friend.toString() !== currentUser._id.toString());

        await currentUser.save();
        await userToUnFriend.save();

        res.status(200).json({ message: 'Unfriended successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// get user info
const getUserInfo = async (req, res) => {
    try {

        const { name } = req.params;

        const user = await User.findOne({ name }).populate('friends')

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const currentUser = await User.findById(req.user._id.toString());

        if (user._id.toString() === currentUser._id.toString()) {
            user.password = undefined;

            return res.status(200).json(user);
        }

        const isFriend = currentUser.friends.includes(user._id.toString());

        console.log(isFriend);
        if (isFriend) {
            user.email = undefined;
            user.password = undefined;
            const commonFriends = [...user.friends].filter(friend => currentUser.friends.map(friend => friend._id.toString()).includes(friend._id.toString()));
            commonFriends.forEach(friend => {
                friend.email = undefined;
                friend.friends = undefined;
                friend.friendRequests = undefined;
                friend.sentRequests = undefined;
                friend.password = undefined;
            });
            console.log(commonFriends);

            user.friends = commonFriends;

            user.friendRequests = undefined;
            user.sentRequests = undefined;


            return res.status(200).json(user);

        }

        user.email = undefined;
        user.friends = undefined;
        user.friendRequests = undefined;
        user.sentRequests = undefined;
        user.password = undefined;

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }

}

// get friends
const getFriends = async (req, res) => {
    try {

        let currentUser = await User.findById(req.user._id.toString()).populate('friends')

        if (!currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        currentUser.friends.forEach(friend => {

            friend.email = undefined;
            friend.friends = [...friend.friends].filter(frie => currentUser.friends.map(frie => frie._id.toString()).includes(frie._id.toString()));
            friend.friendRequests = undefined;
            friend.sentRequests = undefined;
            friend.password = undefined;
        });

        let onlineFriends = currentUser.friends.filter(friend => friend.status !== 'offline');
        let offlineFriends = currentUser.friends.filter(friend => friend.status === 'offline');
        onlineFriends = onlineFriends.sort((a, b) => a.name.localeCompare(b.name));
        offlineFriends = offlineFriends.sort((a, b) => a.name.localeCompare(b.name));

        res.status(200).json({ onlineFriends, offlineFriends });


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// get common friends
const getCommonFriends = async (req, res) => {
    try {

        const { name } = req.params;

        const user = await User.findOne({ name }).populate('friends');
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
            request.friends = undefined;
            request.friendRequests = undefined;
            request.sentRequests = undefined;
            request.email = undefined;
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

        currentUser.sentRequests.forEach(request => {
            request.password = undefined;
            request.friends = undefined;
            request.friendRequests = undefined;
            request.sentRequests = undefined;
            request.email = undefined;
        });

        res.status(200).json(currentUser.sentRequests);

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// update user
const updateUser = async (req, res) => {
    try {

        let user = await User.findById(req.user._id.toString());

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const { name, email, oldpassword, newpassword, profilePic, bio } = req.body;

        if (name) {

            const userWithSameName = await User.findOne({
                name,
                _id: { $ne: user._id }
            });

            if (userWithSameName) {
                return res.status(409).json({ message: 'Please choose another username' });
            }

            user.name = name;
        }

        if (email) {

            const userWithSameEmail = await User.findOne({
                email,
                _id: { $ne: user._id }
            });

            if (userWithSameEmail) {
                return res.status(409).json({ message: 'Please choose another email' });
            }

            user.email = email;
        }

        if (newpassword) {

            if (!oldpassword) {
                return res.status(400).json({ message: 'Please provide old password' });
            }

            const isPasswordCorrect = await bcrypt.compare(oldpassword, user.password);

            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newpassword, salt);

            user.password = hashedPassword;

        }

        if (profilePic) {
            if (user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split('/').pop().split('.')[0]);
            }

            const uploadedResponse = await cloudinary.uploader.upload(profilePic);

            user.profilePic = uploadedResponse.secure_url;
        }

        if (bio) {

            if (bio.length > 100) {
                return res.status(400).json({ message: 'Bio should be less than 100 characters' });
            }

            user.bio = bio;
        }

        await user.save();

        let endUser = user.toObject();
        endUser.password = undefined;
        endUser.friendRequests = undefined;
        endUser.sentRequests = undefined;
        endUser.friends = undefined;
        endUser.isAdmin = undefined;

        res.status(200).json({ user: endUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }

}

export { signupUser, loginUser, logoutUser, sendFriendRequest, cancelFriendRequest, acceptFriendRequest, rejectFriendRequest, unFriend, getUserInfo, getFriends, getCommonFriends, getFriendRequests, getSentFriendRequests, updateUser };
