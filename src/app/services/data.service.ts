import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const options={
  headers: new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUserName:any
  currentAcno:any


  users: any = {
    1000: { acno: 1000, uname: "sheffy", password: "1000", balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "vivek", password: "1001", balance: 5000,transaction:[]  },
    1002: { acno: 1002, uname: "ajay", password: "1002", balance: 5000,transaction:[]  }
  }


  constructor(private http:HttpClient) {
 
   }

// to store in local storage
 
  // to get values from localstorage



  getTransaction(acno:any){
    const data ={
      acno
  

    }
    //asynchronous
    return this.http.post('http://localhost:3000/getTransaction/'+acno,data,this.getOptions())

  }


  register(acno: any, password: any, uname: any) {

    const data ={
      acno,
      password,
      uname
    }

   //Asynchronous
    return this.http.post('http://localhost:3000/register',data)
  }


  
  login(acno: any, password: any) {
    const data = {
      acno,
      password

    }
    //Asynchronous

return this.http.post('http://localhost:3000/login',data)


  }



  deposit(acno: any, password: any, amt: any) {
    const data={
      acno,
      password,
      amt
    }
    //asynchronous
    return this.http.post('http://localhost:3000/deposit',data,this.getOptions())

  }



  
  withdraw(acno: any, password: any, amt: any) {
    const data={
      acno,password,amt
    }
    //asynchronous
    return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())

  }
  
  //To add token into the request header
  getOptions(){
    const token = JSON.parse(localStorage.getItem("token")|| "")
    console.log(token)
    let headers =new HttpHeaders()
    if(token){
      headers = headers.append('x-access-token',token)
      options.headers =headers
    }
    return options
  }  

delete(acno:any){
 //Asynchronous
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
}

 }  
