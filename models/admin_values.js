let mongoose  = require ('mongoose');

let admin_valueSchema = mongoose.Schema({
    sales_reasons:{
        type: Array  
    },
    cancellation_reasons:{
        type: Array
    },
    payment_issues:{
        type: Array
    },
    support_reasons:{
        type: Array
    },
    languages:{
        type: Array
    }
    
});
let Admin_values = module.exports = mongoose.model('admin_values', admin_valueSchema);