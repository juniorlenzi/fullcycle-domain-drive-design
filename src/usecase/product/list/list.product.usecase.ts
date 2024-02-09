import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { OutputListProductDto } from "./list.product.dto";


export default class ListProductUseCase {

    private prodRepository: ProductRepositoryInterface

    constructor(prodRepository: ProductRepositoryInterface) {
        this.prodRepository = prodRepository;
    }

    async execute(): Promise<OutputListProductDto> {
        const prods = await this.prodRepository.findAll()

        return OutputMapper.toOutPut(prods)
    }
}

class OutputMapper {
    static toOutPut(prod: Product[]){
        return {
            products: prod.map(c => {
                return {
                    id: c.id,
                    name: c.name,
                    price: c.price
                }
            })
        }
    }
}