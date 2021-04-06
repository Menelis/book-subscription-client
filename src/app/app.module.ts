import { BookModule } from './book/book.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountModule } from './account/account.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomeModule,
    AccountModule,
    BookModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:() => {
          return localStorage.getItem('token')
        },
        allowedDomains:["localhost:5000"],
        disallowedRoutes:[]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
