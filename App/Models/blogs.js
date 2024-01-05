var database = require(__dirname+'/../../config/Database');


const category = database.Schema({

    title:{
        type:String,
        require:true
    },

    author:{
        type:String,
        
    },

    slug:{
        type:String,
        require:true
    },

    content:{
        type:String,
        require:true
    },

    image:{
        type:String,
   
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


const couponModel = database.model('blogs',category);

module.exports=couponModel;