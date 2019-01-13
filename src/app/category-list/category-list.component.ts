import { Component, OnInit } from '@angular/core';
import { UristService } from '../urist.service';
import { CategoryList } from '../category-list.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  categories: CategoryList[];

  constructor(private uristService: UristService){}

  ngOnInit() {
    this.renderCategoriesList();
  }
  renderCategoriesList() {
    this.uristService.getCategoryList().subscribe(
      (categories: CategoryList[]) =>{
          this.categories = categories;
      }
    );
  }
}
