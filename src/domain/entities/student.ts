import { randomUUID } from "crypto";

export class Student {
  id: string;
  name: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
