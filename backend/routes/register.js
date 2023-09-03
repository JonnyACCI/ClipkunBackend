const router = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt');
const cors=require('cors');

router.use(cors({
    origin: "https://clipkun.vercel.app/signup"

}));


router.post('/',async (req, res) => {
    let {name, password} = req.body;
    const arr = await User.find({});
    const userCount=arr.length+1;
    const hash = await bcrypt.hash(password,13);
    password=hash;
    const clipCount=0;
    const storage=0;
    User.findOne({name:name})
    .then(user =>{
        if (user){
            res.json("A user with that name already exists.")
        }
        else{
            User.create({name,password,userCount,clipCount,storage})
            .then(res.json("Success"))
            .catch(err=>res.json(err));
        }
    })
});



module.exports = router;