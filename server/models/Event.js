const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

  eventname: {
    type: String,
    required: 'This field is required.'
  },
  attendants: {
    type: Array
  },
  capacity: {
    type: Number,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  address: {
    type: String,
    required: 'This field is required.'
  },
  country: {
    type: String,
    enum: ['Denmark', 'Iceland', 'Germany', 'Netherlands', 'Norway', 'Jerusalem', 'China', 'Poland', 'Sweden'],
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['Music', 'Technology', 'Cultural', 'Fitness', 'Science', 'Food', 'History', 'Marketing', 'Art', 'Other' ],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});

eventSchema.index({ eventname: 'text', attendants: 'text',  description: 'text', category: 'text', image: 'text', capacity: 'text', country: 'text', address: 'text' });

module.exports = mongoose.model('Event', eventSchema);