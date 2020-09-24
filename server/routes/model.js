const express = require('express');
const router = express.Router();
const { Model } = require("../models/Model");
const multer = require('multer');

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Model
//=================================

router.post("/uploadImage", auth, (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/uploadModel", auth, (req, res) => {
    const model = new Model(req.body);
    model.save((err) => {
        if(err) return res.status(400).json({ success: false, err });

        res.status(200).json({ success: true})
    })

});

router.put("/updateModel", auth, (req, res) => {
    const updateModel = {
        $set: {
            modelWear: req.body.modelWear,
            modelname:req.body.modelname,
            height: req.body.height,
            bust: req.body.bust,
            images: req.body.images,
            waist: req.body.waist,
            highhip: req.body.highhip,
            lowhip: req.body.lowhip
        }
    };
    Model.findOneAndUpdate(
        { '_id': req.body.writer },
        updateModel, 
        (err)=>{
         if(err) return res.status(400).json({ success: false, err });
 
         res.status(200).json({ success: true})
     })
 
 });

router.post("/getModels", (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip); 
    let findArgs = {};
    let term = req.body.searchTerm;

    for(let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            findArgs[key] = req.body.filters[key];
        }
    }

    if (term) {
        Model.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, models) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, models, postSize: models.length })
            })
    } else {
        Model.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, models) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, models, postSize: models.length })
            })
        }
 });

 router.get("/models_by_id", (req, res) => {
    let type = req.query.type
     let modelsIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        modelsIds = [];
        modelsIds = ids.map(item => {
            return item
        })
    }

    //we need to find the models information that belong to models Id
     Model.find({ '_id': { $in: modelsIds } })
    .populate('writer')
         .exec((err, models) => {
        if(err) return req.status(400).send(err)
             return res.status(200).send(models)
    })
});

router.delete('/deleteModel',(req, res) => {
    Model.deleteOne(
        { _id: req.query.id },
        (err, doc) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true })
        })
})
module.exports = router;
