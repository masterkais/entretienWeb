import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Hotel } from '../../../shared/models/hotel.model';
import { Category } from '../../../shared/models/category.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from '../../../shared/services/category.service';
import { NgToastService } from 'ng-angular-popup';
import { ImageService } from '../../../shared/services/image.service';
import { HotelService } from '../../../shared/services/hotel.service';
import { FileUploadService } from '../../../shared/services/upload.service';
import { HttpClient } from '@angular/common/http';
import { MatRadioChange } from '@angular/material/radio';
import { Image } from '../../../shared/models/image.model';
import { Room } from '../../../shared/models/room.model';
import { RoomService } from '../../../shared/services/room.service';


@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

 
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  id: any;
  roomFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  room: Room;
  state;
  promotion;
  listImages:any[]=[];
  imagesSelected: any[] = [];
  imagesIds: number[];
  listCategory: Category[];
  category: Category;
  hotel: Hotel;
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toast: NgToastService,
    private router: Router,
    private imageService: ImageService,
    private hoteService: HotelService,
    private uploadService: FileUploadService,
    private httpClient:HttpClient,
    private roomService:RoomService,
  ) {}

  ngOnInit(): void {
let id=this.activatedRoot.snapshot.params["id"];
    this.hoteService.getHotelById(id).subscribe((data) => {
      this.hotel=data;
    });
    JSON.stringify(this.hotel);
    this.roomFormGroup = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.required]),
      ],
      description: [
        "",
        Validators.compose([Validators.required]),
      ],
      hirePrice: [
        "",
        Validators.compose([Validators.required]),
      ],
    });
  }
  
  public onFileChanged(event) {
        //Select File
        this.selectedFile = event.target.files[0];
      }
      
      onSaveRoom() {
        this.submitted = true;
        let data: Room = {
          id: null,
          name: this.roomFormGroup.value.name,
          description: this.roomFormGroup.value.description,
          hirePrice:this.roomFormGroup.value.hirePrice,
          state: this.state,
          active: this.promotion,
          hotel: {id:this.hotel.id},
        };
        this.roomService.saveRoom(data).subscribe(
          () => {
            this.toast.success({ detail: "Ajout avec succée !", duration: 5000 });
            this.router.navigateByUrl("/hotel");
          },
          (error) =>
            this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
        );
      }

      radioChange(event: MatRadioChange) {
        this.state = event.value;
      }
      radioChangePromotion(event: MatRadioChange) {
        this.promotion = event.value;
      }   

      urls = new Array<string>();
      detectFiles(event) {
        this.urls = [];
        let files = event.target.files;
       
        if (files) {
          for (let file of files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls.push(e.target.result);
              console.log("**********"+e.target.result)
            
              let image:Image={
                id:null,data:e.target.result
              }
              this.imageService.saveImage(image).subscribe((data)=>{
                this.imagesSelected.push(data.id);
              })
            }
            reader.readAsDataURL(file);
          }
        }
      }
  getCategoryVal(row: Category) {
    this.category = row;
    console.log(JSON.stringify(this.category))
  }

}