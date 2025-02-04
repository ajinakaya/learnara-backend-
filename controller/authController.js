const bcrypt = require('bcrypt');
const User = require('../models/user');
const comparePassword = require('../helpers/auth').comparePassword;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { fullname,username, email, password, confirmpassword} = req.body;
        
        if (password.length < 8) {
            return res.status(400).json({
                error: 'Password should be at least 8 characters long',
            });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({
                error: "Passwords don't match",
            });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: 'Email is already taken',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullname,
            username,
            email,
            password: hashedPassword,
        
        });
          // Set up Nodemailer
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'ajinakaya5@gmail.com', 
                pass: 'jzhl lqoh tgrq yjex',   
            },
        });
        // Send confirmation email
        const mailOptions = {
            from: 'ajinakaya5@gmail.com',
            to: user.email, 
            subject: 'Welcome to Learnara!',
            html: `
                <h1>Welcome, ${user.username}!</h1>
                <p>Thank you for registering with our app.</p>
                
            `,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
        res.status(201).json({ message: 'User registered successfully. Email sent.', user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Something went wrong during registration' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('email not found:', email);
            return res.status(404).json({
                error: 'No email found',
            });
        }

        const isPasswordMatch = await comparePassword(password, user.password);

        if (isPasswordMatch) {
            // Generate token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
                expiresIn: '1h', 
            });
            console.log('Generated Token:', token);

            // Send token as a cookie
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true,
            });
            console.log('Login successful for:', email);
            return res.json({
                message: 'Login successful',
                token,
            });

        } else {
            console.log('Incorrect email or password for:', email);
            return res.status(401).json({
                error: 'Incorrect email or password',
            });
        }
    } catch (error) {
        console.log('Error during login:', error);
        return res.status(500).json({
            error: 'An error occurred during login',
        });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Generate a reset token
        const resetToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '15m' });
        console.log('Generated Token:', resetToken)

        // Set up Nodemailer
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'ajinakaya5@gmail.com',
                pass: 'jzhl lqoh tgrq yjex',
            },
        });
        

        const mailOptions = {
            from: 'ajinakaya5@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            html: `
                <h1>Password Reset</h1>
                <p>Click the link below to reset your password:</p>
                <a href="http://localhost:5000/reset-password?token=${resetToken}">Reset Password</a>
                <p>This link expires in 15 minutes.</p>
            `,
        
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ 
            message: 'Password reset email sent.',
            resetToken});
    } catch (error) {
        console.error('Error during forget password:', error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error during password reset:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ error: 'Token expired. Please request a new password reset.' });
        }

        res.status(500).json({ error: 'Something went wrong.' });
    }
};

const imageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const image = req.file ? req.file.path : null;

        if (!image) {
            return res.status(400).json({ error: 'Invalid file uploaded' });
        }
        
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.image = image;
        await user.save();
        res.status(200).json({ message: 'Image uploaded successfully', imageUrl: image });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const uploadimage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "Please upload a file" });
    }
    const image = req.file ? req.file.path : null;
    res.status(200).json({
        success: true,
        filename: req.file.filename,
        imagePath: image,  
    });
};



module.exports = {
    registerUser,
    loginUser,
    forgetPassword,
    resetPassword,
    imageUpload,
    uploadimage
    

};