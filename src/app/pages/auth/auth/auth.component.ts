import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { CorsService } from '@services';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  msgs: Message[] = [];
  formLogin: UntypedFormGroup;

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Verifica si la tecla presionada es la tecla Enter
    if (event.key === 'Enter') {
      this.onSignIn(); // Llama a la función onSignIn() al presionar Enter
    }
  }

  constructor(private messageService: MessageService,
    private formBuilder: UntypedFormBuilder, private router: Router,
    private cors: CorsService,
  ){
      this.formLogin = this.formBuilder.group({
          email: [null, Validators.required],
          pass: [null, Validators.required],
      });
  }

  ngOnInit(): void {
  }

  onSignIn() {
      this.formLogin.markAllAsTouched();
      if(this.formLogin.valid){
        this.cors.get('User/login',this.formLogin.value).then((res)=>{
            // console.log(res)
            let user = {
                "role":res.role,
                "firstName":res.nombre,
                "lastName":res.apellidoP + " "+res.apellidoM,
                "email":res.email
            }
            localStorage.setItem( "userData",JSON.stringify(user))   
            this.router.navigate(['/home']);
        }).catch((err)=>{
            console.log(err)
            if(err.error =="Usuario o contraseña Incorrectos."){
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Hubo un error',
                    detail: 'Usuario o contraseña incorrectas',
                  });
        
            }else{
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Hubo un error',
                    detail: 'Intentalo mas tarde.',
                  });

            }
        });

 

  
      }
  }


  

}
