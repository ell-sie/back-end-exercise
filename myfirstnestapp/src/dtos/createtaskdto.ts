import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Making the backend of my website',
    description: 'the title of the category'
  })
  title: string;

  @ApiProperty({
    example: 'Test for category description swagger',
    description: 'the title of the category'
  })
  description: string;

  @ApiProperty({
    example: '89bc9512-5d34-4b72-a106-ae4ac2d41be7',
    description: 'task id'
  })
  categoryId: string;
}
