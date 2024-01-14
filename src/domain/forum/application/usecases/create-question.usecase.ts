import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions.repository';
import { Either, right } from '@/core/either';

interface CreateQuestionUseCaseInput {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseOutput = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  public async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseInput): Promise<CreateQuestionUseCaseOutput> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
