

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { FusionChartsModule } from 'angular-fusioncharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgToastModule } from 'ng-angular-popup';
import { NgPopupsModule } from 'ng-popups';
import { MatRadioModule } from '@angular/material/radio';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserComponent } from './user/user.component';
import { UserNavBarComponent } from './user/user-nav-bar/user-nav-bar.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { MatConfirmDialogComponent } from './user/mat-confirm-dialog/mat-confirm-dialog.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { LoginUserComponent } from './Authentification/login-user/login-user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { GroupComponent } from './group/group.component';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { EditGroupComponent } from './group/edit-group/edit-group.component';
import { ListGroupComponent } from './group/list-group/list-group.component';
import { MatConfirmDialogGroupComponent } from './group/mat-confirm-dialog-group/mat-confirm-dialog-group.component';
import { GroupNavBarComponent } from './group/group-nav-bar/group-nav-bar.component';
import { CategoryComponent } from './category/category.component';
import { NavBarCategoryComponent } from './category/nav-bar-category/nav-bar-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { EditCatgoryComponent } from './category/edit-catgory/edit-catgory.component';
import { AddCatgoryComponent } from './category/add-catgory/add-catgory.component';
import { ImageComponent } from './image/image.component';
import { ListImageComponent } from './image/list-image/list-image.component';
import { AddImageComponent } from './image/add-image/add-image.component';
import { NavBarImageComponent } from './image/nav-bar-image/nav-bar-image.component';
import { ProductComponent } from './product/product.component';
import { NavBarProductComponent } from './product/nav-bar-product/nav-bar-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { GroupService } from './shared/services/group.service';
import { UserService } from './shared/services/user.service';
import { DatePipe } from '@angular/common';
import { DialogService } from './shared/services/dialog.service';
import { InterceptorService, TokenInterceptorProvider } from './shared/services/interceptor.service';
import { AuthentificationServiceService } from './shared/services/authentification-service.service';
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatRippleModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
    NgToastModule,
    NgPopupsModule,
    MatRadioModule,
    NgxSpinnerModule,
    GalleryModule.withConfig({
      // thumbView: 'contain',
    }),
    LightboxModule,
    FusionChartsModule,
    NgChartsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserComponent,
    UserNavBarComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    MatConfirmDialogComponent,
    RegisterUserComponent,
    LoginUserComponent,
    UserProfileComponent,
    GroupComponent,
    AddGroupComponent,
    EditGroupComponent,
    ListGroupComponent,
    MatConfirmDialogGroupComponent,
    GroupNavBarComponent,
    CategoryComponent,
    NavBarCategoryComponent,
    ListCategoryComponent,
    EditCatgoryComponent,
    AddCatgoryComponent,
    ImageComponent,
    ListImageComponent,
    AddImageComponent,
    NavBarImageComponent,
    ProductComponent,
    NavBarProductComponent,
    AddProductComponent,
    EditProductComponent,
    ListProductComponent,
     ],
  providers: [ AuthenticationService, GroupService,UserService,DatePipe,DialogService,InterceptorService,AuthentificationServiceService,TokenInterceptorProvider],
  bootstrap: [AppComponent],
  entryComponents:[MatConfirmDialogComponent]
})
export class AppModule {}
