const exp = require('express')
const app  = exp();
require('dotenv').config(); // makes env variables available in process.env
const mongoose = require('mongoose');
const userApp = require('./APIs/userApi');
const authorApp = require('./APIs/authorApi');
const adminApp = require('./APIs/adminApi');
const cors = require('cors')
const checkRoleApp = require('./APIs/checkRole');
const notifyRoutes = require('./routes/notifyRoutes');


app.use(cors())

const port = process.env.PORT || 4000;

//db connection
mongoose.connect(process.env.DBURL)
.then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`))
    console.log("DB connection successful")
})

.catch(err => console.log("Error in DB connection", err))

// Body parser middleware
app.use(exp.json())

//connect API routes
app.use('/user-api', userApp)
app.use('/author-api', authorApp)
app.use('/admin-api', adminApp)
app.use('/checkRole', checkRoleApp);
app.use('/notify-api', notifyRoutes);
// Error handler middleware
app.use((err, req, res, next) => {
    console.log("Error in express error handler: ",err)
    res.send({message: err.message})
})

