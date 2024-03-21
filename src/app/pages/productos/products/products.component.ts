import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  AsyncValidatorFn ,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CorsService } from '@services';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


const asyncMaxLengthValidator: AsyncValidatorFn = (control: AbstractControl): Observable<any> => {
  const valor = control.value;
  const maxLength = 100;

  if (valor && valor.length > maxLength) {
    return of({ maxLengthExceeded: true }); 
  } else {
    return of(null); 
  }
};

const asyncMaxLengthValidatorComentario: AsyncValidatorFn = (control: AbstractControl): Observable<any> => {
  const valor = control.value;
  const maxLength = 200;

  if (valor && valor.length > maxLength) {
    return of({ maxLengthExceededC: true }); 
  } else {
    return of(null); 
  }
};

const asyncRegexValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  const regexPattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ _\-.,()!"\/[\]+*-{}]*$/; 

  return of(control.value).pipe(
    map(value => {
      if (!value || regexPattern.test(value)) {
        return null; 
      } else {
        return { regexError: true };
      }
    })
  );
};

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  formProducto:FormGroup;
  productos:any;
  display:boolean=false;
  closeModal: boolean = true;
  loading: boolean = false;
  activo:any[]=[
    {
      id: 0,
      nombre: "Inactivo"
    },
    {
      id: 1,
      nombre: "Activo"
    }
  ];
  categorias:any[]=[
    {
      id: 1,
      nombre: "Mujer"
    },
    {
      id: 2,
      nombre: "Hombre"
    },
    {
      id: 3,
      nombre: "Hogar"
    },
    {
      id: 4,
      nombre: "Jardin"
    },
    {
      id: 5,
      nombre: "Cocina"
    }
  ];
  nombre:string="";
  nombrebtn:string="";
  selectedProduct:any;
  dos:any={};
 
  

  constructor(
    private cors: CorsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ){
    this.formProducto = this.formBuilder.group({
      nombreProducto: [null, [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]*$'),Validators.maxLength(50)]],
      comentarios: [null,Validators.required,[asyncRegexValidator,asyncMaxLengthValidatorComentario]],
      descripcion: [null,Validators.required,[asyncMaxLengthValidator,asyncRegexValidator]],
      categoria: [null,Validators.required],
      estatus: [null,Validators.required],
    });


  }

  ngOnInit(): void {
      this.getProductos();
  }

  getProductos(){
    this.cors.get('Productos/getProductos').then((response) => {
          // console.log(response)
          if(response[0]=="SIN INFO"){
            this.productos = [];

          }else{
            this.productos = response;

          }
        }).catch((error) => {
          console.log(error)
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  dateFormat(value:any){
    if(value != null){
      return moment(value).format('DD/MM/yyyy HH:mm:ss')
    }else{
      return ""
    }
  }
  openModal() {
      this.display = true;
  }
  cerrarModal() {
    this.display = false;
    this.formProducto.reset()
    return false
  }

  getNameCategoria(id:any):string{
    let name = this.categorias.filter(categoria => categoria.id === id);

    return name[0]?.nombre ? name[0].nombre:''
  }


  guardarProducto(){
    this.formProducto.markAllAsTouched();
    if(this.formProducto.valid){
      this.cors.post('Productos/GuardarProducto',this.formProducto.value)
      .then((res)=>{
        // console.log(res)
        this.formProducto.reset();
        this.cerrarModal();
        this.getProductos();
      })
      .catch((err)=>{
        console.log(err)
      });
    }
  }

  eliminar(item:any){
    this.cors.delete(`Productos/EliminarProducto?id=${item.idProducto}`,item)
    .then((res)=>{
      // console.log(res)
      this.getProductos();
    })
    .catch((err)=>{
      console.log(err)
    });

  }

  editar(item:any){
    // console.log(item)
    this.selectedProduct=null;
    this.dos=null;
    
    this.nombre="Actualizar Información";
    this.nombrebtn="Editar";
    this.formProducto.patchValue({
      nombreProducto: item.nombreProducto,
      comentarios: item.comentarios,
      descripcion: item.descripcion,
      categoria: item.categoria,
      estatus: item.estatus,
    });
   this.dos = {
    id:item.idProducto,
    createdAt:item.createdAt
   };
    
    this.openModal();
    
    
  }

  update(){
    this.selectedProduct = this.formProducto.value;
    this.selectedProduct.idProducto = this.dos.id
    this.selectedProduct.CreatedAt = this.dos.createdAt


    this.cors.post(`Productos/ActualizaProducto?id=${this.selectedProduct.idProducto}`,this.selectedProduct)
    .then((res)=>{
      // console.log(res)
      this.cerrarModal();
      this.formProducto.reset();
      this.getProductos();
    })
    .catch((err)=>{
      console.log(err)
    });

  }

  seleccionar(){
    if(this.nombrebtn == "Guardar"){
      this.guardarProducto();
    }else if(this.nombrebtn == "Editar"){
      this.update();

    }
  }





}
