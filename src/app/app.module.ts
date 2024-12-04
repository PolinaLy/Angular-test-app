// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
// import { HttpClientModule } from '@angular/common/http'; // <--- Import here
// import { AppComponent } from './app.component';
// import { UsersComponent } from './features/users/users.component';
// import { UserDetailComponent } from './features/users/user-detail/user-detail.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     UsersComponent,
//     UserDetailComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule // <-- Include in imports
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
// import { AppComponent } from './app.component';
// import { UsersComponent } from './features/users/users.component';
// import { UserDetailComponent } from './features/users/user-detail/user-detail.component';
// import { FormsModule } from '@angular/forms';


// @NgModule({
//   declarations: [AppComponent, UsersComponent, UserDetailComponent],
//   imports: [BrowserModule, HttpClientModule, FormsModule],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
//--------------------------------------------------------------

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
// import { AppComponent } from './app.component';
// import { UsersModule } from './features/users/users.module';
// import { AppRoutingModule } from './app.routes';

// @NgModule({
//   declarations: [AppComponent],
//   imports: [BrowserModule, HttpClientModule, UsersModule, AppRoutingModule],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsersModule } from './features/users/users.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule to imports
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
