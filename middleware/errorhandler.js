const {constants}=require("../const");
const errorhandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
          res.json({title:"validation failed",message:err.message,stackTrace:err.stack});
          break;
        case constants.NOT_FOUND:
          res.json({title:"not found",message:err.message,stackTrace:err.stack});
          break;
        case constants.UNAUTHORIZED:
          res.json({title:"unauthorized",message:err.message,stackTrace:err.stack});
          break;
        case constants.FORBIDDEN:
          res.json({title:"forbidden",message:err.message,stackTrace:err.stack});
          break;
        case constants.INTERNAL_SERVER_ERROR:
          res.json({title:"internal server error",message:err.message,stackTrace:err.stack});
          break;       
        default:
            console.log("no error, all good");
           break;
    }
};

module.exports=errorhandler;