const mongoose = require("mongoose");
import { v4 }  from 'uuid'
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    
    title: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    isEdit: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("task", taskSchema);