import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import {ChatService} from './chat.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ChatService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

