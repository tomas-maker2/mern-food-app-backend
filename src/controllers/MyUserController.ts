import { Request, Response } from "express";
import User from "../dto/models/user";

const getCurrentUser = async(req: Request, res: Response)=>{
  try {
    const currentUser = await User.findOne({_id: req.userId})
    if(!currentUser){
      return res.status(400).json({message: 'User not found'})
    }
    res.json(currentUser)
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Something wetn wrong'})
    
  }
}

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const exisitingUser = await User.findOne({ auth0Id });

    if (exisitingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating User" });
  }
};

const updateCurrentUser = async(req: Request, res: Response)=> {
  try {
    const {name, addressLine1, country, city} = req.body;
    const user = await User.findById(req.userId);
    if(!user){
      return res.status(404).json({message:'User not Found'})
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save()

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error updating User'})
  }
}

export default {
  createCurrentUser, updateCurrentUser, getCurrentUser
};
