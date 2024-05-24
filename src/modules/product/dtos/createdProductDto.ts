import { ApiProperty } from "@nestjs/swagger";

export class CreatedProductDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
  
    @ApiProperty()
    price: number;

    @ApiProperty()
    catalog: {
        id: number;
    };
}
