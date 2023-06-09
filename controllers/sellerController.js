const StoreInfo = require('../models/sellers');
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const Inventory = require('../models/inventory');

// Seller dashboard method
exports.dashboard = (req, res) => {
  res.render('dashboard', { header: 'partials/_header', footer: 'partials/_footer' });
};

// Add store info methods
exports.getStoreInfo = (req, res) => {
  res.render('add-store-info', { header: 'partials/_header', footer: 'partials/_footer' });
};

exports.saveStoreInfo = async (req, res) => {
  const { address, gst, logo, storeTimings } = req.body;

  try {
    // Create a new StoreInfo instance with the form data
    const newStoreInfo = new StoreInfo({
      address,
      gst,
      logo,
      timings: storeTimings,
    });

    // Save the store info to the database
    await newStoreInfo.save();

    // Redirect to the seller dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error saving store info to the database:', error);
    // Handle the error and redirect back to the add store info page
    res.redirect('/dashboard/store-info');
  }
};

// Add category methods
exports.getCategory = (req, res) => {
  res.render('add-category', { header: 'partials/_header', footer: 'partials/_footer' });
};

exports.addCategory = (req, res) => {
  // Extract and save category data to the database
  // Redirect to the dashboard or a success page
};

// Add subcategory methods
exports.getSubCategory = (req, res) => {
  res.render('add-subcategory', { header: 'partials/_header', footer: 'partials/_footer' });
};

exports.addSubCategory = (req, res) => {
  // Extract and save subcategory data to the database
  // Redirect to the dashboard or a success page
};

// Add inventory methods
exports.getInventory = (req, res) => {
  res.render('add-inventory', { header: 'partials/_header', footer: 'partials/_footer' });
};

exports.addInventory = (req, res) => {
  // Extract and save inventory data to the database
  // Redirect to the dashboard or a success page
};

exports.addCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    // Create a new Category instance with the form data
    const newCategory = new Category({
      categoryName,
    });

    // Save the category to the database
    await newCategory.save();

    // Redirect to the seller dashboard or a success page
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error saving category to the database:', error);
    // Handle the error and redirect back to the add category page
    res.redirect('/dashboard/category');
  }
};

exports.addSubCategory = async (req, res) => {
  const { category, subcategoryName } = req.body;

  try {
    // Create a new Subcategory instance with the form data
    const newSubcategory = new Subcategory({
      category,
      subcategoryName,
    });

    // Save the subcategory to the database
    await newSubcategory.save();

    // Redirect to the seller dashboard or a success page
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error saving subcategory to the database:', error);
    // Handle the error and redirect back to the add subcategory page
    res.redirect('/dashboard/subcategory');
  }
};

// Add inventory methods
exports.getInventory = (req, res) => {
  res.render('add-inventory', { header: 'partials/_header', footer: 'partials/_footer' });
};

exports.addInventory = async (req, res) => {
  const { category, subcategory, productName, mrp, sp, qty, images } = req.body;

  try {
    // Create a new Inventory instance with the form data
    const newInventory = new Inventory({
      category,
      subcategory,
      productName,
      mrp,
      sp,
      images,
    });

    // Save the inventory to the database
    await newInventory.save();

    // Redirect to the seller dashboard or a success page
    res.redirect('/dashboard/inventory/display');
  } catch (error) {
    console.error('Error saving inventory to the database:', error);
    // Handle the error and redirect back to the add inventory page
    res.redirect('/dashboard/inventory');
  }
};

// Display inventory method
exports.displayInventory = async (req, res) => {
  try {
    const { search } = req.query;
    let inventories;

    if (search) {
      // Perform case-insensitive search for product name or category
      inventories = await Inventory.find({
        $or: [
          { productName: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ]
      });
    } else {
      inventories = await Inventory.find();
    }

    // Render the display-inventory view and pass the inventories data
    res.render('display-inventory', { inventories, header: 'partials/_header', footer: 'partials/_footer' });
  } catch (error) {
    console.error('Error retrieving inventory:', error);
    // Handle the error and redirect back to the dashboard or an error page
    res.redirect('/dashboard');
  }
};

// Display inventory for a specific seller
exports.displaySellerInventory = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const inventories = await Inventory.find({ seller: sellerId });

    // Pass the URL of the current page to the template
    const url = req.originalUrl;

    res.render('display-inventory', { inventories, url, header: '_header', footer: '_footer' });
  } catch (error) {
    console.error('Error retrieving inventory:', error);
    res.redirect('/'); // Handle the error and redirect to an error page or the home page
  }
};


// Display inventory method
exports.displayInventory = async (req, res) => {
  try {
    const { search } = req.query;
    let inventories;

    if (search) {
      // Perform case-insensitive search for product name or category
      inventories = await Inventory.find({
        $or: [
          { productName: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ]
      });
    } else {
      inventories = await Inventory.find();
    }

    // Pass the URL of the current page to the template
    const url = req.originalUrl;

    // Render the display-inventory view and pass the inventories and url variables
    res.render('display-inventory', { inventories, url, header: '_header', footer: '_footer' });
  } catch (error) {
    console.error('Error retrieving inventory:', error);
    // Handle the error and redirect back to the dashboard or an error page
    res.redirect('/dashboard');
  }
};
