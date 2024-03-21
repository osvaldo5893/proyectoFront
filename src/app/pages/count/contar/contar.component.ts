import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  AsyncValidatorFn ,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { CorsService } from '@services';
import * as moment from 'moment';
@Component({
  selector: 'app-contar',
  templateUrl: './contar.component.html',
  styleUrls: ['./contar.component.scss']
})
export class ContarComponent implements OnInit {

  formDate:FormGroup;

  edad:number=0;

  constructor(
    private cors: CorsService,
    private formBuilder: FormBuilder,

  ){
    this.formDate = this.formBuilder.group({
      date: [null, [Validators.required]],
    });

  }

  ngOnInit(): void {
      
  }
  changeFecha(){
    let date= this.formDate.controls['date'].value
    console.log(date)
    let fecha = moment(date).format('yyyy-MM-DD')
    this.cors.get('Productos/calcularEdad',{
      date:fecha
    })
    .then((res)=>{
      console.log(res)
      this.edad= parseInt(res);
    })
    .catch((err)=>{
      console.log(err)
    });

  }

}
