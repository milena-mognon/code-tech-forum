import { randomUUID } from "crypto";

interface AnswerProps {
  content: string;
  authorId: string;
  questionId: string;
}

export class Answer {
  id: string;
  content: string;
  authorId: string;
  questionId: string;

  constructor(props: AnswerProps, id?: string) {
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
    this.id = id ?? randomUUID();
  }
}
