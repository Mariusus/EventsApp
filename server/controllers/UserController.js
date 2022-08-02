require('../models/database');
const User = require('../models/User');
const {mongo} = require("mongoose");
const mongoose = require("mongoose");


exports.ViewUser = async(req, res) => {
    try {
        let UserId = req.params.id;
        const user = await User.findById(UserId);
        res.render('user', { title: 'View Users', user } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}


exports.PostUser = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-user', { title: 'Register a new user', infoErrorsObj, infoSubmitObj  } );
}

exports.SubmitPostUser = async(req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('Image must be uploaded');
        } else {

            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/userimages/' + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
            })

        }

        const newUser = new User({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            password: req.body.password,
            country: req.body.country,
            city: req.body.city,
            address: req.body.address,
            occupation: req.body.occupation,
            image: newImageName
        });

        await newUser.save();

        req.flash('infoSubmit', 'Registration Complete')
    } catch (error) {
        req.flash('infoErrors', error);
        res.redirect('/submit-user');
    }
}


exports.updateUser = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('update-user', { title: 'Update your profile', infoErrorsObj, infoSubmitObj  } );
}
exports.PostupdateUser = async(req, res) => {

    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;

        uploadPath = require('path').resolve('./') + '/public/userimages/' + newImageName;
        imageUploadFile.mv(uploadPath, function(err){
            if(err) return res.status(500).send(err);
        })
        const newupdate = await User.updateOne({User}, {
            occupation: req.body.occupation,
            city: req.body.city,
            country: req.body.country,
            age: req.body.age,
            password: req.body.password,
            image: newImageName
        });

        req.flash('infoSubmit', 'Profile Updated')
        res.n; // Number of documents matched
        res.nModified; // Number of documents modified

    } catch (error) {
        console.log(error);
    }
}
