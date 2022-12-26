import { Routes } from "@angular/router";
import { AddCatgoryComponent } from "app/category/add-catgory/add-catgory.component";
import { CategoryComponent } from "app/category/category.component";
import { EditCatgoryComponent } from "app/category/edit-catgory/edit-catgory.component";
import { AddGroupComponent } from "app/group/add-group/add-group.component";
import { EditGroupComponent } from "app/group/edit-group/edit-group.component";
import { GroupComponent } from "app/group/group.component";
import { AddImageComponent } from "app/image/add-image/add-image.component";
import { ImageComponent } from "app/image/image.component";
import { AddProductComponent } from "app/product/add-product/add-product.component";
import { EditProductComponent } from "app/product/edit-product/edit-product.component";
import { ProductComponent } from "app/product/product.component";
import { UserProfileComponent } from "app/user/user-profile/user-profile.component";
import { UserComponent } from "app/user/user.component";
import { EditUserComponent } from '../../user/edit-user/edit-user.component';
import { AddUserComponent } from '../../user/add-user/add-user.component';
import { HotelComponent } from '../../hotel/hotel.component';
import { AddHotelComponent } from '../../hotel/add-hotel/add-hotel.component';
import { RoomComponent } from '../../hotel/room/room.component';
import { AddRoomComponent } from '../../hotel/room/add-room/add-room.component';
import { EditRoomComponent } from '../../hotel/room/edit-room/edit-room.component';


export const AdminLayoutRoutes: Routes = [
  { path: "user", component: UserComponent },
  { path: "user/edit-user/:id", component: EditUserComponent },
  { path: "user/add-user", component: AddUserComponent },
  { path: "user/profile/:id", component: UserProfileComponent },
  { path: "group", component: GroupComponent },
  { path: "group/edit-group/:id", component: EditGroupComponent },
  { path: "group/add-group", component: AddGroupComponent },
  { path: "category", component: CategoryComponent },
  { path: "category/edit-category/:id", component: EditCatgoryComponent },
  { path: "category/add-category", component: AddCatgoryComponent},
  { path: "product", component: ProductComponent },
  { path: "product/edit-product/:id", component: EditProductComponent },
  { path: "product/add-product", component: AddProductComponent},
  { path: "image", component: ImageComponent},
  { path: "image/add-image", component: AddImageComponent},
  { path: "hotel", component: HotelComponent},
  { path: "hotel/add-hotel", component: AddHotelComponent},
  { path: "hotel/edit-hotel/:id", component: AddHotelComponent},
  { path: "hotel/room/:id", component: RoomComponent},
  { path: "hotel/room/add-room/:id", component:AddRoomComponent },
  { path: "hotel/room/edit-room/:id", component:EditRoomComponent },
  {path:"",redirectTo:'user',pathMatch:'full'},
];
