import { TodoService } from './todo.service';

const todos = ['shop groceries', 'mow the lawn', 'take the cat to the vet'];

const okResponse = new Response(JSON.stringify(todos), {
  status: 200,
  statusText: 'OK',
});

describe('TodoService', () => {
  it('tests sth', async () => {
    // given
    const spy = jasmine.createSpy('name');
    spy.and.returnValue(okResponse);
    const sut = new TodoService(spy);

    // when
    const result = await sut.getTodos();

    // then
    expect(result).toEqual(todos);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
