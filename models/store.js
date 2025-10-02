const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'USA' }
  },
  phone: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true
  },
  managerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  operatingHours: {
    monday: { 
      open: { type: String, default: '09:00' }, 
      close: { type: String, default: '18:00' } 
    },
    tuesday: { 
      open: { type: String, default: '09:00' }, 
      close: { type: String, default: '18:00' } 
    },
    wednesday: { 
      open: { type: String, default: '09:00' }, 
      close: { type: String, default: '18:00' } 
    },
    thursday: { 
      open: { type: String, default: '09:00' }, 
      close: { type: String, default: '18:00' } 
    },
    friday: { 
      open: { type: String, default: '09:00' }, 
      close: { type: String, default: '18:00' } 
    },
    saturday: { 
      open: { type: String, default: '10:00' }, 
      close: { type: String, default: '16:00' } 
    },
    sunday: { 
      open: { type: String, default: '12:00' }, 
      close: { type: String, default: '16:00' } 
    }
  },
  storeType: {
    type: String,
    enum: ['retail', 'warehouse', 'outlet', 'flagship'],
    default: 'retail'
  },
  capacity: {
    type: Number,
    min: 0,
    default: 100
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
storeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Store', storeSchema, 'stores');