const bcrypt = require('bcrypt');
const User = require('../models/user');
const comparePassword = require('../helpers/auth').comparePassword;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { fullname,username, email, password, confirmpassword} = req.body;

        if (!fullname||!username || !email || !password || !confirmpassword ) {
            return res.status(400).json({
                error: 'All fields are required',
            });
        }

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


module.exports = {
    registerUser,
    loginUser,

};