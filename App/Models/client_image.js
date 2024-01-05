var database = require(__dirname+'/../../config/Database');

const client= database.Schema({

    product_id:{
        type: database.Schema.Types.ObjectId,
        ref: 'product_detls',
       
    },

    youtube_video_link:{
        type:String
    },
    youtube_video_title:{
        type:String
    },
    youtube_video_desc:{
        type:String
    },
    meta_tag:{
        type:String
    },
    status:{
        type:Number,
        default:1
    }


});


const couponModel = database.model('client_youtube',client);

module.exports=couponModel;