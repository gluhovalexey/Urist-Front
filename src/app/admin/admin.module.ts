import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { AdminComponent } from './admin.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { ADMIN_PROVIDERS } from '../admin.service';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { UTILS_PROVIDERS } from './utilities';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CertificateUploadComponent } from './certificate-upload/certificate-upload.component';
import { CertificateEditComponent } from './certificate-edit/certificate-edit.component';
import { UtilitiesComponent } from './utilities/utilities.component';

export const routes: Routes = [  
  { path: 'document', component: DocumentUploadComponent },
  { path: 'category', component: CategoryCreateComponent },
  { path: 'service', component: ServiceCreateComponent },
  { path: 'certificate', component: CertificateUploadComponent },
  { path: 'user', component: UserCreateComponent },
  { path: 'utils', component: UtilitiesComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    AdminComponent,
    DocumentUploadComponent,
    DocumentEditComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    ServiceCreateComponent,
    ServiceEditComponent,
    UserCreateComponent,
    UserEditComponent,
    CertificateUploadComponent,
    CertificateEditComponent,
    UtilitiesComponent
  ],
  exports: [
    AdminComponent,
    DocumentUploadComponent
  ],
  providers: [
    ADMIN_PROVIDERS,
    UTILS_PROVIDERS
  ],
})
export class AdminModule { }
