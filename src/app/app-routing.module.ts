import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NotfoundComponent1 } from './_shared/layout/notfound/notfound.component';
import { AuthGuard } from './guards/authentication/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    data: { breadcrumb: 'Home' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },

  {
    path: 'productos',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
  {
    path: 'productos',
    data: { breadcrumb: 'Productos' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/productos/productos.module').then(
        (m) => m.ProductosModule
      ),
  },

  {
    path: 'contar',
    redirectTo: '/contar',
    pathMatch: 'full'
  },
  {
    path: 'contar',
    data: { breadcrumb: 'Calcular' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/count/count.module').then(
        (m) => m.CountModule
      ),
  },









 // el final del routing para q se muestre si no existe la ruta
  {
    path: 'notfound',
    redirectTo: '/notfound',
    pathMatch: 'full'
  },
  {
    path: 'notfound',
    component: NotfoundComponent,
  },
  {
    path: '404',
    redirectTo: '/404',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: NotfoundComponent1,
  },
  {
    path: '404',
    component: NotfoundComponent1,
  },
  {
    path: 'a',
    component: NotfoundComponent1,
    canActivate:[LoginGuard]
  },

  { path: '**', redirectTo:'/a' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
