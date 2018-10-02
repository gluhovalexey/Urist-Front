import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UristService, WEB_PATH } from "../urist.service";
import { Category } from './category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private uristService: UristService,
    private location: Location,
    @Inject(WEB_PATH) private webPath: string
  ) {}

  ngOnInit() {
    this.renderCategoriesList();
  }

  renderCategoriesList() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.uristService.getCategory(slug).subscribe(
      category =>{
          this.category = category;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
