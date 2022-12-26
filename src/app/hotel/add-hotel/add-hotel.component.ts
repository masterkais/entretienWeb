import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Hotel } from '../../shared/models/hotel.model';
import { Category } from '../../shared/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { NgToastService } from 'ng-angular-popup';
import { ImageService } from '../../shared/services/image.service';
import { HotelService } from '../../shared/services/hotel.service';
import { FileUploadService } from '../../shared/services/upload.service';
import { HttpClient } from '@angular/common/http';
import { MatRadioChange } from '@angular/material/radio';
import { Image } from '../../shared/models/image.model';

@Component({
  selector: 'add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  id: any;
  hotelFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  hoel: Hotel;
  state;
  promotion;
  listImages:any[]=[];
  imagesSelected: any[] = [];
  imagesIds: number[];
  listCategory: Category[];
  category: Category;
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
  ) {}

  ngOnInit(): void {

    this.categoryService.getAllCategory().subscribe((data) => {
      this.listCategory = data;
    });
    this.hotelFormGroup = this.formBuilder.group({
      name_hotel: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      city_hotel: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
   
    });
  }
  
  public onFileChanged(event) {
        //Select File
        this.selectedFile = event.target.files[0];
      }
      
      onSaveHotel() {
        this.submitted = true;
        this.imagesSelected.forEach((val)=>{
          this.listImages.push({id:val})
        })
        let data: Hotel = {
          id: null,
          name_hotel: this.hotelFormGroup.value.name_hotel,
          city_hotel: this.hotelFormGroup.value.city_hotel,
          state: this.state,
          active: this.promotion,
          category: {id:this.category.id},
          images:this.listImages,
          roomList:[{}]
        };
        this.hoteService.saveHotel(data).subscribe(
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
