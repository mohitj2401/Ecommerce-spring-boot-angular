import { ProductCategoryService } from './../../services/product-category.service';
import { Category } from './../../model/category';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent {
  categories!: Category[];



  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {

    this.listCategoires();

  }
  listCategoires() {
    this.productCategoryService.getCategoryList().subscribe((data) => {
      this.categories = data;
    });
  }
}
