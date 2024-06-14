const express = require('express')
const multer = require('multer')
// const path = require('path')
// const fs = require('fs')
const router = express.Router()
const connectToDatabase = require('../models/db')
const logger = require('../logger')

// Define the upload directory path
const directoryPath = 'public/images'

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoryPath) // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original file name
  }
})

const upload = multer({ storage: storage })

// Get all secondChanceItems
router.get('/', async (req, res, next) => {
  logger.info('/ called')
  try {
    // Connect to MongoDB
    const db = await connectToDatabase()
    // Use collection method to retrieve secondChanceItems collection
    const collection = db.collection('secondChanceItems')
    // Get all secondChanceItems
    const secondChanceItems = await collection.find({}).toArray()
    // Send the secondChanceItems as a response
    res.json(secondChanceItems)
  } catch (e) {
    logger.console.error('oops something went wrong', e)
    next(e)
  }
})

// Add a new item
router.post ('/', upload.single('file'), async(req, res, next) => {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase()
    // Use collection method to retrieve secondChanceItems collection
    const collection = db.collection('secondChanceItems')
    // Get the last id, increment it by 1, and set it to the new secondChanceItem
    const lastItemQuery = await collection.find().sort({ 'id': -1 }).limit(1)
    // Create a new secondChanceItem from the request body
    let secondChanceItem = req.body
    await lastItemQuery.forEach(item => {
      secondChanceItem.id = (parseInt(item.id) + 1).toString()
    })
    // Set the current date to the new item
    const dateAdded = Math.floor(new Date().getTime() / 1000)
    secondChanceItem.date_added = dateAdded
    // Add the new SecondChanceItem to the database
    secondChanceItem = await collection.insertOne(secondChanceItem)
    // Upload the image to the images directory
    res.status(201).json(secondChanceItem)
  } catch (e) {
    next(e)
  }
})

// Get a single secondChanceItem by ID
router.get('/:id', async (req, res, next) => {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase()
    // Use collection method to retrieve secondChanceItems collection
    const collection = db.collection('secondChanceItems')
    const id = req.params.id
    // Find Item by its ID
    const secondChanceItem = await collection.findOne({ id: id })
    // Respond with the secondChanceItem as a JSON object.
    if (!secondChanceItem) {
      res.status(404).send('Item was not found within the listings')
    };

    res.status(200).json(secondChanceItem)
  } catch (e) {
    next(e)
  }
})

// Update an existing item
router.put('/:id', async(req, res, next) => {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase()
    // Use collection method to retrieve secondChanceItems collection
    const collection = db.collection("secondChanceItems")
    const id = req.params.id
    // Find Item by its ID display return a response if item doesn't exist.
    const secondChanceItem = await collection.findOne({ id })
    if (!secondChanceItem) {
      logger.error('Item was not found to update.')
      return res.status(404).json({ error: 'Item was not found to update.' })
    };
    // Update the item's attribues
    secondChanceItem.category = req.body.category
    secondChanceItem.condition = req.body.condition
    secondChanceItem.age_days = req.body.age_days
    secondChanceItem.description = req.body.description
    secondChanceItem.age_years = Number((secondChanceItem.age_days/365).toFixed(1))
    secondChanceItem.updatedAt = new Date()
    const updatepreloveItem = await collection.findOneAndUpdate(
      { id },
      { $set: secondChanceItem },
      { returnDocument: 'after' }
    )
    // Send confirmation of the sucessful update.
    if (updatepreloveItem) {
      res.json({ 'uploaded': 'success' })
    } else {
      res.json({ 'uploaded': 'failed' })
    }
  } catch (e) {
    next(e)
  }
})

// Delete an existing item
router.delete('/:id', async(req, res, next) => {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase()
    // Use collection method to retrieve secondChanceItems collection
    const collection = db.collection('secondChanceItems')
    const id = req.params.id
    // Find Item by its ID display return a response if item doesn't exist.
    const secondChanceItem = await collection.findOne({ id })
    if (!secondChanceItem) {
      logger.error('Item was not found to update.')
      return res.status(404).json({ error: 'Item was not found to update.' })
    };
    // Delete the item and send a response
    await collection.deleteOne({ id })
    res.json({ 'deleted': 'success' })
  } catch (e) {
    next(e)
  }
})

module.exports = router
