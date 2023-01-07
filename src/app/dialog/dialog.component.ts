import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  freshnesslist=["Brand New","Used", "refurbished"]

  actionBtn:string='save';

  productform!:FormGroup
  ApiService: any;

  constructor(private formbuilder:FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData:any,

    private api:ApiService, private matdialogref:MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
   
    this.productform=this.formbuilder.group({

    productname:['',Validators. required],

    category:['',Validators.required],
    freshness:['',Validators.required],
    price:['',Validators.required],
    comment:['',Validators.required],
    date:['',Validators.required]

    })
    
    if(this.editData){

      this.actionBtn="update";
      this.productform.controls['productname'].setValue(this.editData.productname);
      this.productform.controls['category'].setValue(this.editData.category);
      this.productform.controls['date'].setValue(this.editData.date);
      this.productform.controls['freshness'].setValue(this.editData.freshness);
      this.productform.controls['price'].setValue(this.editData.price);
      this.productform.controls['comment'].setValue(this.editData.comment);
      

      



    }
  }
   
addProduct(){
      
   if(!this.editData){
   if(this.productform.valid){

   this.api.postProduct(this.productform.value)
     .subscribe({
       next:(res)=>{

         alert('product added successfully');
         this.productform.reset();
         this.matdialogref.close('save');

       },
       error:()=>{
         alert('error while adding the product')
       }
     })
   }
   }else{
     this.updateProduct()
   }
}

updateProduct(){

  this.api.putProduct(this.productform.value,this.editData.id)
   .subscribe({
  next:(res)=>{
    alert('Updated successfully');
    this.productform.reset();
    this.matdialogref.close('updated');
  },
  error:(err)=>{
    alert('error while updating');
  }
   })
}
}
