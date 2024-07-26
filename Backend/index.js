const express=require('express')
const app=express()
const port=7786
app.use(express.json())
const configDB=require('./config/db')
configDB()
const cors = require('cors')
app.use(cors())
const formCltr=require('./controllers/form-ctrl')

app.post('/form/create',formCltr.create)
app.get('/getAll',formCltr.getAllForms)
app.get('/form/view/:id',formCltr.getForm)
app.post('/form/submit',formCltr.submit)
app.delete('/form/delete/:id',formCltr.delete)
app.put('/form/edit/:id',formCltr.update)

app.listen(port,()=>{
    console.log('server running on the port',port)
})