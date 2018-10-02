import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  RouterModule,
  Routes
}  from "@angular/router";
import { 
   routes as childRoutes,
  AdminModule 
} from './admin/admin.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { MainComponent } from './main/main.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { uristInjectables } from "./urist.injectables";
import { AdminComponent } from './admin/admin.component';
import { AUTH_PROVIDERS } from './auth.service';
import { LoggedInGuard } from './logged-in.guard';

// import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'category/:slug', component: CategoryComponent },
  { path: 'document/list', component: DocumentListComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'admin', component: AdminComponent, canActivate: [ LoggedInGuard ]},
  { path: 'admin', 
    component: AdminComponent,
    canActivate: [ LoggedInGuard ],
    children: childRoutes
  },
];
@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryComponent,
    MainComponent,
    DocumentListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AdminModule
  ],
  // exports: [RouterModule],
  providers: [
    uristInjectables,
    AuthService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
