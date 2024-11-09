import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ versionKey: false, autoCreate: true, autoIndex: true, collection: 'student' })
export class Student {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  classCodeList: string[];
}

export type StudentDocument = HydratedDocument<Student>;
export const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.index({ id: 1});
