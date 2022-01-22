import { Injectable } from '@angular/core';

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


  constructor() {
    this.getDetails()
   }

// to store in local storage
  saveDetails(){
    if(this.users){
      localStorage.setItem("userDb",JSON.stringify(this.users))
    }
    if(this.currentUserName){
      localStorage.setItem("cName",JSON.stringify(this.currentUserName))
    }
    if(this.currentAcno){
      localStorage.setItem("cacno",JSON.stringify(this.currentAcno))
    }

  }

  // to get values from localstorage

  getDetails(){
    if(localStorage.getItem("userDb")){
      this.users = JSON.parse(localStorage.getItem("userDb") || '')
    }

    if(localStorage.getItem("cName")){
      this.currentUserName = JSON.parse(localStorage.getItem("cName") || '')
 
    }
    if(localStorage.getItem("cacno")){
      this.currentAcno = JSON.parse(localStorage.getItem("cacno")|| '')
    }
  }


  getTransaction(){
   return this.users[this.currentAcno].transaction

  }

  register(acno: any, password: any, uname: any) {


    let db = this.users
    if (acno in db) {
      return false
    }
    else {
      db[acno] = {
        acno,
        uname,
        password,
        balance:0,
        transaction:[],
      }
      // console.log(db);
      this.saveDetails()

      return true

    }
  }

  login(acno: any, password: any) {
    let database = this.users

    if (acno in database) {
      if (password == database[acno]["password"]) {
        this.currentAcno = acno

      this.currentUserName=database[acno]["uname"]
      this.saveDetails()
        return true
      }
      else {
        alert("incorrect password")
        return false
      }

    }
    else {
      alert("invalid account number")
      return false
    }

  }



  deposit(acno: any, password: any, amt: any) {

    var amount = parseInt(amt)

    let db = this.users

    if (acno in db) {

      if (password == db[acno]["password"]) {
        db[acno]["balance"] = db[acno]["balance"] + amount
        db[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })

        this.saveDetails()

        return db[acno]["balance"]
      }
      else {
        alert("incorrect password")
        return false
      }

    }
    else {
      alert("Account does not exist!!!!!!")
      return false;
    }
  }

  
  withdraw(acno: any, password: any, amt: any) {

    var amount = parseInt(amt)

    let db = this.users

    if (acno in db) {

      if (password == db[acno]["password"]) {
        if(db[acno]["balance"]>amount){
          db[acno]["balance"] = db[acno]["balance"] - amount
          db[acno].transaction.push({
            amount:amount,
            type:"DEBIT"
          })
          this.saveDetails()

          return db[acno]["balance"]
        }
        else{
          alert("insufficient balance")
          return false
        }
       
      }
      else{
        alert("incorrect password")
        return false
      }
    }
    else {
      alert("Account does not exist!!!!!!")
      return false
    }
  }

}
