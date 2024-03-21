import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  model: any[] = [

  ];
  menus: any[] = [
    {
      label: 'Room',
      key: "home",
      icon: 'pi pi-home',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          routerLink: ['/home'],
        }
      ]
    },
    {
      label: 'Productos',
      key: "productos",
      icon: 'pi pi-fw pi-shopping-bag',
      items: [
        {
          label: 'DashBoard',
          icon: 'pi pi-fw pi-external-link',
          routerLink: ['/productos'],
        },
      ]
    },
    {
      label: 'Fecha de Nacimiento',
      key: "contar",
      icon: 'pi pi-fw pi-shopping-bag',
      items: [
        {
          label: 'DashBoard',
          icon: 'pi pi-fw pi-external-link',
          routerLink: ['/contar'],
        },
      ]
    },

  ]
  ngOnInit() {


    let permisos: any = {
      "Admin":['home','productos','contar'],
    }
    this.model = [];


    let usuarioInfo = JSON.parse(localStorage.getItem("userData") || "{}")

    this.menus.forEach((elemento) => {
      // console.log(elemento)
      if (permisos[usuarioInfo?.role].includes(elemento.key)) {
        this.model.push(elemento)
      }
    })

  }
}
