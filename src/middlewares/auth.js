const adminAuth = (req,res,next)=>{
    console.log('Check admin authorization from new file');
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Admin");
    }else{
        next();
    }
}
const userAuth = (req,res,next) =>{
    console.log("checking User authorization from new file")
    const token = "abc";
    const isUserAuthorized = token === "abc";
    if(!isUserAuthorized){
        res.status(401).send("user authorized failed")
    }else{
        next();
    }
}
module.exports = { adminAuth, userAuth}