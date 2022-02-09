import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  accno="your account number"

  acno=""

  pswd=""
  
  uname=""

  registerForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9,a-z]*')]]
  })


  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {

  }
  register(){
    console.log(this.registerForm);

   
    if(this.registerForm.valid){
    var acno=this.registerForm.value.acno
    var uname= this.registerForm.value.uname
    var pswd=this.registerForm.value.pswd
    
   //Asynchronous
    this.ds.register(acno,pswd,uname)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        this.router.navigateByUrl("")
      }
    },
    (result)=>{
      alert(result.error.message)
    }
    )
 
   

    }
    else{
      alert("invalid form")
    }
  }

}
