import express, { Application ,Request,Response } from "express"
import cors from "cors"
import { booksRoute } from "./app/controllers/book.controller"
import { borrowRoute } from "./app/controllers/borrow.controller"
const app:Application = express()

// Enable CORS for all routes
app.use(cors({
  origin: ['https://library-eight-brown.vercel.app', 'https://librarymanagement2.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))

app.use(express.json())
app.use('/api/books',booksRoute)
app.use('/api/borrow',borrowRoute)

app.get('/',(req:Request,res:Response)=>{
    res.send("welcome to library  app")
})


export default app