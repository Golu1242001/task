const express = require('express');
const app = express.Router();
const imageUpload = require(__dirname+'/../../middleware/uploadImage');
const client = require(__dirname+'/../../Models/client_image');
const inquey = require(__dirname+'/../../Models/contact_inquary');

const multer = require('multer');

app.get('/show',async(req,res)=>{
    const category = await client.find();
    console.log(category);
    
    res.render('admin/client/show',{category:category});
})

app.get('/add',(req,res)=>{
    res.render('admin/client/add');
})

app.post('/add',async(req,res)=>{
    const {  title, link, meta, desc, } = req.body;
      console.log(title)
    client.create({
        youtube_video_title:title,
        youtube_video_link:link,
        youtube_video_desc:desc,
        meta_tag:meta
    }).then((data)=>{
        res.redirect('/client/show');
    }).catch((err)=>{
        console.log(err);
    })
})

app.post('/edit/:id',  async (req, res) => {
    const {  title, link, meta, desc, } = req.body;
    const { id } = req.params;

    // Create an object to store the fields to be updated
    const updateFields = {
        youtube_video_title:title,
        youtube_video_link:link,
        youtube_video_desc:desc,
        meta_tag:meta
    };

    // Check if req.file is not null before updating the logo field
  
    client.findOneAndUpdate(
        { _id: id },
        updateFields,  // Use the object with the fields to be updated
        { new: true }  // Return the updated document
    )
    .then((data) => {
        res.redirect('/client/show');
    })
    .catch((err) => {
        console.log(err);
    });
});


app.get('/status/:id/:status',async (req,res)=>{
    const id = req.params.id;
    const status = req.params.status;
    await client.updateOne({_id:id},{status:status});
    res.redirect('/client/show');
 })

 app.get('/delete/:id',async (req,res)=>{
    const id = req.params.id;
    await client.deleteOne({_id:id});
    res.redirect('/client/show');
 })

 app.get('/edit/:id',async(req,res)=>{
    const {id} = req.params
    const category = await client.findOne({_id:id});
    res.render('admin/client/edit',{category:category})
})


app.get('/inquery',async(req,res)=>{
    const data = await inquey.find();
    res.render('admin/contact/show_contact',{contact:data});
})

module.exports = app;