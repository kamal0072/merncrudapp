const express = require('express');
const router = express.Router();
const users = require('../models/userSchema.js');

//user register API and routing
router.post('/register',  async (req, res)=>{
    // console.log(req.body);
    const {name,email ,age ,mobile ,work,add ,desc} = req.body;
    //if user is none
    if (!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(202).json('all fields required..')
    }
    try {
        //if user already present
        const preuser = await users.findOne({email : email});
        console.log("User with Email : ", preuser);
        if (preuser){
            res.status(202).json('User with this email already present...')
        }else{
            const adduser = new users({
                name,email ,age ,mobile ,work,add ,desc
            });
            await adduser.save();
            res.status(200).json(adduser);  
            console.log("add User", adduser);
        };
    } catch (error) {
        res.status(202).json('Error');
    }
});

//get all user data
router.get('/getdata', async(req, res)=>{
    try {
        const userData = await users.find();
        res.status(200).json(userData)
        console.log(userData);
    } catch (error) {
        res.status(202).json("We got an Error while fetching data...")
    }   
})

//get Single user data
router.get('/getuser/:id', async(req, res)=>{
    console.log("Single User :", req.params);
    try {
        const { id } = req.params;
        const userindividual = await users.findOne({_id : id});
        console.log(userindividual)
        res.status(200).json(userindividual);

    } catch (error) {
        res.status(202).json("We got an Error while fetching Single User data...")
    }; 
});

//update Single user data
router.patch('/updateuser/:id', async(req, res)=>{
    console.log("Single User :", req.params);
    try {
        const { id } = req.params;
        const updateuser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log(updateuser)
        res.status(201).json(`Mr. ${updateuser.name} updated success fully`);
    } catch (error) {
        res.status(202).json("We got an Error while Updating User data...")
    }; 
});
//update delete user data
router.delete('/deleteuser/:id', async(req, res)=>{
    console.log("Single User :", req.params);
    try {
        const { id } = req.params;
        const deleteuser = await users.findByIdAndDelete({_id: id});
        console.log(deleteuser)
        res.status(201).json(`Mr. ${deleteuser.name}  user deleted... `);
    } catch (error) {
        res.status(202).json("We got an Error while Deleted User data...")
    }; 
});

module.exports = router;


