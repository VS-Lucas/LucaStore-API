import { ApiProperty } from "@nestjs/swagger";

export class CreatedStockDto {
    @ApiProperty()
    productId: number;
    
    @ApiProperty()
    quantity: number;
}