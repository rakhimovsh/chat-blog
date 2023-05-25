import jwt from "jsonwebtoken";
import {secret} from "../config.js"

function sign (data){
  return jwt.sign(data, secret)
}
function verify(token){
  return jwt.verify(token, secret)
}

export default {sign, verify}




