import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        //VALIDATION
        if (!email || !password || !username)
            return res.status(400).json({ success: false, messageKey: "filedsRequired" }); 

        //CHECK IF THE USER EXISTS

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, messageKey: "userExists" });

        //CREATE A NEW USER AND SAVE IT TO DB

        const user = new User({
            username,
            email,
            password
        });

        await user.save();
        res.status(201).json({ success: true, messageKey: "userCreated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messageKey: "serverError" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

  try {
    // VALIDATION
    if (!email || !password)
      return res.status(400).json({ success: false, messageKey: "filedsRequired" });

    // CHECK IF THE USER EXISTS

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ success: false, messageKey: "invalidCredentials" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password.toString(), user.password);

    if (!isPasswordValid)
      return res.status(400).json({ success: false, messageKey: "invalidCredentials" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user.toObject();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, messageKey: "serverError" });
  }
}

export const logout = async (req, res) => {
    res.clearCookie("token").status(200).json({ success: true, messageKey:"logoutSuccessfully" });
}