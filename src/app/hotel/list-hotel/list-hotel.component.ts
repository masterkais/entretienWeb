import { Component, OnInit, ViewChild } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../shared/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Category } from 'app/shared/models/category.model';
import { ImageService } from '../../shared/services/image.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DialogService } from '../../shared/services/dialog.service';
import { GroupService } from '../../shared/services/group.service';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { Lightbox } from 'ng-gallery/lightbox';
import { Hotel } from '../../shared/models/hotel.model';
import { HotelService } from '../../shared/services/hotel.service';

@Component({
  selector: 'list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.css']
})
export class ListHotelComponent implements OnInit {
  data: any[] = [];
  items: GalleryItem[];
  displayedColumns: string[] = [
    "name_hotel",
    "city_hotel",
    "state",
    "active",
    "categoryId",
    "action",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Hotel>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listHotels: Hotel[];
  listCategory: Category[];
  constructor(
    private imageService:ImageService,
    private router: Router,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private groupService: GroupService,
    private toast: NgToastService,
    private categoryService: CategoryService,
    private hotelService: HotelService,
    public gallery: Gallery,
    public lightbox: Lightbox
  ) {}
  ngOnInit(): void {
    this.getAllCategorys();
    this.getAllHotels();
  }
  getAllCategorys() {
    this.categoryService
      .getAllCategory()
      .subscribe((data) => (this.listCategory = data));
  }
  getAllHotels() {
    this.hotelService.getAllHotel().subscribe((hotels) => {
      this.listHotels = hotels;
      this.dataSource = new MatTableDataSource(hotels);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(JSON.stringify(hotels));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(hotel: Hotel) {
    this.router.navigateByUrl("/hotel/edit-hotel/" + hotel.id);
  }
  onDelete(hotel: Hotel) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.hotelService.deleteHotelById(hotel.id).subscribe(() => {
            this.getAllHotels()
            this.toast.success({
              detail: "Suppression product avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
  
 
  onPromo(hotel: Hotel) {
    hotel.state = true;
    this.hotelService.editHotel(hotel).subscribe((res) => {
      this.toast.success({
        detail: "L'hotel  est en promotion !",
        duration: 5000,
      });
      this.getAllHotels();
    });
  }

  onNotPromo(hotel: Hotel) {
    hotel.state = false;
    this.hotelService.editHotel(hotel).subscribe((res) => {
      this.toast.success({
        detail: "L'hotel sort du promotion !",
        duration: 5000,
      });
      this.getAllHotels();
    });
  }
  onDispo(hotel:Hotel) {
    hotel.active = true;
    this.hotelService.editHotel(hotel).subscribe((res) => {
      this.toast.success({
        detail: "L'hotel est disponible ! !",
        duration: 5000,
      });
      this.getAllHotels();
    });
  }
  onNotDispo(hotel: Hotel) {
    hotel.active = false;
    this.hotelService.editHotel(hotel).subscribe((res) => {
      this.toast.success({
        detail: "L'hotel n'est pas disponible ! !",
        duration: 5000,
      });
      this.getAllHotels();
    });
  }
  applyFilterCategory(category: Category) {
    this.hotelService
      .getAllHotelByCategory(category.id)
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  getAllHotelDiponible() {
    this.hotelService.getAllHotelByActive(true).subscribe((hotels) => {
      this.listHotels = hotels;
      hotels.forEach((data) => {
        this.categoryService
          .getCategoryById(data.category.id)
          .subscribe((category) => {
            data.category = category;
          });
      });
      this.dataSource = new MatTableDataSource(hotels);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllHotelNonDisponible() {
    this.hotelService.getAllHotelByActive(false).subscribe((hotels) => {
      this.listHotels = hotels;
      hotels.forEach((data) => {
        this.categoryService
          .getCategoryById(data.category)
          .subscribe((category) => {
            data.category = category;
          });
      });
      this.dataSource = new MatTableDataSource(hotels);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllHotelPromotion() {
    this.hotelService.getAllHotelByActive(true).subscribe((hotels) => {
      this.listHotels = hotels;
      hotels.forEach((data) => {
        this.categoryService
          .getCategoryById(data.category)
          .subscribe((category) => {
            data.category = category;
          });
      });
      this.dataSource = new MatTableDataSource(hotels);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllHotelNonPromotion() {
    this.hotelService.getAllHotelByActive(false).subscribe((hotels) => {
      this.listHotels = hotels;
      hotels.forEach((data) => {
        this.categoryService
          .getCategoryById(data.category)
          .subscribe((category) => {
            data.category = category;
          });
      });
      this.dataSource = new MatTableDataSource(hotels);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  async onShowImage(product: Product) {
    await this.recupererImgs(product);
    this.loadImages();
  }
  async recupererImgs(product: Product) {
    this.data=[];
    product.images.forEach((img)=>{
      this.imageService.getImageById(img.id).subscribe((img) => {
        let itm = { srcUrl: img.data };
        this.data.push(itm);
      });
    })}
    loadImages() {
      setTimeout((
      )=>{
      this.items = this.data.map(
        (item) => new ImageItem({ src: item.srcUrl, thumb: item.srcUrl })
        
      );
      const lightboxRef = this.gallery.ref("lightbox");
      lightboxRef.setConfig({
        imageSize: ImageSize.Cover,
        thumbPosition: ThumbnailsPosition.Top,
      });
      lightboxRef.load(this.items);
      
      this.lightbox.open(0)
  
      },1000)
        }
        addRoom(hotel:any){
          this.router.navigateByUrl("/hotel/room/add-room/"+hotel.id);
        }
        listRoom(hotel: any){
          this.router.navigateByUrl("/hotel/room/"+hotel.id);
        }
}
