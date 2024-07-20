
const urlCheck = () =>{
  return async (req, res, next) =>{
   // console.log(req.headers)
   //console.log(req.originalUrl)
   const url = req.originalUrl
   const sayfalar = ["firma", "login", "panel", "payment", "register", "urunlistele"]
   const url_split = url.split("/")[1]
   
   if(url_split.length === 0) {
    next();
   }else if(url_split.length > 0) {
    
    console.log(url_split)
   }
    
  }
}

module.exports = {urlCheck}