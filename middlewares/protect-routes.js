function protectAdminRoutes(req,res,next){
    if(req.path.startsWith('/orders') && !res.locals.isAuth){
        return res.redirect('/401');
    }

    if(req.path.startsWith("/admin") && !res.locals.isAdmin){
    res.redirect('/403')
    return;
}

next()
}

module.exports = protectAdminRoutes;