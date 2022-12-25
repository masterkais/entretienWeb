import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "app/shared/models/category.model";
import { Image } from "app/shared/models/image.model";
import { Product } from "app/shared/models/product.model";
import { CategoryService } from "app/shared/services/category.service";
import { ImageService } from "app/shared/services/image.service";
import { ProductService } from "app/shared/services/product.service";
import { FileUploadService } from "app/shared/services/upload.service";
import { json } from "express";
import { NgToastService } from "ng-angular-popup";
import { Observable } from "rxjs";

@Component({
  selector: "add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  id: any;
  productFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  product: Product;
  state;
  promotion;
  listImages: Image[];
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
    private productService: ProductService,
    private uploadService: FileUploadService,
    private httpClient:HttpClient,
  ) {}

  ngOnInit(): void {

    this.categoryService.getAllCategory().subscribe((data) => {
      this.listCategory = data;
    });
    this.productFormGroup = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      sellingPrice: ["", Validators.compose([Validators.required])],
      buyingPrice: ["", Validators.compose([Validators.required])],
    });
  }
  
  public onFileChanged(event) {
        //Select File
        this.selectedFile = event.target.files[0];
      }
      
      onSaveProduct() {
        this.submitted = true;
        let data: Product = {
          id: null,
          name: this.productFormGroup.value.name,
          description: this.productFormGroup.value.description,
          sellingPrice: this.productFormGroup.value.sellingPrice,
          buyingPrice: this.productFormGroup.value.buyingPrice,
          state: this.state,
          active: this.promotion,
          category: {id:this.category.id},
        };
        this.productService.saveProduct(data).subscribe(
          () => {
            this.toast.success({ detail: "Ajout avec succée !", duration: 5000 });
            this.router.navigateByUrl("/product");
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
