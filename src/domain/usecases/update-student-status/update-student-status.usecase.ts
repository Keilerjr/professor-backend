import { UpdateStudentStatusPort } from "../../../domain/ports/update-student-status.port";
import { IEvaluatedStudentData} from "./update-student-status.types";
import { Student } from "../../../infra/schemas/student.shema";

  
  export class UpdateStudentStatusUsecase {  
    constructor(private readonly updateStudentStatusPort: UpdateStudentStatusPort) {}
  
    async execute({ studentId, aulas_lecionadas, aulas_atendidas, nota_p1, nota_p2 }: IEvaluatedStudentData): Promise<Student> {
        const notaMedia = (nota_p1 + nota_p2) / 2;
        const presencaPorcentagem = (aulas_lecionadas / aulas_atendidas) * 100;

        let newStatus: string = 'NAO_AVALIADO'
        if (notaMedia >= 7 && presencaPorcentagem >= 75){
            newStatus = 'APROVADO';
        } else if (notaMedia <7 || notaMedia >= 5 || presencaPorcentagem < 75){
            newStatus = 'EM_EXAME';
        }else {
            newStatus= 'REPROVADO';
        }
      const updatedStudent = await this.updateStudentStatusPort.execute({studentId, newStatus}); //Define que o updatedStudent vai ser o resultado da execucao
                                                                                                 //do metodo execute da classe updateStudentStatusPort recebendo
      return updatedStudent;                                                                     //o id do aluno e o novo status
    }
  }

    //Cria uma classe chamada UpdateStudentStatusUsecase usando o UpdateStudentStatusPort no contrutor
    //Cria um metodo assincrono que recebe a avaliacao do aluno e promete devolver um objeto do tipo Student