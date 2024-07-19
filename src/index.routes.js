import authRouter from './modules/Auth/auth.router.js';
import childrenInfoRouter from './modules/childrenInformation/childrenInfo.router.js';
import homeRouter from './modules/dashboard/home.router.js';
import foundChildrenRouter from './modules/foundChildren/foundChildren.router.js';
import foundReportRouter from './modules/foundReport/foundReport.router.js';
import missingReportRouter from './modules/missingReport/missingReport.router.js';
import mlModelRouter from './modules/mlModel/mlModel.router.js';
import { AppError } from './utils/AppError.js';
import { globalErrorMiddleware } from "./utils/globalErrMiddleware.js";
import notificationRouter from './modules/notification/notification.router.js';


export function init(app){

app.use(authRouter)
app.use(childrenInfoRouter)
app.use(homeRouter)
app.use(foundChildrenRouter)
app.use(foundReportRouter)
app.use(missingReportRouter)
app.use(mlModelRouter)
app.use(notificationRouter)

app.get('/' ,(req,res)=>{
    res.render('signIn.ejs',{ isLoggedIn: false ,error:req.flash('info')})
})

app.all('*',(req,res,next)=>{
    if (!req.session.isLoggedIn) return res.redirect("/signIn");
    res.redirect("/home");
})


app.use(globalErrorMiddleware)
}
