const express = require('express');
const app = express.Router();
const imageUpload = require(__dirname+'/../../middleware/uploadImage');
const news = require(__dirname+'/../../Models/news');

const multer = require('multer');

app.get('/show',async(req,res)=>{
    const category = await news.find();
    res.render('admin/news/show',{category:category});
})

app.get('/add',(req,res)=>{
    res.render('admin/news/add');
})

app.post('/add',imageUpload.single('image'),async(req,res)=>{
    const {  title, author, slug, content, } = req.body;

    news.create({
        title:title,
        image:typeof req.file !== 'undefined' && req.file !== null ?  req.file.path :'',
        slug:slug,
        author:author,
        content:content
    }).then((data)=>{
        res.redirect('/news/show');
    }).catch((err)=>{
        console.log(err);
    })
})

app.post('/edit/:id', imageUpload.single('image'), async (req, res) => {
    const {  title, author, slug, content, } = req.body;
    const { id } = req.params;

    // Create an object to store the fields to be updated
    const updateFields = {
        title:title,
        slug:slug,
        author:author,
        content:content
    };

    // Check if req.file is not null before updating the logo field
    if (req.file !== undefined && req.file !== null) {
        updateFields.image = req.file.path;
    }

    news.findOneAndUpdate(
        { _id: id },
        updateFields,  // Use the object with the fields to be updated
        { new: true }  // Return the updated document
    )
    .then((data) => {
        res.redirect('/news/show');
    })
    .catch((err) => {
        console.log(err);
    });
});


app.get('/status/:id/:status',async (req,res)=>{
    const id = req.params.id;
    const status = req.params.status;
    await news.updateOne({_id:id},{status:status});
    res.redirect('/news/show');
 })

 app.get('/delete/:id',async (req,res)=>{
    const id = req.params.id;
    await news.deleteOne({_id:id});
    res.redirect('/news/show');
 })

 app.get('/edit/:id',async(req,res)=>{
    const {id} = req.params
    const category = await news.findOne({_id:id});
    res.render('admin/news/edit',{category:category})
})


module.exports = app;