var database = require(__dirname+'/../../config/Database');


const inquery = database.Schema({

    name:{
        type:String,
       
    },
    email:{
        type:String,
    },
    contact:{
        type:Number,
       
    },
    requirement:{
        type:String,
      
    },
    message:{
        type:String,
      
    },
    from:{
        type:String,
    },
    added_on:{
        type:Date,
        default: new Date()
    }

})

const contectIquery = database.model('contact_inqery',inquery);

module.exports=contectIquery;