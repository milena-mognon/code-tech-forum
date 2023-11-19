import { Slug } from "./slug";

test("it should be able to create a new slug from text", () => {
  const slug = Slug.createFromText("Example question title - Programação");

  expect(slug.value).toEqual("example-question-title-programacao");
});
