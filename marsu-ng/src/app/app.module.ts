
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotebookComponent } from './notebook/notebook.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ErrorComponent } from './error/error.component';
import { FriendComponent } from './friend/friend.component';
import { AddCookieInterceptor } from './http-interceptors/add-cookie.interceptor';
import { HeaderComponent } from './header/header.component';
import { EditComponent } from './edit/edit.component'
import { DateToAgePipe } from './dateToAge.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NotebookComponent,
    SignInComponent,
    ErrorComponent,
    FriendComponent,
    HeaderComponent,
    EditComponent,
    DateToAgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddCookieInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
