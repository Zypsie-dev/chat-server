import { Request, Response, NextFunction, response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { userModel } from "../Models/user.model";
// import nodemailer from "nodemailer";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  const userFound = await userModel.findOne({ email });
  if (userFound) {
    // throw new customError('User already exist', StatusCodes.FORBIDDEN);
    return res.status(StatusCodes.BAD_REQUEST).json("email already exists!");
  }

  const hash = await bcrypt.hash(password, 10);
  const savedUser = await new userModel({
    username,
    email,
    passwordHash: hash,
  }).save();

  if (!savedUser) {
    return res.status(StatusCodes.BAD_REQUEST).json("fail to create user!");
  }

  return res.status(200).json("user created successful");

  // Create new profile with username and email
  /*    const profile = new profileModel({
        username,
        email,
        user_id: savedUser._id,
    });
    await profile.save();
    sentNewSignupUser(email, username);
    return res.status(201).json({
        message: 'User created successfully!',
        user: savedUser,
    }); */
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(403).json({
      message: "Invalid credentials!",
    });
  }

  userModel
    .findOne({ email })
    .then((userFound) => {
      if (!userFound) {
        return res.status(422).json({
          message: "User not found!",
        });
      }

      bcrypt
        .compare(password, userFound.passwordHash)
        .then((compare) => {
          if (!compare) {
            return res.status(403).json({
              message: "Invalid Password!",
            });
          }

          const token = jwt.sign(
            {
              id: userFound._id,
              role: "user",
            },
            process.env.ACCESS_SECRET as string
          );
          return res.json({
            message: "Logged In successfully!",
            token,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const newfollow = async (req: any, res: Response, next: NextFunction) => {
  try {
    // console.log({...Error});
    const { id } = req.params;
    // console.log(id);

    if (id == req.user.id) {
      return res
        .status(400)
        .json({ status: false, message: "you cannot follow yourself !" });
    }

    const followUser = await userModel.findById(id);
    // console.log(followUser);

    if (!followUser) {
      return res.status(400).json({
        success: false,
        message: "unable to follow try again | no user with that id ",
        
      });
    }
    const checkIfExist = await userModel.findOne({
      _id: req.user.id,
      following: id,
    });

    // console.log({ checkIfExist });

    if (checkIfExist) {
      return res
        .status(400)
        .json({ success: false, message: "you have already followed " });
    }

    const addFollow = await userModel.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          following: id,
        },
      }
    );
    const useremail = await userModel.findById({_id:req.user.id},'email');
    const addFollwing = await userModel.findByIdAndUpdate(
      { _id: id },
      
      {
        $push: {
          follower: useremail,
          
        },
      }
    );

    if (!addFollow&&!addFollwing) {
      return res.status(400).json({
        success: false,
        message: "unable to follow try again | wrong id ",
      });
    }

    res
      .status(201)
      .json({ succss: true, message: "you are following to new user" });
  } catch (error) {
    next(error);
  }
};

const unfollow = async (req: any, res: Response, next: NextFunction) => {
  try {
    // console.log({...Error});
    const { id } = req.params;
    // console.log(id);

    if (id == req.user.id) {
      return res
        .status(400)
        .json({ status: false, message: "you cannot follow yourself !" });
    }

    const followUser = await userModel.findById(id);
    // console.log(followUser);

    if (!followUser) {
      return res.status(400).json({
        success: false,
        message: "unable to follow try again | no user with that id ",
      });
    }

    const checkIfExist = await userModel.findOne({
      _id: req.user.id,
      following: id,
    });

    // console.log({ checkIfExist });

    if (!checkIfExist) {
      return res
        .status(400)
        .json({ success: false, message: "you have not followed " });
    }

    const removeFollow = await userModel.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $pull: {
          following: id,
        },
      }
    );
    const removeEmail = await userModel.findById({_id:req.user.id},'email');
    
    const removeFollwing = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          follower: removeEmail,
          
        },
      }
    );

    if (!removeFollow&&!removeFollwing) {
      return res.status(400).json({
        success: false,
        message: "unable to unfollow try again | wrong id ",
      });
    }
    res.status(201).json({ succss: true, message: "you unfollow user" });
  } catch (error) {
    next(error);
  }
};

const myFollowing = async (req: any, res: Response, next: NextFunction) => {
  try {
    const following = await userModel
      .findById({ _id: req.params.id })
      .select("following");


      if(!following){

      return  res.status(500).json({ success: false, message: "error fetching following" });
      }
    res.status(200).json({ success: true, message: following });
  } catch (error) {
    next(error);
  }
};
const myFollowers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const following = await userModel
      .findById({ _id: req.params.id })
      .select("follower");


      if(!following){

       return res.status(500).json({ success: false, message: "error fetching follow" });
      }
    res.status(200).json({ success: true, message: following });
  } catch (error) {
    next(error);
  }
};

// const email = async (req:Request,res:Response,next:NextFunction)=>{
//   try{

//       const userFollowers = await userModel.findById(req.params.id).select("follower");
//       if (!userFollowers) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }

//       if(!userFollowers.follower || userFollowers.follower.length==0)
//         {
//           return res.status(403).json({success: false, message:"No followers to notify"});
//         }

//       const followersID =  userFollowers.follower.map((follower:any)=>follower._id);
      
      

//   }
//   catch (error)
//   {

//   }
// }










export { login, register, newfollow, myFollowing, myFollowers, unfollow};
