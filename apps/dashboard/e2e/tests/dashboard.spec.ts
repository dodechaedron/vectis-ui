import DashboardPage from "e2e/pages/dashboard";
import { closeContext, startContext } from "e2e/setup";

import { expect,test } from "@playwright/test";

test.describe("dashboard", () => {
  test.beforeAll(startContext);
  test.afterAll(closeContext);
  test("should appear wallet address in nav button", async () => {
    const dashboardPage = new DashboardPage({ context });
    await dashboardPage.navigate();
    const elem = await dashboardPage.getLocatorByTestId("wallet-connect");
    await expect(elem).toHaveText("wallet-user");
  });
});
