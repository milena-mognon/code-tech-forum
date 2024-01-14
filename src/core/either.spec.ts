import { Either, left, right } from './either';

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10);
  } else {
    return left('error');
  }
}

test('success result', () => {
  const result = doSomething(true);

  if (result.isRight()) {
    console.log(result.value);
  }

  expect(result.value).toBe(10);
  expect(result.isRight()).toBe(true);
});

test('error result', () => {
  const result = doSomething(false);

  expect(result.value).toBe('error');
  expect(result.isLeft()).toBe(true);
});
