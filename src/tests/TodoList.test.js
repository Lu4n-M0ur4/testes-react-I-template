import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import userEvent from "@testing-library/user-event";

describe("Todolist", () => {
  test("Deve renderizar com o titulo", () => {
    render(<TodoList />);

    const title = screen.getByText("Todo List");

    expect(title).toBeInTheDocument();
  });

  test("Deve renderizar com o input vazio", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText(/enter a todo/i);

    expect(input).toHaveValue("");
  });

  test("Deve atualizar o valor do input ao digitar", async () => {
    render(<TodoList />);
    // eslint-disable-next-line testing-library/no-debugging-utils
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/enter a todo/i);

    await user.type(input, "Olá dev");

    expect(input).toHaveValue("Olá dev");
  });

  test("Deve renderizar uma nova tarefa ao digitar no valor do input e apertar a tecla enter", async () => {
    render(<TodoList />);
    // eslint-disable-next-line testing-library/no-debugging-utils
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/enter a todo/i);

    await user.type(input, "Olá dev{enter}");
    const todoItem =  screen.getByText("Olá dev")

    expect(todoItem).toBeInTheDocument("Olá");
});

test("Deve alterar o status da tarefa quando o botão de alterar a terefa fo clicado", 
async ()=>{
  render(<TodoList/>)

  const user = userEvent.setup();
  const input = screen.getByPlaceholderText(/enter a todo/i);

  await user.type(input, "Olá dev{enter}");
  const todoItem =  screen.getByText("Olá dev")

  const toggleButton = screen.getByText("Toggle")

  await user.click(toggleButton)

  expect(todoItem).toHaveStyle("text-decoration:line-through")

  await user.click(toggleButton)

  expect(todoItem).toHaveStyle("text-decoration:none")

})

  test("Deve remover a tarefa quando o botao de deleção for clicado", 
  async ()=>{
    render(<TodoList/>)

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/enter a todo/i);

    await user.type(input, "Olá dev{enter}");
    const todoItem =  screen.getByText("Olá dev")

    const deleteButton = screen.getByText("Delete")

    await user.click(deleteButton)

    expect(todoItem).not.toBeInTheDocument()

  })


});
