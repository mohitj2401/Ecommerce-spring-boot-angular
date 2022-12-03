import { Product } from './product';
export class CartItem {
  id!: number;
  productId!: number;
  name!: string;
  unitPrice!: number;
  imageUrl!: string;
  quantity!: number;
  constructor(product: Product) {
    this.productId = product.id;
    this.name = product.name;
    this.unitPrice = product.unitPrice;
    this.imageUrl = product.imageUrl;
    this.quantity = 1;


  }
}
