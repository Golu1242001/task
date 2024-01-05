var database = require(__dirname+'/../../config/Database');


const category = database.Schema({

    sub_category:{
        type:String,
        require:true
    },

    category_id:{
        type: database.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },

    logo:{
        type:String,
        require:true
    },

    status:{
        type:Number,
        default:1
    },

    added_on:{
        type:Date,
        default: new Date(),
    }
})


const couponModel = database.model('sub_category',category);

module.exports=couponModel;