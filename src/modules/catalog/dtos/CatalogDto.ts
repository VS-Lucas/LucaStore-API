import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "src/modules/product/dtos/productDto";

export class CatalogDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    category: string

    @ApiProperty()
    products: ProductDto[]

}