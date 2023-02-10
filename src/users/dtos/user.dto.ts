import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user' })
  @IsString()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string

  @IsNotEmpty()
  readonly role: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
