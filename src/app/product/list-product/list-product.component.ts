import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Category } from "app/shared/models/category.model";
import { Product } from "app/shared/models/product.model";
import { CategoryService } from "app/shared/services/category.service";
import { DialogService } from "app/shared/services/dialog.service";
import { GroupService } from "app/shared/services/group.service";
import { ImageService } from "app/shared/services/image.service";
import { ProductService } from "app/shared/services/product.service";
import { NgToastService } from "ng-angular-popup";
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
} from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";

@Component({
  selector: "list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.css"],
})
export class ListProductComponent implements OnInit {
  data: any[] = [];
  items: GalleryItem[];
  displayedColumns: string[] = [
    "name",
    "description",
    "sellingPrice",
    "buyingPrice",
    "state",
    "active",
    "categoryId",
    "action",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Product>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listProducts: Product[];
  listCategory: Category[];
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private groupService: GroupService,
    private toast: NgToastService,
    private categoryService: CategoryService,
    private productService: ProductService,
    public gallery: Gallery,
    public lightbox: Lightbox
  ) {}
  ngOnInit(): void {
    this.getAllCategorys();
    this.getAllProducts();
  }
  getAllCategorys() {
    this.categoryService
      .getAllCategory()
      .subscribe((data) => (this.listCategory = data));
  }
  getAllProducts() {
    this.productService.getAllProduct().subscribe((products) => {
      this.listProducts = products;
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(JSON.stringify(products));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(product: Product) {
    this.router.navigateByUrl("/product/edit-product/" + product.id);
  }
  onDelete(product: Product) {
    this.dialogService
      .openConfirmDialog("Vous etes sur ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.productService.deleteProductById(product.id).subscribe(() => {
            this.getAllProducts();
            this.toast.success({
              detail: "Suppression product avec succée !",
              duration: 5000,
            });
          });
        }
      });
  }
  
 
  onPromo(product: Product) {
    product.state = true;
    this.productService.editProduct(product).subscribe((res) => {
      this.toast.success({
        detail: "Le produit  est en promotion !",
        duration: 5000,
      });
      this.getAllProducts();
    });
  }

  onNotPromo(product: Product) {
    product.state = false;
    this.productService.editProduct(product).subscribe((res) => {
      this.toast.success({
        detail: "Le produit sort du promotion !",
        duration: 5000,
      });
      this.getAllProducts();
    });
  }
  onDispo(product: Product) {
    product.active = true;
    this.productService.editProduct(product).subscribe((res) => {
      this.toast.success({
        detail: "Le produit est disponible ! !",
        duration: 5000,
      });
      this.getAllProducts();
    });
  }
  onNotDispo(product: Product) {
    product.active = false;
    this.productService.editProduct(product).subscribe((res) => {
      this.toast.success({
        detail: "Le produit n'est pas disponible ! !",
        duration: 5000,
      });
      this.getAllProducts();
    });
  }
  applyFilterCategory(category: Category) {
    this.productService
      .getAllProductByCategory(category.id)
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  getAllProductDiponible() {
    this.productService.getAllProductByActive(true).subscribe((products) => {
      this.listProducts = products;
      products.forEach((data) => {
        this.categoryService
          .getCategoryById(data.category.id)
          .subscribe((category) => {
            data.category = category;
          });
      });
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllProductNonDisponible() {
    this.productService.getAllProductByActive(false).subscribe((products) => {
      this.listProducts = products;
      products.forEach((data) => {
        this.categoryService
          .getCategoryById(data.category)
          .subscribe((category) => {
            data.category = category;
          });
      });
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllProductPromotion() {
    this.productService.getAllProductByState(true).subscribe((products) => {
      this.listProducts = products;
      products.forEach((data) => {
        this.categoryService
          .getCategoryById(data.category)
          .subscribe((category) => {
            data.category = category;
          });
      });
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAllProductNonPromotion() {
    this.productService.getAllProductByState(false).subscribe((products) => {
      this.listProducts = products;
      products.forEach((data) => {
        this.categoryService
          .getCategoryById(data.category)
          .subscribe((category) => {
            data.category = category;
          });
      });
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
