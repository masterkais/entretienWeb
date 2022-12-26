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
import { ImageService } from "app/shared/services/image.service";
import { ProductService } from "app/shared/services/product.service";
import { FileUploadService } from "app/shared/services/upload.service";
import { NgToastService } from "ng-angular-popup";
import { Observable } from "rxjs";
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
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
  idProd:number;
  selectedOption = '1';
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
    private activateRoute:ActivatedRoute,
  ) {
    this.idProd=this.activateRoute.snapshot.params.id;
  }

  async ngOnInit(): Promise<void> {
    await this.productService.getProductByIdV2(this.idProd).then((data)=>{
      this.product=data;
    })
    if(this.product.active===false){
      this.promotion=0
    }
    else{
      this.promotion=1
    }
    
    if(this.product.state===false){
      this.state=0
    }
    else{
      this.state=1
    }
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
 
  radioChange(event: MatRadioChange) {
    this.state = event.value;
    console.log(event.value);
  }
  radioChangePromotion(event: MatRadioChange) {
    this.promotion = event.value;
    console.log(event.value);
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
    console.log("******** cat" + row.id);
  }
 

  onSaveProduct() {
    this.submitted = true;
    let data: Product = {
      id: this.idProd,
      name: this.productFormGroup.value.name,
      description: this.productFormGroup.value.description,
      sellingPrice: this.productFormGroup.value.sellingPrice,
      buyingPrice: this.productFormGroup.value.buyingPrice,
      state: this.state,
      active: this.promotion,
      category: {id:this.category.id},
      images:this.imagesSelected
    };
    console.log("!!!!!!"+this.state);
    console.log("!!!!!!"+this.promotion);
    console.log(JSON.stringify(data));
    this.productService.editProduct(data).subscribe(
      () => {
        this.toast.success({ detail: "Prduit est modifer avec succée !", duration: 5000 });
        this.router.navigateByUrl("/product");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}

