const express = require('express');
const app = express.Router();
const imageUpload = require(__dirname+'/../../middleware/uploadImage');
const categoryModel = require(__dirname+'/../../Models/category');
const subModel = require(__dirname+'/../../Models/sub_category');
const subSubModel = require(__dirname+'/../../Models/sub_sub_category');

const product = require(__dirname+'/../../Models/product_deils');
const client = require(__dirname+'/../../Models/client_image');
const multer = require('multer');

app.get('/',async(req,res)=>{
    const category = await categoryModel.find();
    const subModels = await subModel.find();
    const subSubModels = await subSubModel.find();
    
    res.render('admin/product/show',{category:category, subModel:subModels, subSubModel:subSubModels});
})
app.post('/create', imageUpload.fields(), async (req, res) => {
    try {
      const {
        name, category_id, sub_category, sub_sub_category, tags, desc, meta_title, meta_desc, meta_keyword, seo_url,
        head_tag, body_tag, footer_desc, alt1, alt2, alt3, alt4,
        youtube_video_link, youtube_video_title, youtube_video_desc
      } = req.body;
      console.log(req.files);

     
  
      const product_insert = await product.create({
        name: name,
        category_id: category_id,
        sub_category: sub_category,
        sub_sub_category: sub_sub_category,
        tags: tags,
        desc: desc,
        alt1: alt1,
        alt2: alt2,
        alt3: alt3,
        alt4: alt4,
        image1: req.files['image1'] ? req.files['image1'][0].path : '',
        image2: req.files['image2'] ? req.files['image2'][0].path : '',
        image3: req.files['image3'] ? req.files['image3'][0].path : '',
        image4: req.files['image4'] ? req.files['image4'][0].path : '',
        youtube_video_link: youtube_video_link,
        meta_title: meta_title,
        meta_desc: meta_desc,
        meta_keyword: meta_keyword,
        seo_url: seo_url,
        head_tag: head_tag,
        body_tag: body_tag,
        footer_desc: footer_desc
      });
  
      for (let i = 0; i < youtube_video_link.length; i++) {
        await client.create({
          product_id: product_insert._id,
          youtube_video_link: youtube_video_link[i],
          youtube_video_title: youtube_video_title[i],
          youtube_video_desc: youtube_video_desc[i]
        });
      }
  
   
  
    } catch (error) {
     
      console.error(error);
      res.status(500).send({'Internal Server Error':error});
    }
  });
  

module.exports = app;