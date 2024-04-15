//Packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

//Utils
import connectDB from './confg/db.js'
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

//Mongoose Setup
const PORT = process.env.PORT || 6001;
connectDB();

//Configurations
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


//Routes
app.use("/api/users", userRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/orders", orderRoutes)

app.get('/api/config/paypal', (req, res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

const __dirname = path.resolve()

app.use("/uploads", express.static(path.join(__dirname + 'https://shoppers-prime-backend-production.up.railway.app/uploads')))

//Start Listening
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));

