const router =require('express').Router();
const {addCard,getCards,addList,handleList} = require('../api/cards.api');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

router.get('/',(req,res)=>{

    res.send(getCards());

});

router.post('/',(req,res)=>{
    let card = req.body
    card =addCard(card)
    res.send(card)
});

router.post('/lists',(req,res)=>{

    let list=req.body
    list =addList(list);
    res.send(list);

})

router.patch('/lists/:id',(req,res)=>{


    let state=req.body;
    let id=req.params.id;
    let list=handleList(id,state);
    res.send(list);

})

router.post('/add',upload.single('File'),async (req,res)=>{

    try{

        console.log(req.body.file)
        let result = await cloudinary.uploader.upload(req.body.file.path,{ public_id: req.body.file.originalname,resource_type: "raw" });
        console.log(result);

    } catch (err) {
        console.log(err);
    }


})

module.exports=router;