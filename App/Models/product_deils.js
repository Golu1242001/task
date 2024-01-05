const database = require(__dirname+'/../../config/Database');

const product = database.Schema({

  
    name:{
        type:String,
              
    },
    category_id:{
        type: database.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },

    sub_category:{
        type: database.Schema.Types.ObjectId,
        ref: 'sub_category',
        required: true
    },

    sub_sub_category:{
        type: database.Schema.Types.ObjectId,
        ref: 'sub_sub_category',
        required: true
    },

    tags:{
        type:String
    },
    desc:{
        type:String
    },
    youtube_video_link:{
        type:String
    },

    image1:{
        type:String
    },
    image2:{
        type:String
    },
    image3:{
        type:String
    },

    image4:{
        type:String
    },

    alt1:{
        type:String
    },
    alt2:{
        type:String
    },
    alt3:{
        type:String
    },
    alt4:{
        type:String
    },

    meta_title:{
        type:String
    },

    meta_desc:{
        type:String
    },

    meta_keyword:{
        type:String
    },

    seo_url:{
        type:String
    },

    head_tag:{
        type:String
    },

    body_tag:{
        type:String
    },

    footer_desc:{
        type:String
    },
    Date:{
        type:Date,
        default: new Date(),
        required:true
    }
});


const bankAllDetaile = database.model('product_detls',product);
console.log('uploads..');
module.exports = bankAllDetaile;