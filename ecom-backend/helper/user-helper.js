var db=require('../config/connection')
var bcrypt=require('bcrypt')
var collections=require('../config/collections')
const objectId=require("mongodb").ObjectID

module.exports={
    signUp:(user_details)=>{
        return new Promise(async(resolve,reject)=>{
            let if_user = await db.get().collection(collections.USERS_COLLECTION).findOne({email:user_details.email});
            if(if_user){
               resolve({status:false}) 
            }else{
                user_details.password = await bcrypt.hash(user_details.password,10)
                db.get().collection(collections.USERS_COLLECTION).insertOne(user_details).then(async(response)=>{
                    let user = await db.get().collection(collections.USERS_COLLECTION).findOne({email:user_details.email});
                    resolve({user,status:true})
                })
            }
        })
    },

    login:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let response={}
            let user=await db.get().collection(collections.USERS_COLLECTION).findOne({email:data.email})
            
            if(!user){
                resolve({status:false})
            }
            else{
                bcrypt.compare(data.password,user.password).then((status)=>{
                    if(status){
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        resolve({status:false})
                        console.log("login failed");
                    }
                })
            }
        })
    },
    addProduct:(product_details,img)=>{
        return new Promise((resolve,reject)=>{
            product_details.image = img
            db.get().collection(collections.PRODUCTS_COLLECTION).insertOne(product_details).then((res)=>{
                resolve({status:true})
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    listProducts:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCTS_COLLECTION).find().toArray().then((products)=>{
                resolve(products)
            })
        })
    }
}