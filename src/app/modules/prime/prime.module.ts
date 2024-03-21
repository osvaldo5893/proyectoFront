import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';

import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { ChartModule } from 'primeng/chart';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { NgxMaskDirective ,NgxMaskPipe, provideNgxMask} from 'ngx-mask';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  exports: [
    TagModule,
    BadgeModule,
    SidebarModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    ToastModule,
    DialogModule,
    OverlayPanelModule,
    TableModule,
    ConfirmDialogModule,
    SidebarModule,
    ConfirmPopupModule,
    TooltipModule,
    AutoCompleteModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    ProgressBarModule,
    PanelModule,
    ButtonModule,
    SplitButtonModule,
    ToggleButtonModule,
    ProgressSpinnerModule,
    TimelineModule,
    CardModule,
    FileUploadModule,
    ToolbarModule,
    TabViewModule,
    AccordionModule,
    DividerModule,
    CommonModule,
    MessagesModule,
    MessageModule,
    ChartModule,
    CarouselModule,
    MenubarModule
  ],
  providers: [MessageService,provideNgxMask()],

})
export class PrimeModule { }
