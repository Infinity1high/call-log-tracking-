let mongoose  = require ('mongoose');
let mongoosePaginate = require('mongoose-paginate');


let callInfoSchema = mongoose.Schema({
   
    client_type:{
        type: String,
       
    },
    time:{
        time_start: {
           type: String,
           
        },
        time_end: {
            type: String,
            
         },
         time_duration: {
            type: String,
         }
        },
    operator:{
        type: String
    },  
    department:{
        type: String
    },  

    date:{
         type: Date
        },
    session_code:{
        type: String
    },    
    customer_id:{
        type: String
    },
    platform:{
        type: String
    },
    call_reason_sales:{
        type: String
    },
    call_reason_support:{
        type: String
    },
    payment_issue: {
        type: String
    },
    cancelation_reason: {
        type: String
    },
    language: {
        type: String
    },
    usage_possibility: {
        type: String
    },
    issue_resolved: {
        type: String
    },
    email: {
        type: String
    },
    comment: {
        type: String
    },
    call_result:{
        type: String
    }

});
callInfoSchema.plugin(mongoosePaginate);
let call_details = module.exports = mongoose.model('call_details', callInfoSchema);