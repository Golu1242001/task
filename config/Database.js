const mongoose =  require('mongoose');


// mongodb://localhost:27017
// mongodb+srv://webdeveloper1:IK9ez3LQ91YwQU7F@cluster0.6qnw3vh.mongodb.net/myDatabase?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://dipeshkumar813090:Dcode%401998@mydb.sklqluw.mongodb.net/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
  console.log('Connected to database!');
}).catch((error) => {
    console.log('Connection failed!', error);
});

module.exports = mongoose;
