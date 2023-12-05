import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res)=>{
    try{

        const passwordInitial = req.body.password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(passwordInitial,salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            password:passwordHash
        })

        const user = await doc.save()
        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {
            expiresIn: '30d'
        })

        const {password, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })
    } catch (err){
        res.status(500).json({
            message:'Problem with register'
        })
    }
}

export const login = async (req, res)=>{
    try{

        const user = await UserModel.findOne({ email: req.body.email})

        if(!user){
            return res.status(404).json({
                message:'No person with this email'
            })
        }

        const isValidPass = await  bcrypt.compare(req.body.password, user._doc.password)

        if(!isValidPass){
            return res.status(400).json({
                message:'Incorrect password or login'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {
            expiresIn: '30d'
        })

        const {password, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })

    } catch (err){
        console.log(err)
        res.status(500).json({
            message:'Problem with auth'
        })
    }
}

export const getMe = async (req, res)=>{
    try {
        const user = await UserModel.findById(req.userId)

        if (!user){
            return res.status(404).json({
                message:'Can not find the person'
            })
        }

        const {password, ...userData} = user._doc

        res.json(userData)
    } catch (err){
        console.log(err)
        res.status(500).json({
            message:'No access'
        })
    }
}