const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        default:"",
    },
    isSubscribed:{
        type:Boolean,
        default:true,
    },
    model:{
        type:String,
        default:"iphone 14"
    },
    frequency:{
        type:String,
        default:"daily"
    }
})

module.exports = mongoose.model("User", userSchema);