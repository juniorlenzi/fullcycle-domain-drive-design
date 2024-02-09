import Product from "../../../domain/product/entity/product"
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface"
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto"

export default class UpdateProductUseCase {
    private prodRepository: ProductRepositoryInterface
    
    constructor(prodRepository: ProductRepositoryInterface) {
        this.prodRepository = prodRepository
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = new Product(input.id, input.name, input.price)

        await this.prodRepository.update(product as Product)
        
        return {
            id: product.id,
            name: product.name,
            price: product.price          
        }
    }
}