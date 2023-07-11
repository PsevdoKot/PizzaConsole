import {Component, OnInit} from '@angular/core';
import { IProduct } from "../../shared/interfaces/product.interface";
import { products } from "../../shared/test-data/products";
import { productsInfo, colorByType } from "../../shared/products-info";


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  protected isDropdownOpen: boolean = false;
  protected isLoaded: boolean = false;

  protected searchText: string = '';
  protected selectedType: string = 'Все типы продуктов';

  protected readonly types: string[] = ['Все типы продуктов', ...Object.keys(colorByType)];
  protected readonly colorByType: { [key: string]: string } = colorByType;
  protected filteredProducts: IProduct[] = [];

  protected selectedProduct: number = -1;

  public ngOnInit(): void {
    products.forEach(product => {
      product.imagePath = productsInfo[product.name]['imagePath'];
      // product.type = productsInfo[product.name]['type'];
    })
    this.filteredProducts = products;
    this.isLoaded = true;
  }

  protected toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  protected toggleType(type: string): void {
    this.selectedType = type;
    this.filterProducts();
  }

  protected filterByName(): void {
    this.filterProducts();
  }

  private filterProducts(): void {
    const filteringById = this.searchText.match("^[0-9]+$");
    this.filteredProducts = products.filter(product =>
      (this.selectedType === 'Все типы продуктов' || product.type === this.selectedType)
      && (!filteringById && (this.searchText === '' || product.name.toLowerCase().includes(this.searchText.toLowerCase()))
        || filteringById && Number(this.searchText) === product.id)
    );
  }

  protected selectProduct(productId: number): void {
    if (this.selectedProduct !== productId) {
      this.selectedProduct = productId;
      // document.getElementById(`volume-${productId}`)?.focus();
    }
  }

  protected submitVolumeChange(): void {
    this.selectedProduct = -1;
  }
}
