import { Component, HostListener, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CorsService } from '@services';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if(this.formRegistrar.valid){
      if (event.key === 'Enter') {
        this.onRegister();
      }

    }
  }

  formRegistrar: UntypedFormGroup;
  roles:string[]=[
    'Admin'
  ]
  msgs: Message[] = [];


  constructor(
    private cors: CorsService,
    private formBuilder: UntypedFormBuilder,
    private messageService: MessageService,
    private router:Router

  ){
    this.formRegistrar = this.formBuilder.group({
      nombre: [null, Validators.required],
      apellidoP: [null,Validators.required],
      apellidoM: [null,Validators.required],
      email: [null,Validators.required],
      password: [null,Validators.required],
      role: [null,Validators.required],
    });

  }

  ngOnInit(): void {

  }

  onRegister(){
    if (this.formRegistrar.valid) {
      this.cors
        .post('User/GuardarUser', this.formRegistrar.value)
        .then((response) => {
          console.log(response)
          // this.toClearControls.forEach((element) => {
          //   this.formRegistrar.controls[element].setValue(null)
          // })
          this.formRegistrar.markAsUntouched()
          this.formRegistrar.reset()
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Datos guardados',
            detail: 'Registro Guardado con exito!!',
          });
          
          setTimeout(() => {
            this.router.navigate([''])
            
          }, 1000);
        })
        .catch((error) => {
          console.log(error)
          this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: 'Hubo un error',
            detail: 'No se guardo el Registro,Intenta nuevamente!!',
          });
        });


    }

  }









}
