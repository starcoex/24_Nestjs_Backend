import { CreateProductInput } from '../dto/create-product.dto';
import { OneProductInput } from '../dto/one-product.dto';
import { UpdateProductInput } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { CreateProductSalesLocationInput } from '../../productsSalesLocations/dto/create-productSalesLocation.dto';

export interface IProductServiceCreate {
  createProductInput: CreateProductInput;
  // createProductSalesLocationInput: CreateProductSalesLocationInput;
}

// export interface IProductServiceFindOne {
//   oneProductInput: OneProductInput;
// }
export interface IProductServiceFindOne {
  productId: string;
}

export interface IProductServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

export interface IProductServiceCheckSoldOut {
  product: Product;
}
export interface IProductServiceDelete {
  productId: string;
}
