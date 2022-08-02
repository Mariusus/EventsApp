require('../models/database');
const Country = require('../models/Country');
const Category = require('../models/Category');
const Event = require('../models/Event');
const {mongo} = require("mongoose");
const mongoose = require("mongoose");
const {Client} = require("@googlemaps/google-maps-services-js");
const Chart = require('chart.js');

exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const latest = await Event.find({}).sort({_id: -1}).limit(limitNumber);
    const categories = await Category.find({}).limit(limitNumber);
  //  const countries = await Country.find({}).limit(limitNumber);
    const music = await Event.find({ 'category': 'Music' }).limit(limitNumber);
    const technology = await Event.find({ 'category': 'Technology' }).limit(limitNumber);
    const cultural = await Event.find({ 'category': 'Cultural' }).limit(limitNumber);
    const fitness = await Event.find({ 'category': 'Fitness' }).limit(limitNumber);
    const science = await Event.find({ 'category': 'Science' }).limit(limitNumber);
    const food = await Event.find({ 'category': 'Food' }).limit(limitNumber);
    const history = await Event.find({ 'category': 'History' }).limit(limitNumber);
    const marketing = await Event.find({ 'category': 'Marketing' }).limit(limitNumber);
    const art = await Event.find({ 'category': 'Art' }).limit(limitNumber);
    const other = await Event.find({ 'category': 'Other' }).limit(limitNumber);

  //  const denmark = await Country.find({ 'name': 'Denmark' }).limit(limitNumber);
   // const china = await Country.find({ 'name': 'China' }).limit(limitNumber);
   // const poland = await Country.find({ 'name': 'Poland' }).limit(limitNumber);
   // const netherlands = await Country.find({ 'name': 'Netherlands' }).limit(limitNumber);
   // const jerusalem = await Country.find({ 'name': 'Jerusalem' }).limit(limitNumber);
  //  const sweden = await Country.find({ 'name': 'Sweden' }).limit(limitNumber);
   // const norway = await Country.find({ 'name': 'Norway' }).limit(limitNumber);
   // const germany = await Country.find({ 'name': 'Germany' }).limit(limitNumber);



    const events = { latest, Music: music, Technology: technology, Cultural: cultural, Science: science, Food: food, History: history, Marketing: marketing, Art: art, Other: other, Fitness: fitness };
   // const Country = {Denmark: denmark, China: china, Poland: poland, Netherlands: netherlands, Jerusalem: jerusalem, Sweden: sweden, Norway: norway, Germany: germany };
    res.render('index', { title: 'Events Across The World', categories, events } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

exports.ViewCountries = async(req, res) => {
  try {
    const limitNumber = 20;
    const countries = await Country.find({}).limit(limitNumber);
    res.render('countries', { title: 'Event Countries', countries } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

exports.ViewCountriesIds = async(req, res) => {
  try {
    let countryId = req.params.id;
    const limitNumber = 20;
    const countryById = await Country.find({ 'country': countryId }).limit(limitNumber);
    res.render('countries', { title: 'Event App - Countries', countryById } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

exports.ViewCategories = async(req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Event Categories', categories } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

exports.ViewCategoriesIds = async(req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Event.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Event App - Categories', categoryById } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

exports.ViewEvent = async(req, res) => {

  try {
    let EventId = req.params.id;
    const event = await Event.findById(EventId);
   const address = await event.address;
// console.log(address);


    res.render('event', { title: 'View All Events', event } );

  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

exports.searchByCountry = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let country = await Country.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Search By Country', country } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
  
}


exports.exploreLatest = async(req, res) => {
  try {

    const limitNumber = 20;
    const events = await Event.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('latest', { title: 'Latest Events', events } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

exports.ViewAnalytics = async(req, res) => {
  try {
    const denmark = await Event.find({'country': 'Denmark'});
    const norway = await Event.find({'country': 'Norway'});
    const netherlands = await Event.find({'country': 'Netherlands'});
    const germany = await Event.find({'country': 'Germany'});
    const poland = await Event.find({'country': 'Poland'});
    const china = await Event.find({'country': 'China'});
    const iceland = await Event.find({'country': 'Iceland'});
    const sweden = await Event.find({'country': 'Sweden'});
    const countries = { Denmark: denmark, Norway: norway, Netherlands: netherlands, Germany: germany, Poland: poland, China: china, Iceland: iceland, Sweden: sweden};

    const music = await Event.find({ 'category': 'Music' });
    const technology = await Event.find({ 'category': 'Technology' });
    const cultural = await Event.find({ 'category': 'Cultural' });
    const fitness = await Event.find({ 'category': 'Fitness' });
    const science = await Event.find({ 'category': 'Science' });
    const food = await Event.find({ 'category': 'Food' });
    const history = await Event.find({ 'category': 'History' });
    const categories = { Music: music, Technology: technology, Cultural: cultural, Fitness: fitness, Science: science, Food: food, History: history};

    const capacity = await Event.find({});

    res.render('analytics', { title: 'Analytics', countries, categories, capacity } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

exports.PostEvent = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-event', { title: 'Submit An Event', infoErrorsObj, infoSubmitObj  } );
}

exports.SubmitPostEvent = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('Image must be uploaded');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/eventimages/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);
      })

    }

    const newEvent = new Event({
      eventname: req.body.eventname,
      description: req.body.description,
      capacity: req.body.capacity,
      category: req.body.category,
      address: req.body.address,
      country: req.body.country,
      image: newImageName
    });
    
    await newEvent.save();

    req.flash('infoSubmit', 'Event Submitted')
    res.redirect('/submit-event');
  } catch (error) {
    req.flash('infoErrors', error);
    res.redirect('/submit-event');
  }
}

exports.deleteEvent = async(req, res) => {

try{
  let id = req.params.id;
  const exp = await Event.findById(id);
//const names = id.address;
  const countryById = await Event.findOneAndDelete(id);
  console.log(id);
//  const idtodelete = await Product.findById('_id').exec();
  //const idtodelete = await Event.findOne({ _id : msongoose.Types.ObjectId(EventId)});
 // let EventId = params.itemname;
 // const product = await Product.findById(EventId);
  //await Product.deleteOne({ itemname: 'test' });
 //  await Event.findByIdAndDelete(countryById);
  //idtodelete = db.collections('products').ObjectId;d
 // const newupdate = await EventId.findById('_id');
   // console.log(idtodelete);
 // const newupdate = await Product.find({Product}, {'_id': req.paramas.id});
 // let idtoremove = Product.find({this: '_id'});
 // await Product.findByIdAndDelete(idtoremove);

  req.flash('infoSubmit', 'Event has been deleted')
  res.redirect('/latest');
  res.nModified; // Number of documents modifiedd

} catch (error)
{
  console.log(error);
}
}


exports.updateEvent = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('update-event', { title: 'Update an Event', infoErrorsObj, infoSubmitObj  } );
}
exports.PostupdateEvent = async(req, res) => {

  try {
    let eventid = req.params.id;
    const idtoupdate = await Event.find({ 'events': eventid });
    let imageUploadFile;
    let uploadPath;
    let newImageName;
    imageUploadFile = req.files.image;
    newImageName = Date.now() + imageUploadFile.name;

    uploadPath = require('path').resolve('./') + '/public/eventimages/' + newImageName;
    imageUploadFile.mv(uploadPath, function(err){
      if(err) return res.status(500).send(err);
    })
    const newupdate = await Event.updateOne({idtoupdate}, {eventname: req.body.eventname,
      description: req.body.description,
      capacity: req.body.capacity,
      country: req.body.country,
      address: req.body.address,
      category: req.body.category,
      image: newImageName

    });

    req.flash('infoSubmit', 'Event has been updated')
     res.n; // Number of documents matched
    res.nModified; // Number of documents modified

  } catch (error) {
     console.log(error);
   }
 }
