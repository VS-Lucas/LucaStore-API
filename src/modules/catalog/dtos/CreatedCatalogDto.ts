import { ApiProperty } from "@nestjs/swagger";

export class CreatedCatalogDto {
    @ApiProperty()
    id: number
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    category: string;
}
