import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ModalAddEditComponent } from './Modals/modal-add-edit/modal-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';
import { DirectorsComponent } from './directors/directors.component';
import { MoviesComponent } from './movies/movies.component';
import { DirectorFormComponent } from './directors/director-form/director-form.component';
import { InputSwitchModule } from 'primeng/inputswitch';

const routes : Routes = [
  { path: '', component: MoviesComponent },
  { path: 'directors', component: DirectorsComponent  },
  { path: 'director/create', component: DirectorFormComponent },
  { path: 'director/edit/:id', component: DirectorFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ModalAddEditComponent,
    DirectorsComponent,
    MoviesComponent,
    DirectorFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ConfirmDialogModule,
    HttpClientModule,
    AppRoutingModule,
    InputSwitchModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
