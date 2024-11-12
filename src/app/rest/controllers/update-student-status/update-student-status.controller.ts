import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { StudentResponseBody } from '../list-students-from-class-by-id/list-students-from-class-by-id.types';
import { UpdateStudentStatusUsecaseFactory } from '../../../../infra/factories/usecases/update-student-status.usecase.factory';
import { UpdateStudentStatusPortResult } from '../../../../domain/ports/update-student-status.port';
import { inputData } from './update-student-status.types';

@Controller()
export class UpdateStudentStatusController {
  constructor(private readonly usecaseFactory: UpdateStudentStatusUsecaseFactory) {}

  @Get('/students/:id/evaluation')
  @HttpCode(HttpStatus.OK)
  @Header('access-control-allow-origin', '*')
  async execute(@Param('id') id: string,@Body() inputData : inputData): Promise<StudentResponseBody> { //Recebe o id do aluno e os dados para avaliacao
    const usecase = this.usecaseFactory.getInstance(); //Cria uma instancia da useCaseFactory

    const student = await usecase.execute({ //Envia os dados para a usecaseFactory responsavel por avaliar o aluno e espera receber um aluno novo(Mesmo aluno porem com novo status)
        studentId: id,
        aulas_lecionadas: inputData.aulas_lecionadas,
        aulas_atendidas: inputData.aulas_atendidas,
        nota_p1: inputData.nota_p1,
        nota_p2: inputData.nota_p2,
     });

    return this.mapToResponseBody(student); //Retorna o aluno
  }

  private mapToResponseBody(student: UpdateStudentStatusPortResult): StudentResponseBody { //Metodo interno para colocar os dados do aluno em um objeto para ser enviado ao banco de dados
    return {
      name: student.name,
      id: student.id,
      status: student.status,
    }
  }
}