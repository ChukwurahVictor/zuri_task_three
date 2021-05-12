const router = require('express').Router();
const User = require('../models/User');

// Create user
router.post('/', async(req, res) => {
   try {
      const { name, email, country } = req.body;
      if(!name || !email || !country) {
         return res.status(400).send('All fields are required.');
      }

      const userExists = await User.findOne({ email })
      if(userExists) {
         return res.status(400).send('Email already exists')
      }

      const user = await User.create({name, email, country})
      const newUser = await user.save();

      res.status(201).send({
         message: "User created successfully",
         data: newUser
      })
   } catch (err) {
      res.status(500).send(err)
   }
})

// Get users
router.get('/', async(req, res) => {
   try {
      const users = await User.find();
      res.status(200).send(users);
   } catch (err) {
      res.status(500).send(err)
   }
})

// Get a single user
router.get('/:id', async(req, res) => {
   try {
      const { id } = req.params;
      const user = await User.findById(id)
      if(!user) {
         return res.status(400).send('User does not exist')
      }
      res.status(200).send({
         message: 'User fetched successfully',
         data: user
      })
   } catch (err) {
      res.status(500).send(err)
   }
})

// Update user
router.patch('/:id', async(req, res) => {
   try {
      const { id } = req.params;
      const user = await User.findById(id);
      if(!user) {
         return res.status(400).send('User does not exist')
      }
      const update = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, update);
      await updatedUser.save();
      res.status(200).send({
         message: 'User updated successfully',
         data: updatedUser
      })
   } catch (err) {
      res.status(500).send(err)
   }
})

// Delete user
router.delete('/:id', async(req, res) => {
   try {
      const { id } = req.params;
      const deleteUser = await User.findByIdAndDelete(id);
      if(!deleteUser) {
         return res.status(400).send('Error deleting user')
      }
      res.status(200).send({
         message: 'User deleted successfully'
      })
   } catch (err) {
      res.status(500).send(err)
   }
})

module.exports = router;