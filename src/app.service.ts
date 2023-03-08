import { Injectable } from '@nestjs/common';
const mongoose=require("mongoose");

const uri = "mongodb+srv://root:root@cluster0.b4kiclv.mongodb.net/test"

mongoose.connect("mongodb+srv://root:root@cluster0.b4kiclv.mongodb.net/test",{useNewUrlParser:true},()=>{
    console.log("Connected to Database");
});




@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }
}
