# linkSaver UI Polish Design Spec

## Goal
Refine the saved-products and compare experiences so interactions are explicit, card heights stay stable, and category changes do not cause visible layout reflow.

## Requested Changes
- Remove row-level hover treatment from the desktop "All saved products" table because rows are not clickable.
- Add an explicit action to open a product link in a new tab anywhere a copy-link action is available.
- Prevent the dashboard from flickering when switching categories whose product content produces different column widths.
- Clamp long product links on the compare page so one long URL does not stretch a compare card vertically.
- Keep every desktop table cell to a single visual line.

## Interaction Design
### Saved Products Table
- Desktop table rows remain non-clickable.
- Remove background hover styling from table rows.
- Keep hover, focus, and underline feedback only on real interactive controls inside the row.
- Add an `Open link` button in the actions group next to `Copy link`.
- Use a stable table layout so column widths do not shift when the visible product set changes.
- Every desktop table column should render one line per row.
- Width-heavy content should truncate instead of wrapping.

### Mobile Product Cards
- Preserve the current card layout and action grid.
- Add an `Open link` button alongside `Copy link` so mobile has the same explicit affordance as desktop.
- Keep the existing inline "Open product page" anchor as a lightweight secondary link.

### Compare Page
- Keep the compare cards as the primary side-by-side review surface.
- Add an explicit `Open link` action on each compare card.
- Continue to display the raw URL for transparency, but clamp it to a single line and preserve the full destination through the anchor target and browser tooltip behavior.
- The compare card should stay compact and readable even for unusually long URLs.
- Compare cards should keep their internal fields aligned across products even when one product name is much longer than another.
- The title/store header area should reserve consistent vertical space so the price, category, store, and link rows start at the same positions across cards.
- Product titles should clamp to a maximum of 2 lines.
- The title area should reserve a fixed 2-line slot so a 1-line title and a 2-line title consume the same vertical space.

## Rendering Behavior
- The desktop product table should use a stable column layout across category changes.
- Switching categories should not cause visible table-width flicker when one category contains longer names, store labels, or action content than another.
- Single-line cells should use truncation, nowrap behavior, and explicit column sizing where needed so the layout stays visually steady.
- The compare-card layout should use stable row sizing so varying product-title lengths do not shift the metadata rows out of alignment between cards.
- The compare-card title should be visually capped at 2 lines, and the reserved title height should remain constant whether the title uses 1 line or 2.

## Implementation Notes
- Prefer minimal changes in existing route and feature components instead of introducing new abstractions.
- Keep explicit actions consistent across desktop table rows, mobile product cards, and compare cards.
- Use Tailwind utility classes already present in the project for link clamping and spacing.
- Favor `table-fixed` or explicit width constraints on desktop if that is the cleanest way to guarantee stable one-line rows.

## Testing Strategy
- Add tests for the new `Open link` actions in the product list and compare surfaces.
- Add or update route/component coverage so the intended action labels render in both saved-products and compare contexts.
- Verify long compare-page URLs remain visually constrained.
- Verify compare-card metadata rows stay visually aligned when product names have different line counts.
- Verify the compare-card title contract reflects a fixed 2-line slot rather than the previous 3-line clamp.
- Verify desktop table rows stay single-line and category changes do not cause column reflow flicker.

## Non-Goals
- Making the product rows themselves clickable
- Changing category/filter information architecture
- Reworking compare-page layout beyond the explicit link action and URL overflow fix
