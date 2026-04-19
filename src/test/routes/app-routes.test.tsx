import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { appRoutes } from "@/app/router";
import { linkSaverStore } from "@/store/use-link-saver-store";

const seededCategories = [
  {
    id: "category-tech",
    name: "Tech",
    createdAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "category-home",
    name: "Home",
    createdAt: "2026-04-19T00:00:00.000Z",
  },
] as const;

const baseProduct = {
  categoryId: seededCategories[0].id,
  createdAt: "2026-04-19T00:00:00.000Z",
  id: "product-1",
  link: "https://example.com/product-1",
  name: "Noise-cancelling headphones",
  price: 249,
  storeName: "SoundLab",
  updatedAt: "2026-04-19T00:00:00.000Z",
};

function renderRoute(path: string) {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: [path],
  });

  return render(<RouterProvider router={router} />);
}

describe("app routes", () => {
  beforeEach(() => {
    localStorage.clear();
    linkSaverStore.getState().replaceState({
      categories: seededCategories.map((category) => ({ ...category })),
      compareProductIds: [],
      filterCategoryId: null,
      products: [],
      sortBy: "price-asc",
    });
  });

  it("renders the dashboard empty state", async () => {
    renderRoute("/");

    expect(
      await screen.findByText(/start by saving your first product/i),
    ).toBeInTheDocument();
  });

  it("renders the compare empty state", async () => {
    renderRoute("/compare");

    expect(
      await screen.findByRole("heading", { name: /pick products to compare/i }),
    ).toBeInTheDocument();
  });

  it("renders an explicit open-link action for saved products", async () => {
    const product = { ...baseProduct };

    linkSaverStore.getState().replaceState({
      categories: seededCategories.map((category) => ({ ...category })),
      compareProductIds: [],
      filterCategoryId: null,
      products: [product],
      sortBy: "price-asc",
    });

    renderRoute("/");

    const openLinkActions = await screen.findAllByRole("link", {
      name: /open link/i,
    });

    expect(openLinkActions.length).toBeGreaterThan(0);
    openLinkActions.forEach((openLinkAction) => {
      expect(openLinkAction).toHaveAttribute("href", product.link);
      expect(openLinkAction).toHaveAttribute("target", "_blank");
    });
  });

  it("renders an explicit open-link action on the compare page", async () => {
    const product = { ...baseProduct };

    linkSaverStore.getState().replaceState({
      categories: seededCategories.map((category) => ({ ...category })),
      compareProductIds: [product.id],
      filterCategoryId: null,
      products: [product],
      sortBy: "price-asc",
    });

    renderRoute("/compare");

    const openLinkAction = await screen.findByRole("link", {
      name: /open link/i,
    });

    expect(openLinkAction).toHaveAttribute("href", product.link);
    expect(openLinkAction).toHaveAttribute("target", "_blank");
  });

  it("keeps compare headers aligned, reserves a fixed title slot, and truncates the raw link to one line", async () => {
    const products = [
      {
        ...baseProduct,
        id: "product-long-name",
        name: "Ultra-compact aerospace travel adapter with multi-region support and braided cable",
        link: "https://example.com/products/ultra-compact-aerospace-travel-adapter-with-multi-region-support-and-braided-cable",
      },
      {
        ...baseProduct,
        id: "product-short-name",
        name: "Flight plug",
        link: "https://example.com/products/flight-plug",
      },
    ];

    linkSaverStore.getState().replaceState({
      categories: seededCategories.map((category) => ({ ...category })),
      compareProductIds: products.map((product) => product.id),
      filterCategoryId: null,
      products,
      sortBy: "price-asc",
    });

    renderRoute("/compare");

    const compareTitles = screen.getAllByRole("heading", { level: 3 });
    expect(compareTitles).toHaveLength(2);
    compareTitles.forEach((title) => {
      expect(title).toHaveClass("line-clamp-2");

      const titleSlot = title.closest('[data-compare-title-slot="true"]');
      const cardHeader = title.closest('[data-compare-card-header="true"]');

      expect(cardHeader).toHaveStyle({ minHeight: "7.5rem" });
      expect(titleSlot).toHaveStyle({ height: "3.5rem" });
    });

    const rawLink = screen.getByRole("link", { name: products[0].link });

    expect(rawLink).toHaveClass("truncate");
    expect(rawLink).toHaveAttribute("title", products[0].link);
    expect(screen.getAllByRole("link", { name: /open link/i })).toHaveLength(2);
  });

  it("shows a category-focused heading for the category route", async () => {
    const tech = seededCategories[0];

    renderRoute(`/category/${tech.id}`);

    expect(
      await screen.findByRole("heading", { name: `Category: ${tech.name}` }),
    ).toBeInTheDocument();
  });

  it("keeps the dashboard header and primary controls on the same compact radius system", async () => {
    const product = { ...baseProduct };

    linkSaverStore.getState().replaceState({
      categories: seededCategories.map((category) => ({ ...category })),
      compareProductIds: [],
      filterCategoryId: null,
      products: [product],
      sortBy: "price-asc",
    });

    const { container } = renderRoute("/");

    expect(
      await screen.findByRole("button", { name: "Add product" }),
    ).toHaveClass("rounded-2xl");
    expect(screen.getByRole("link", { name: "All categories" })).toHaveClass(
      "rounded-2xl",
    );
    expect(container.querySelector("header")).toHaveClass("rounded-2xl");
  });
});
