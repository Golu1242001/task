const express = require('express');
const app = express.Router();
const imageUpload = require(__dirname+'/../../middleware/uploadImage');
const categoryModel = require(__dirname+'/../../Models/category');
const subModel = require(__dirname+'/../../Models/sub_category');
const subSubModel = require(__dirname+'/../../Models/sub_sub_category');
const multer = require('multer');

app.get('/',async(req,res)=>{
    const category = await categoryModel.find();
    res.render('admin/category/show',{category:category});
})

app.get('/add',(req,res)=>{
    res.render('admin/category/add');
})

app.post('/add',imageUpload.single('logo'),async(req,res)=>{
    const {  category, priority, } = req.body;

    categoryModel.create({
        category:category,
        logo:typeof req.file !== 'undefined' && req.file !== null ?  req.file.path :''
    }).then((data)=>{
        res.redirect('/category/');
    }).catch((err)=>{
        console.log(err);
    })
})

app.post('/edit/:id', imageUpload.single('logo'), async (req, res) => {
    const { category, priority } = req.body;
    const { id } = req.params;

    // Create an object to store the fields to be updated
    const updateFields = {
        category: category
    };

    // Check if req.file is not null before updating the logo field
    if (req.file !== undefined && req.file !== null) {
        updateFields.logo = req.file.path;
    }

    categoryModel.findOneAndUpdate(
        { _id: id },
        updateFields,  // Use the object with the fields to be updated
        { new: true }  // Return the updated document
    )
    .then((data) => {
        res.redirect('/category/');
    })
    .catch((err) => {
        console.log(err);
    });
});


app.get('/status/:id/:status',async (req,res)=>{
    const id = req.params.id;
    const status = req.params.status;
    await categoryModel.updateOne({_id:id},{status:status});
    res.redirect('/category/');
 })

 app.get('/delete/:id',async (req,res)=>{
    const id = req.params.id;
    await categoryModel.deleteOne({_id:id});
    res.redirect('/category/');
 })

 app.get('/edit/:id',async(req,res)=>{
    const {id} = req.params
    const category = await categoryModel.findOne({_id:id});
    res.render('admin/category/edit',{category:category})
})


/////////////////  sub category /////////////////

 app.get('/sub_category',async(req,res)=>{
    const category  = await subModel.find().populate('category_id');
     res.render('admin/category/show_sub',{category:category});
 })


 app.get('/add_sub_category',async(req,res)=>{
    const category  = await categoryModel.find();
     res.render('admin/category/add_sub',{category:category});
 })

 app.post('/add_sub_category',imageUpload.single('logo'),async(req,res)=>{
    const {  sub_category, category_id, } = req.body;

    subModel.create({
        sub_category:sub_category,
        category_id:category_id,
        logo:typeof req.file !== 'undefined' && req.file !== null ?  req.file.path :''
    }).then((data)=>{
        res.redirect('/category/sub_category');
    }).catch((err)=>{
        console.log(err);
    })
})



app.get('/sub_status/:id/:status',async (req,res)=>{
    const id = req.params.id;
    const status = req.params.status;
    await subModel.updateOne({_id:id},{status:status});
    res.redirect('/category/sub_category');
 })

 app.get('/sub_delete/:id',async (req,res)=>{
    const id = req.params.id;
    await subModel.deleteOne({_id:id});
    res.redirect('/category/sub_category');
 })

 app.get('/sub_edit/:id',async(req,res)=>{
    const {id} = req.params
    const category = await subModel.findOne({_id:id});
    const cat = await categoryModel.find();
    res.render('admin/category/sub_edit',{category:category,cat:cat})
})


app.post('/edit_sub_category/:id', imageUpload.single('logo'), async (req, res) => {
    const {  sub_category, category_id, } = req.body;
    const { id } = req.params;

    // Create an object to store the fields to be updated
    const updateFields = {
        sub_category: sub_category,
        category_id:category_id
    };

    // Check if req.file is not null before updating the logo field
    if (req.file !== undefined && req.file !== null) {
        updateFields.logo = req.file.path;
    }

    subModel.findOneAndUpdate(
        { _id: id },
        updateFields,  // Use the object with the fields to be updated
        { new: true }  // Return the updated document
    )
    .then((data) => {
        res.redirect('/category/sub_category');
    })
    .catch((err) => {
        console.log(err);
    });
});

/// sub  sub categry

app.get('/sub_sub_category',async(req,res)=>{
    const category  = await subSubModel.find().populate('category_id').populate('sub_category_id');
    console.log(category);
    return res.render('admin/category/show_sab_sab_category',{ category:category });
})

app.get('/sub_sub_category_create',async(req,res)=>{
    const category  = await categoryModel.find();
    return res.render('admin/category/create_sab_sab_category',{ category:category });
})

app.post('/getsubcategory',async(req,res)=>{
     const { id } = req.body;
     const sub_category = await subModel.find({ category_id:id });
     return res.send({status:true, sab_category:sub_category})
})

app.post('/sub_sub_category_create',imageUpload.single('logo'),async(req,res)=>{
    const { sub_sub_category, category_sub_id, category_id, } = req.body;
    subSubModel.create({
        sub_sub_category:sub_sub_category,
        sub_category_id:category_sub_id,
        category_id:category_id,
        logo:typeof req.file !== 'undefined' && req.file !== null ?  req.file.path :''
    }).then((data)=>{
        res.redirect('/category/sub_sub_category');
    }).catch((err)=>{
        console.log(err);
    })

})



app.get('/sub_sub_status/:id/:status',async (req,res)=>{
    const id = req.params.id;
    const status = req.params.status;
    await subSubModel.updateOne({_id:id},{status:status});
    res.redirect('/category/sub_sub_category');
 })

 app.get('/sub_sub_delete/:id',async (req,res)=>{
    const id = req.params.id;
    await subSubModel.deleteOne({_id:id});
    res.redirect('/category/sub_sub_category');
 })

 app.get('/sub_sub_edit/:id',async(req,res)=>{
    const {id} = req.params
    const category = await subSubModel.findOne({_id:id});
    const sabCategory = await subModel.find({category_id:category.category_id})
    const cat = await categoryModel.find();
    res.render('admin/category/sub_sub_edit',{category:category,cat:cat,sabCategory:sabCategory})
})


app.post('/edit_sub_sub_category/:id', imageUpload.single('logo'), async (req, res) => {
    const { sub_sub_category, category_sub_id, category_id, } = req.body;
    const { id } = req.params;

    // Create an object to store the fields to be updated
    const updateFields = {
        sub_sub_category:sub_sub_category,
        sub_category_id:category_sub_id,
        category_id:category_id,
    };

    // Check if req.file is not null before updating the logo field
    if (req.file !== undefined && req.file !== null) {
        updateFields.logo = req.file.path;
    }

    subSubModel.findOneAndUpdate(
        { _id: id },
        updateFields,  // Use the object with the fields to be updated
        { new: true }  // Return the updated document
    )
    .then((data) => {
        res.redirect('/category/sub_sub_category');
    })
    .catch((err) => {
        console.log(err);
    });
});


module.exports = app;