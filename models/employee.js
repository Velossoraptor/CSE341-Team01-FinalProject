const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  firstName: { 
    type: String, 
    required: true,
    trim: true 
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true
  },
  phone: { 
    type: String, 
    required: true 
  },
  position: { 
    type: String, 
    required: true,
    enum: ['cashier', 'sales_associate', 'supervisor', 'manager', 'assistant_manager']
  },
  department: { 
    type: String, 
    required: true 
  },
  storeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Store',
    required: true 
  },
  salary: { 
    type: Number, 
    required: true,
    min: 0 
  },
  hireDate: { 
    type: Date, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
employeeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Remove __v from serialized outputs
employeeSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

employeeSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Employee', employeeSchema, 'employees');