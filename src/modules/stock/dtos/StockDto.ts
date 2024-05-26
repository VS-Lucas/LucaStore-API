import { ApiProperty } from "@nestjs/swagger";

export class StockDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    quantity: number;
    
    @ApiProperty()
    productId: number
}