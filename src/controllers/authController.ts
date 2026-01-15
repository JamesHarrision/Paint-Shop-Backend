import { Request, Response } from "express";
import * as userService from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const {email, password, fullName} = req.body;
    // Validate cơ bản
    if(!email || !password) {
      res.status(400).json({
        messege: 'email && password are required'
      });
      return;
    }

    //Gọi services 
    const user = await userService.registerUser(email, password, fullName);

    res.status(201).json({
      messege: 'User registered successfully',
      data: user
    });

  } catch (error: any) {
    if(error.messege === 'Email already exists'){
      res.status(409).json({messege: 'Email already exists'});
    }else{
      res.status(500).json({
        messege: 'Internal Server Error', 
        error: error.messege
      })
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;

    //Validate cơ bản
    if (!email || !password){
      res.status(400).json({
        message: "email && password are required"
      });
    }

    //Gọi services 
    const result = await userService.loginUser(email, password);

    //Trả về token
    res.status(200).json({
      message: 'Login successfully',
      data: result
    });
  }
  catch (error: any){
    res.status(401).json({
      message: error.message || 'Login failed'
    });
  }
}