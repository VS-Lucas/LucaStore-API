import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateStockDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    quantity: number;
}
