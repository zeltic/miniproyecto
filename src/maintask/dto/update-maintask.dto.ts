import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintaskDto } from './create-maintask.dto';

export class UpdateMaintaskDto extends PartialType(CreateMaintaskDto) {}
