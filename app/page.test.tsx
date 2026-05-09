import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("Todoアプリ", () => {
  test("初期表示で見出しと入力欄がある", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Todo" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("やることを入力")).toBeInTheDocument();
  });

  test("入力してボタンを押すとTODOが追加される", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("やることを入力"), "牛乳を買う");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
  });

  test("EnterキーでもTODOが追加される", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(
      screen.getByPlaceholderText("やることを入力"),
      "本を読む{Enter}",
    );

    expect(screen.getByText("本を読む")).toBeInTheDocument();
  });

  test("空文字や空白だけでは追加されない", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("やることを入力"), "   {Enter}");

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  test("リストをクリックすると完了状態になる", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(
      screen.getByPlaceholderText("やることを入力"),
      "テスト{Enter}",
    );

    const item = screen.getByText("テスト");
    expect(item).not.toHaveClass("line-through");

    await user.click(item);

    expect(screen.getByText("テスト")).toHaveClass("line-through");
  });

  test("削除ボタンを押すとTODOが消え、トグルは発火しない", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(
      screen.getByPlaceholderText("やることを入力"),
      "削除する{Enter}",
    );

    await user.click(screen.getByRole("button", { name: "削除" }));

    expect(screen.queryByText("削除する")).not.toBeInTheDocument();
  });

  test("追加するとinputが空になる", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const input = screen.getByPlaceholderText(
      "やることを入力",
    ) as HTMLInputElement;

    await user.type(input, "クリアされる{Enter}");

    expect(input.value).toBe("");
  });
});
