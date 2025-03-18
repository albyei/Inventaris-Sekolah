import  express  from "express";
import cors from 'cors'
// import kategoriRoute from './routers/kategoriRoute'
import produkRoute from './routers/barangRoute'
import userRoute from './routers/userRoute'
import borrowRoute from './routers/borrowRoute'
import inventoryRoute from './routers/inventoryRoute'
// import functionRoute from './routers/functionRoute'



import {PORT} from './global'

const app = express()
app.use(cors())

// app.use(`/kategori`, kategoriRoute)
app.use(`/barang`, produkRoute)
app.use(`/user`, userRoute)
app.use(`/borrow`,borrowRoute)
app.use(`/inventory`,inventoryRoute)

app.listen(PORT, () => {
    console.log (`[server]: Server is running at http://localhost:${PORT}`)
})