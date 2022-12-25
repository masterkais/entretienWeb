import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "app/shared/models/category.model";
import { CategoryService } from "app/shared/services/category.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'edit-catgory',
  templateUrl: './edit-catgory.component.html',
  styleUrls: ['./edit-catgory.component.css']
})
export class EditCatgoryComponent implements OnInit {
  categoryFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  category: Category;
  state;
  idCategory:number;
  idBrand:number;
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toast: NgToastService,
    private router: Router,
  ) {
    this.idCategory=this.activatedRoot.snapshot.params.id;
  }

  ngOnInit(): void {
    this.categoryService.getCategoryById(this.idCategory).subscribe((data)=>{
      this.category=data;
    })
    this.categoryFormGroup = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
  
  onUpdateCategory() {
    this.submitted = true;
    let data: Category = {
      id: this.idCategory,
      name: this.categoryFormGroup.value.name,
      description: this.categoryFormGroup.value.description,
    };
    this.categoryService.editCategory(data).subscribe(
      () => {
        this.toast.success({ detail: "Modification avec succée !", duration: 5000 });
        this.router.navigateByUrl("/category");
      },
      (error) =>
        this.toast.error({ detail: "Error ! " + error.message, duration: 5000 })
    );
  }
}
