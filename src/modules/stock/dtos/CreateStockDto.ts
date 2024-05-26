import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateStockDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    productId: number;

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    @ApiProperty()
    quantity: number;
}
