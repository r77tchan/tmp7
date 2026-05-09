import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("初期表示で見出しが見える", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Todo" })).toBeVisible();
});

test("Enterキーでtodoを追加できる", async ({ page }) => {
  const input = page.getByPlaceholder("やることを入力");
  await input.fill("牛乳を買う");
  await input.press("Enter");

  await expect(page.getByText("牛乳を買う")).toBeVisible();
});

test("追加ボタンでtodoを追加できる", async ({ page }) => {
  await page.getByPlaceholder("やることを入力").fill("本を読む");
  await page.getByRole("button", { name: "追加" }).click();

  await expect(page.getByText("本を読む")).toBeVisible();
});

test("リストをクリックすると完了状態になる", async ({ page }) => {
  const input = page.getByPlaceholder("やることを入力");
  await input.fill("テスト");
  await input.press("Enter");

  const item = page.getByText("テスト");
  await expect(item).not.toHaveClass(/line-through/);

  await item.click();
  await expect(item).toHaveClass(/line-through/);
});

test("削除ボタンでtodoを消せる", async ({ page }) => {
  const input = page.getByPlaceholder("やることを入力");
  await input.fill("削除する");
  await input.press("Enter");

  await expect(page.getByText("削除する")).toBeVisible();

  await page.getByRole("button", { name: "削除" }).click();
  await expect(page.getByText("削除する")).not.toBeVisible();
});

test("複数のtodoを追加できる", async ({ page }) => {
  const input = page.getByPlaceholder("やることを入力");
  for (const text of ["A", "B", "C"]) {
    await input.fill(text);
    await input.press("Enter");
  }

  await expect(page.getByRole("listitem")).toHaveCount(3);
});
