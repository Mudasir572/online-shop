function handleError(error,req,res,next){
    
    if(error.code === 404){
         res.status(404).render("shared/404");
         return;
    }
    res.status(500).render("shared/500")
 
}

module.exports = handleError;