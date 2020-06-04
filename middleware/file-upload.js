// let fs = require('fs-extra');

const multer = require('multer');
// const uuid = require('uuid/v1');
// const { v1: uuidv1 } = require('uuid');
// import { v1 as uuidv1 } from 'uuid';             //========>>>   WTF UUID !!!!!!!!!!!!   FIX THIS SHIT !
// const uuid = require('uuid').v1;
// const uuid = require("uuid")
const uuid = require('uuidv1');


const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {               //---> cb stands for callBack fn
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];                   //---> so now we have either true or false stored in isValid !
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

// const fileUpload = multer({
//   limits: 500000,
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {          
//       let path = 'uploads/images';
//       fs.mkdirsSync(path); 
//       cb(null, path); 
//     },
//     filename: (req, file, cb) => {
//       const ext = MIME_TYPE_MAP[file.mimetype];
//       cb(null, uuid() + '.' + ext);
//     }
//   }),
//   fileFilter: (req, file, cb) => {
//     const isValid = !!MIME_TYPE_MAP[file.mimetype];                    
//     let error = isValid ? null : new Error('Invalid mime type!');
//     cb(error, isValid);
//   }
// });

module.exports = fileUpload;