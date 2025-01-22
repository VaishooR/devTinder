const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ['ignored', 'interested','accepted','rejected'],
            message : '{VALUE} is invalid status'
        }
    }
},{
    timestamps : true
})

connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send request to yourself")
    }
})

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema)