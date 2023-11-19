import { ValueObject } from '@/core/value-object/value-object';

export class Slug implements ValueObject {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Receives a string and normalize ir as a slug
   *
   * Example: "An Exemple Title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD') // remove todos os caracteres com acentos e transforma em sem acento
      .toLowerCase() // converte para letra minuscula
      .trim() // remove espaços no final
      .replace(/\s+/g, '-') // substitui todos os espaços em branco hífen
      .replace(/[^\w-]+/g, '') // substitui tudo o que não são palavras por string vazia
      .replace(/_/g, '-') // substitui todos os underlines _ por hífen -
      .replace(/--+/g, '-') // substitui dois hífen juntos -- por um só -
      .replace(/-$/g, ''); // remove hífen no final

    return new Slug(slugText);
  }
}
