import { Injectable } from '@nestjs/common';
import { UpdateStudentStatusPortFactory } from '../ports/update-studant-status.port.factory';
import { UpdateStudentStatusUsecase } from '../../../domain/usecases/update-student-status/update-student-status.usecase';

@Injectable()
export class UpdateStudentStatusUsecaseFactory {
  constructor(private readonly updateStudentStatusPortFactory: UpdateStudentStatusPortFactory) {} //Criando uma classe injetavel

  getInstance(): UpdateStudentStatusUsecase {
    return new UpdateStudentStatusUsecase(this.updateStudentStatusPortFactory.getInstance()); //funcao para instancear um objeto dessa classe
  }
}