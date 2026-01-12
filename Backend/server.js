import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import productroute from "./routes/productroute.js"
import productcatagory from "./routes/product_catagory.js"
import reviewroute from "./routes/reviewroute.js"
import contact_inforoute from "./routes/contact_inforoute.js"
import contactformroute from "./routes/contactformroute.js"
import whychooseusroute from "./routes/why_choose_usroute.js"
import aboutstoryroute from "./routes/aboutstoryroute.js"
import teamroute from "./routes/teamroute.js"
import storeLocationroute from "./routes/storelocationroute.js"
import faqrouter  from "./routes/faqrouter.js"
import blogroute from "./routes/blogroute.js"
import blogcatagoryroute from "./routes/blogcatagoryroute.js"
import blogcatmap from "./routes/blogcatagorymap.js"
import blogtagmaproute from "./routes/blogtagmap.js"
import blogtagroute from "./routes/blogtagroute.js"
import blogparagraph from "./routes/blogparagraphroute.js"
import blogpresaleroute from "./routes/blogpresaleroute.js"
import blogafterroute from "./routes/blogaftersaleroute.js"
import blogcommentroute from "./routes/blogcommentroute.js"
import ordersroutes from "./routes/orderroutes.js"
import userroute from "./routes/userroute.js"
// import { createDefaultAdmin } from "./utils/createadmin.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// createDefaultAdmin();



app.use("/api/catagory_product" , productcatagory);
app.use("/api/product" ,productroute);
app.use("/api/review" , reviewroute);
app.use("/api/contact_info" , contact_inforoute);
app.use("/api/contact_form" , contactformroute);
app.use("/api/why_choose_us" , whychooseusroute);
app.use("/api/about_story",aboutstoryroute);
app.use("/api/team" , teamroute);
app.use("/api/store_location", storeLocationroute);
app.use("/api/faqs", faqrouter);
app.use("/api/blog_cat" , blogcatagoryroute);
app.use("/api/blog_Tag" , blogtagroute);
app.use("/api/blogs" , blogroute);
app.use("/api/blogmap", blogcatmap);
app.use("/api/blog_tag_map", blogtagmaproute);
app.use("/api/blog_para", blogparagraph);
app.use("/api/blog_presale",blogpresaleroute);
app.use("/api/blogafter" , blogafterroute);
app.use("/api/blogcomment", blogcommentroute);
app.use("/api/orders" , ordersroutes);
app.use("/api/users" , userroute);

app.get("/", (req, res) => {
  res.send("Hello developer, server is running...");
});




const PORT = process.env.PORT || 7000;

app.listen(PORT, () => 
  console.log(`Server is running on port ${PORT}`)
);
