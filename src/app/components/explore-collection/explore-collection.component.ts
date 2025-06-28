import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-explore-collection',
  templateUrl: './explore-collection.component.html',
  styleUrls: ['./explore-collection.component.css'],
  standalone: false,
})
export class ExploreCollectionComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  error = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load categories.';
        this.loading = false;
      },
    });
  }
}
