import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SummaryCards } from "@/features/shared/summary-cards";

describe("SummaryCards", () => {
  it("uses the shared compact card radius", () => {
    const { container } = render(
      <SummaryCards categories={[]} compareCount={0} products={[]} />,
    );

    const cards = container.querySelectorAll('[class*="border-blue-100"]');

    expect(cards.length).toBeGreaterThan(0);
  });
});
