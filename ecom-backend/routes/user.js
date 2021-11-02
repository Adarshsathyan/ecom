var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper');

let verifyLogin = (req,res,next)=>{
    if(req.session.userLoggedIn){
        next()
    }else{
        
        res.send({status:false})
    }
}

//signup
router.post('/signup',(req,res)=>{
    userHelper.signUp(req.body).then((response)=>{
        if(response.status){
            req.session.userLoggedIn = true;
            req.session.user=response.user;
            res.send({status:true})
        }else{
            res.send({status:false})
        }
    })
})

//login
router.post('/login',(req,res)=>{
    userHelper.login(req.body).then((response)=>{
        if(response.status){
            req.session.userLoggedIn=true;
            req.session.user = res.user;
            res.send(response)
        }else{
            res.send(response)
        }
    })
})
//logout
router.get('/logout',(req,res)=>{
    req.session.userLoggedIn=null
    req.session.user=null
    res.send({status:true})
})
//addproduct
router.post('/addproduct',verifyLogin,(req,res)=>{     
    userHelper.addProduct(req.body).then((resp)=>{
        if(resp.status){
            
            res.send({status:true})
        }else{
            res.send({status:false})
        }
    }).catch((err)=>{
        res.send(err)
    })
})

//list product
router.get('/products',verifyLogin,(req,res)=>{
    userHelper.listProducts().then((products)=>{
        res.send(products)
    })
})


module.exports = router;