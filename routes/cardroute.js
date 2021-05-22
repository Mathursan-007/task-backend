const router =require('express').Router();
const {addCard,getCards,addList,handleList} = require('../api/cards.api');


router.get('/',(req,res)=>{

    req.body=getCards();
    console.log(req.body);
});

router.post('/',(req,res)=>{
    let card = req.body
    card =addCard(card)
    res.body=card
    console.log(res.body);
});

router.post('/lists',(req,res)=>{
    let list=req.body
    list =addList(list);
    res.body=list;
    console.log(res.body)
})

router.patch('/lists/:id',(req,res)=>{


    let state=req.body;
    let id=req.params.id;
    let list=handleList(id,state);
    res.body=list;
    console.log(res.body);

})

module.exports=router;