import { Component, OnInit, ViewChild } from '@angular/core';
import { GalleryItem, Gallery } from 'ng-gallery';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../../shared/models/room.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Category } from '../../shared/models/category.model';
import { ImageService } from '../../shared/services/image.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DialogService } from '../../shared/services/dialog.service';
import { GroupService } from '../../shared/services/group.service';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from '../../shared/services/category.service';
import { HotelService } from '../../shared/services/hotel.service';
import { Lightbox } from 'ng-gallery/lightbox';
import { RoomService } from '../../shared/services/room.service';
import { Hotel } from '../../shared/models/hotel.model';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  data: any[] = [];
  items: GalleryItem[];
  displayedColumns: string[] = [
    "name",
    "description",
    "hirePrice",
    "state",
    "active",
    "action",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Room>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listRooms: Room[];
  listCategory: Category[];
  hotel: Hotel;
  id: any;
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
    public lightbox: Lightbox,
    private roomService:RoomService,
    private activatedRoot:ActivatedRoute,
  ) {}
  async ngOnInit(): Promise<void> {
   
   
    await this.getAllRoomsByHotel();

  }


  async getAllRoomsByHotel() {
    let id=this.activatedRoot.snapshot.params["id"];
    await this.roomService.getAllRoomsByHotel(id).subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
     this.listRooms=this.hotel.roomList;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(room: Room) {
    this.router.navigateByUrl("/hotel/room/edit-room/" + room.id);
  }
  onDelete(room: Room) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.roomService.deleteRoomById(room.id).subscribe(() => {
            this.getAllRoomsByHotel();
            this.toast.success({
              detail: "Suppression room avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
  
 
  onPromo(room: Room) {
    room.state = true;
    this.roomService.editRoom(room).subscribe((res) => {
      this.toast.success({
        detail: "L'hotel  est en promotion !",
        duration: 5000,
      });
      this.getAllRoomsByHotel();
    });
  }

  onNotPromo(room: Room) {
    room.state = false;
    this.roomService.editRoom(room).subscribe((res) => {
      this.toast.success({
        detail: "La chambre sort du promotion !",
        duration: 5000,
      });
      this.getAllRoomsByHotel();
    });
  }
  onDispo(room:Room) {
    room.active = true;
    this.roomService.editRoom(room).subscribe((res) => {
      this.toast.success({
        detail: "L'chambre est disponible ! !",
        duration: 5000,
      });
      this.getAllRoomsByHotel();
    });
  }
  onNotDispo(room: Room) {
    room.active = false;
    this.roomService.editRoom(room).subscribe((res) => {
      this.toast.success({
        detail: "L'chambre n'est pas disponible ! !",
        duration: 5000,
      });
      this.getAllRoomsByHotel();
    });
  }

  getAllRoomDiponibleByHotel() {
    let id=this.activatedRoot.snapshot.params["id"];
    this.roomService.getAllRoomDipoByHotel(id).subscribe((rooms) => {
      this.listRooms = rooms;
       this.dataSource = new MatTableDataSource(rooms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });  
  }
  getAllRoomNonDisponible() {
    let id=this.activatedRoot.snapshot.params["id"];
    this.roomService.getAllRoomNonDipo(id).subscribe((rooms) => {
      this.listRooms = rooms;
       this.dataSource = new MatTableDataSource(rooms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllRoomPromotion() {
    let id=this.activatedRoot.snapshot.params["id"];
    this.roomService.getAllRoomPromo(id).subscribe((rooms) => {
      this.listRooms = rooms;
       this.dataSource = new MatTableDataSource(rooms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllRoomNonPromotion() {
    let id=this.activatedRoot.snapshot.params["id"];
    this.roomService.getAllRoomNonPromo(id).subscribe((rooms) => {
      this.listRooms = rooms;
       this.dataSource = new MatTableDataSource(rooms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
}
