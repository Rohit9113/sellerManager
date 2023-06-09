const express = require('express');
const router = express.Router();
const fs = require('fs');
const homeController = require('../controllers/homeController');
const User = require('../models/User');
const sellerController = require('../controllers/sellerController');
const bcrypt = require('bcrypt'); // Require bcrypt for password hashing

// Home route
router.get('/', homeController.home);

// Add display inventory route
router.get('/dashboard/inventory/display', sellerController.displayInventory);

// Unique inventory display route for each seller
router.get('/seller/:sellerId/inventory', sellerController.displaySellerInventory);

// About route
router.get('/about', (req, res) => {
  res.render('about', { header: 'partials/_header', footer: 'partials/_footer' });
});

// Services route
router.get('/services', (req, res) => {
  res.render('services', { header: 'partials/_header', footer: 'partials/_footer' });
});

// Contact route
router.get('/contact', (req, res) => {
  res.render('contact', { header: 'partials/_header', footer: 'partials/_footer' });
});

// Sign Up route
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', async (req, res) => {
  try {
    const users = await User.find();
    res.render('login', { users, header: 'partials/_header', footer: 'partials/_footer' });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.redirect('/'); // Handle the error and redirect to an error page or the home page
  }
});

router.post('/signup', (req, res) => {
  const { email, businessName, password, confirmPassword } = req.body;

  // Perform email verification and other validation checks
  // For simplicity, let's assume the validation checks pass

  // Create a new User instance with the form data
  const newUser = new User({
    email,
    businessName,
    password,
  });

  // Save the user to the database
  newUser.save()
    .then(() => {
      res.redirect('/login'); // Redirect to the home page or a success page
    })
    .catch((error) => {
      console.error('Error saving user to the database:', error);
      res.redirect('/signup'); // Redirect back to the sign-up page on error
    });
});


// Seller dashboard route
router.get('/dashboard', sellerController.dashboard);

// Add store info route
router.get('/dashboard/store-info', sellerController.getStoreInfo);
router.post('/dashboard/store-info', sellerController.saveStoreInfo);

// Add category route
router.get('/dashboard/category', sellerController.getCategory);
router.post('/dashboard/category', sellerController.addCategory);

// Add subcategory route
router.get('/dashboard/subcategory', sellerController.getSubCategory);
router.post('/dashboard/subcategory', sellerController.addSubCategory);

// Add inventory route
router.get('/dashboard/inventory', sellerController.getInventory);
router.post('/dashboard/inventory', sellerController.addInventory);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      // User not found, redirect back to the login page
      return res.send('Invide Password/Email');
    }

    // Compare the entered password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Passwords match, redirect to the dashboard page
      return res.send('Invide Password');
    } else {
      // Passwords don't match, redirect back to the login page
      return res.redirect('/dashboard');
    }
  } catch (error) {
    console.error('Error finding user:', error);
    res.redirect('/login'); // Redirect back to the login page on error
  }
});

module.exports = router;
