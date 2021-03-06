const controllers = require('../controllers')
const restrictedPages = require('./auth')

module.exports = app =>{
    app.get('/', controllers.home.index)

    //Example how to use Authentication or Role
    app.get('/about', restrictedPages.isAuthenticated, controllers.home.about)
    // app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about)
    
    app.get('/loginRegister', controllers.user.registerGet)
    app.post('/register', controllers.user.registerPost)   
    
    app.post('/logout', controllers.user.logout)
    app.get('/loginRegister', controllers.user.loginGet)
    app.post('/login', controllers.user.loginPost)
    
    //Add Picture
    app.get('/addPicture', controllers.picture.getAddPictureView)
    app.post('/addPicture', controllers.picture.addPicture)

    app.get('/details', controllers.picture.getDetails)
    app.get('/like/:id', controllers.picture.likeDislike)

    //comment
    app.post('/comment/:id',controllers.comment.addComment)

    app.get('/addCategories', controllers.categories.getView)
    app.post('/addCategories', controllers.categories.createCategory)
    
    //list
    app.get('/list', controllers.picture.getList)

    app.get('/getDetails/:id',controllers.user.getDetails)
    app.get('/banUser/:id',restrictedPages.hasRole('Admin'), controllers.user.banUser)
    
    app.all('*', (req,res)=>{
        res.status(404)
        res.send('404 NOT Found')
        res.end()
    })
}