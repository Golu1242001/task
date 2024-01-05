var database = require(__dirname+'/../../config/Database');


const category = database.Schema({

    category:{
        type:String,
        require:true
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


const couponModel = database.model('category',category);

module.exports=couponModel;