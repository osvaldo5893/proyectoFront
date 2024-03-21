import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent1 } from './notfound.component';
import { SharedModule } from 'primeng/api';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: NotfoundComponent1 }
    ]),SharedModule],
    exports: [RouterModule]
})
export class NotfoundRoutingModule { }