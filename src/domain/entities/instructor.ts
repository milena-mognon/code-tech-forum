import { randomUUID } from "crypto";

export class Instructor {
  id: string;
  name: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
