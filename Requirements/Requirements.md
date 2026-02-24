# 📦 Inventory Management Power App
### Application Requirements & Data Model

> **Design System:** Fluent UI 2 inspired — clean white surfaces, `#0F6CBD` (Microsoft blue) as the primary accent, `#F5F5F5` card backgrounds, rounded corners (8px), subtle drop shadows, and a left-side vertical nav rail. Typography uses Segoe UI throughout. All screens are optimized for tablet landscape (1366×768) as the primary form factor, with mobile responsiveness considered.

---

## 🗂️ Table of Contents

1. [Data Model](#data-model)
2. [Screen 1 – Dashboard / Home](#screen-1--dashboard--home)
3. [Screen 2 – Product Catalog](#screen-2--product-catalog)
4. [Screen 3 – Product Detail & Edit](#screen-3--product-detail--edit)
5. [Screen 4 – Add New Product](#screen-4--add-new-product)
6. [Screen 5 – Stock Movement Log](#screen-5--stock-movement-log)
7. [Screen 6 – Receive Stock (Inbound)](#screen-6--receive-stock-inbound)
8. [Screen 7 – Issue Stock (Outbound)](#screen-7--issue-stock-outbound)
9. [Screen 8 – Low Stock Alerts](#screen-8--low-stock-alerts)
10. [Screen 9 – Warehouse / Location Manager](#screen-9--warehouse--location-manager)
11. [Screen 10 – Reports & Analytics](#screen-10--reports--analytics)
12. [Screen 11 – Suppliers](#screen-11--suppliers)
13. [Screen 12 – Settings & Categories](#screen-12--settings--categories)

---

## Data Model

All dummy collections use the `sa_` prefix to mirror future Dataverse table naming conventions.

---

### `sa_Product`
| Field | Type | Sample Value |
|---|---|---|
| `sa_ProductId` | GUID | `"prod-001"` |
| `sa_ProductName` | Text | `"Wireless Keyboard K380"` |
| `sa_SKU` | Text | `"WK-K380-BLK"` |
| `sa_CategoryId` | Lookup → `sa_Category` | `"cat-002"` |
| `sa_SupplierId` | Lookup → `sa_Supplier` | `"sup-001"` |
| `sa_LocationId` | Lookup → `sa_Location` | `"loc-A1"` |
| `sa_QuantityOnHand` | Number | `142` |
| `sa_ReorderLevel` | Number | `20` |
| `sa_ReorderQuantity` | Number | `50` |
| `sa_UnitCost` | Currency | `29.99` |
| `sa_SellingPrice` | Currency | `49.99` |
| `sa_UnitOfMeasure` | Choice | `"Each"` |
| `sa_Description` | Multiline Text | `"Compact Bluetooth keyboard..."` |
| `sa_ImageURL` | URL | `"https://..."` |
| `sa_IsActive` | Boolean | `true` |
| `sa_CreatedOn` | DateTime | `"2024-01-15"` |
| `sa_ModifiedOn` | DateTime | `"2025-02-10"` |

---

### `sa_Category`
| Field | Type | Sample Value |
|---|---|---|
| `sa_CategoryId` | GUID | `"cat-001"` |
| `sa_CategoryName` | Text | `"Electronics"` |
| `sa_Description` | Text | `"Electronic devices and accessories"` |
| `sa_ColorCode` | Text | `"#0078D4"` |
| `sa_IconName` | Text | `"Electronics"` |

**Sample records:** Electronics, Furniture, Office Supplies, Peripherals, Networking, Consumables

---

### `sa_Supplier`
| Field | Type | Sample Value |
|---|---|---|
| `sa_SupplierId` | GUID | `"sup-001"` |
| `sa_SupplierName` | Text | `"TechSource Distributors"` |
| `sa_ContactName` | Text | `"Ahmad Raza"` |
| `sa_Email` | Email | `"ahmad@techsource.pk"` |
| `sa_Phone` | Text | `"+92-300-1234567"` |
| `sa_Address` | Multiline Text | `"12 Main Blvd, Lahore"` |
| `sa_LeadTimeDays` | Number | `7` |
| `sa_IsActive` | Boolean | `true` |

---

### `sa_Location`
| Field | Type | Sample Value |
|---|---|---|
| `sa_LocationId` | GUID | `"loc-A1"` |
| `sa_LocationCode` | Text | `"A-01-03"` |
| `sa_WarehouseName` | Text | `"Main Warehouse"` |
| `sa_Zone` | Text | `"Zone A"` |
| `sa_Aisle` | Text | `"Aisle 1"` |
| `sa_Shelf` | Text | `"Shelf 3"` |
| `sa_Capacity` | Number | `500` |
| `sa_IsActive` | Boolean | `true` |

---

### `sa_StockMovement`
| Field | Type | Sample Value |
|---|---|---|
| `sa_MovementId` | GUID | `"mov-0091"` |
| `sa_ProductId` | Lookup → `sa_Product` | `"prod-001"` |
| `sa_MovementType` | Choice | `"Inbound"` / `"Outbound"` / `"Adjustment"` / `"Transfer"` |
| `sa_Quantity` | Number | `50` |
| `sa_QuantityBefore` | Number | `92` |
| `sa_QuantityAfter` | Number | `142` |
| `sa_ReferenceNumber` | Text | `"PO-2025-0042"` |
| `sa_Notes` | Multiline Text | `"Received from supplier"` |
| `sa_MovementDate` | DateTime | `"2025-02-18T09:30:00"` |
| `sa_CreatedBy` | Text | `"Sara Malik"` |
| `sa_LocationId` | Lookup → `sa_Location` | `"loc-A1"` |

---

### `sa_PurchaseOrder` *(lightweight, for receive flow)*
| Field | Type | Sample Value |
|---|---|---|
| `sa_POId` | GUID | `"po-0042"` |
| `sa_PONumber` | Text | `"PO-2025-0042"` |
| `sa_SupplierId` | Lookup → `sa_Supplier` | `"sup-001"` |
| `sa_Status` | Choice | `"Draft"` / `"Sent"` / `"Partially Received"` / `"Received"` |
| `sa_ExpectedDate` | Date | `"2025-02-20"` |
| `sa_CreatedOn` | DateTime | `"2025-02-10"` |

---

### `sa_AppSettings`
| Field | Type | Sample Value |
|---|---|---|
| `sa_SettingKey` | Text | `"DefaultWarehouse"` |
| `sa_SettingValue` | Text | `"Main Warehouse"` |
| `sa_Description` | Text | `"Default warehouse for new stock entries"` |

---

---

## Screen 1 – Dashboard / Home

**Purpose:** Give users an at-a-glance operational overview of inventory health, recent activity, and quick actions.

---

### UI Design Requirements

- **Layout:** Full-width content area with a sticky top header bar (56px tall, white, 1px bottom border `#E0E0E0`). Left nav rail (64px collapsed / 220px expanded) with icon + label navigation links.
- **Header Bar:** App logo/icon on the left, screen title "Dashboard" in `Segoe UI Semibold 18px`, user avatar + name on the right, notification bell icon with a badge counter.
- **KPI Cards Row:** 4 equal-width cards in a horizontal row. Each card uses a white background, 8px border radius, subtle shadow (`0 2px 8px rgba(0,0,0,0.08)`), 24px internal padding. Each card has: an icon circle (48px, coloured background), a large metric number in `Semibold 32px`, a label in `Regular 13px #6B6B6B`, and a small trend indicator (▲ green / ▼ red with % change).
- **Charts Section:** Two side-by-side panels below the KPI row. Left panel (60% width) shows a bar chart of stock movement over the last 7 days (inbound vs outbound, two-tone bars in `#0F6CBD` and `#6BB5E0`). Right panel (40% width) shows a donut chart of inventory value by category with a legend.
- **Recent Activity Feed:** Below the charts — a timeline-style list of the last 10 stock movements with coloured movement type badges (`Inbound` = green chip, `Outbound` = orange chip, `Adjustment` = purple chip). Each row shows product name, quantity change, user, and relative time ("2 hours ago").
- **Quick Action Buttons:** Floating action bar at the bottom-right corner with 3 primary buttons: "Receive Stock", "Issue Stock", "Add Product" — each with an icon and label, styled in `#0F6CBD` with white text.
- **Low Stock Banner:** If there are products below reorder level, show a dismissible amber banner at the top of the content area: "⚠ 7 products are below reorder level — View Alerts".

---

### Functional Requirements

- On app load, calculate and display the 4 KPI values from `sa_Product` and `sa_StockMovement` collections.
- KPI Card 1: **Total Products** — `CountRows(sa_Product)` where `sa_IsActive = true`.
- KPI Card 2: **Total Stock Value** — `Sum(sa_Product, sa_QuantityOnHand * sa_UnitCost)`, formatted as currency.
- KPI Card 3: **Low Stock Items** — `CountRows(Filter(sa_Product, sa_QuantityOnHand <= sa_ReorderLevel))`.
- KPI Card 4: **Movements Today** — `CountRows(Filter(sa_StockMovement, DateDiff(sa_MovementDate, Today(), Days) = 0))`.
- Bar chart data is grouped by date and movement type from `sa_StockMovement` for the rolling 7-day window.
- Donut chart data is grouped by `sa_CategoryId` and sums `sa_QuantityOnHand * sa_UnitCost` per category.
- Recent activity feed is sorted descending by `sa_MovementDate`, limited to 10 rows, and refreshed on screen visible.
- Low stock banner count is derived from the same filter as KPI Card 3; tapping it navigates to Screen 8.
- Quick action buttons navigate to Screen 6 (Receive), Screen 7 (Issue), Screen 4 (Add Product) respectively.
- Nav rail highlights the Dashboard icon as active state (`#EFF6FC` background, `#0F6CBD` left border 3px).

---

### Data Bindings

- `sa_Product` → KPI totals, donut chart, low stock banner count
- `sa_StockMovement` → Bar chart, recent activity feed, today's movement count
- `sa_Category` → Donut chart legend labels and colours

---

---

## Screen 2 – Product Catalog

**Purpose:** Browse, search, filter, and sort all products. Entry point for viewing or editing any product.

---

### UI Design Requirements

- **Layout:** Content area split into a filter sidebar (280px, `#FAFAFA` background, 1px right border) and a main product grid/list area.
- **Search Bar:** Full-width at the top of the main area. Rounded pill shape (`border-radius: 24px`), `#F0F0F0` fill, magnifier icon on left, clear (×) button on right. Placeholder: "Search by name, SKU, or description…"
- **View Toggle:** Icon buttons top-right to switch between Grid View (card tiles) and List View (table rows). Active state fills with `#0F6CBD`.
- **Filter Sidebar:** Contains collapsible filter groups: Category (checkbox list with coloured chips), Supplier (checkbox list), Stock Status (radio: All / In Stock / Low Stock / Out of Stock), Location (dropdown). Apply and Clear buttons at the bottom of sidebar in a sticky footer.
- **Grid View:** Products displayed in a 3-column responsive grid. Each product card: white background, 8px radius, shadow, 160px image area (grey placeholder with icon if no image), product name in `Semibold 14px`, SKU in `Regular 12px #6B6B6B`, quantity badge (green if OK, amber if low, red if zero), unit cost label. Hovering a card lifts it (shadow deepens, slight scale 1.02).
- **List View:** Standard table with sortable column headers (Name, SKU, Category, Location, Qty on Hand, Reorder Level, Unit Cost, Status). Alternating row shading (`#FAFAFA` / white). Status column uses coloured pill badges.
- **Sort Controls:** Dropdown above the grid/list: "Sort by: Name A–Z / Name Z–A / Qty (High–Low) / Qty (Low–High) / Recently Modified".
- **Result Count:** "Showing 42 of 156 products" label in `Regular 13px #6B6B6B` above the grid.
- **Empty State:** Illustrated empty state (clipboard icon) with message "No products match your filters" and a "Clear Filters" link when no results.

---

### Functional Requirements

- Search is performed client-side using `Search(sa_Product, SearchInput.Text, "sa_ProductName", "sa_SKU", "sa_Description")`.
- Filters are applied cumulatively using `Filter()` — category, supplier, location, and stock status filters stack with AND logic.
- Stock Status filter maps to: In Stock = `sa_QuantityOnHand > sa_ReorderLevel`, Low Stock = `sa_QuantityOnHand <= sa_ReorderLevel && > 0`, Out of Stock = `sa_QuantityOnHand = 0`.
- Sorting is controlled by a variable `varSortField` and `varSortAsc` toggled by column headers or the sort dropdown.
- Tapping a product card or row navigates to Screen 3 (Product Detail), passing the selected product record via `Set(varSelectedProduct, ThisItem)`.
- Grid/List view toggle stores preference in a local variable `varViewMode` persisted in User Settings if available.
- Pagination or virtual scrolling handles large datasets (default page size: 50 records).
- A floating "+" button (bottom-right, 56px circle, `#0F6CBD`) navigates to Screen 4 (Add Product).
- Filter sidebar can be collapsed on smaller screens, toggled by a filter icon button.

---

### Data Bindings

- `sa_Product` → Gallery source, filtered and sorted
- `sa_Category` → Category filter checkbox list
- `sa_Supplier` → Supplier filter checkbox list
- `sa_Location` → Location filter dropdown

---

---

## Screen 3 – Product Detail & Edit

**Purpose:** View full product information, current stock level, movement history, and edit product details inline.

---

### UI Design Requirements

- **Layout:** Two-column layout. Left column (40%) — product identity card. Right column (60%) — tabbed detail panels.
- **Left Column (Product Card):** White card with 12px radius and shadow. Large product image (220px × 220px, rounded 8px, grey placeholder). Product name in `Semibold 22px`, SKU in `Regular 13px #6B6B6B` below. Category chip (coloured pill). Supplier name with a link icon. Stock level displayed as a large circular progress ring — filled colour changes: green (> reorder level), amber (at/near reorder level), red (zero). Below the ring: "142 units on hand" in `Bold 28px`, "Reorder at 20" in `Regular 12px`. Two action buttons: "Receive Stock" (primary, `#0F6CBD`) and "Issue Stock" (secondary, outlined).
- **Right Column Tabs:** Four tabs in a tab bar — Overview, Movement History, Edit Details, and QR/Barcode.
  - **Overview Tab:** Key-value detail grid: Description (full text), Unit of Measure, Unit Cost, Selling Price, Location (linked), Reorder Quantity, Date Added, Last Modified. Values in `Regular 14px`, labels in `Semibold 12px #6B6B6B` uppercase.
  - **Movement History Tab:** Scrollable timeline of all `sa_StockMovement` records for this product. Each entry: date/time on left, coloured type badge, quantity change (+ green / – red), reference number, and notes. Filter chips at top: All / Inbound / Outbound / Adjustment.
  - **Edit Details Tab:** Inline form — fields become editable inputs. Save button appears in the tab bar when changes are detected (`varIsDirty = true`). Cancel reverts changes.
  - **QR/Barcode Tab:** Displays a generated QR code containing the product SKU and ID, with a "Print Label" button.
- **Back Navigation:** "<  Back to Catalog" breadcrumb link at the top-left.
- **Delete Button:** Accessible via a "⋯ More" overflow menu top-right (soft delete — sets `sa_IsActive = false`).

---

### Functional Requirements

- Screen receives `varSelectedProduct` from Screen 2 and populates all fields from the matching `sa_Product` record.
- Stock level ring progress is calculated as `sa_QuantityOnHand / Max(sa_QuantityOnHand, sa_ReorderLevel * 3)` capped at 100%.
- Movement History tab filters `sa_StockMovement` by `sa_ProductId = varSelectedProduct.sa_ProductId`, sorted descending by `sa_MovementDate`.
- Movement type filter chips on the history tab use a variable `varMovementFilter` to further filter the gallery.
- Edit Details tab uses a `Form` control bound to `sa_Product`. On Save: `Patch(sa_Product, varSelectedProduct, {edited fields})`, then show a success notification toast ("Product updated successfully ✓"), refresh `varSelectedProduct`.
- "Receive Stock" button navigates to Screen 6 with the product pre-selected. "Issue Stock" navigates to Screen 7 with product pre-selected.
- Soft delete sets `sa_IsActive = false` via `Patch()` and navigates back to Screen 2.
- QR code is rendered using a QR code component or an image generated via a third-party URL API (e.g., `"https://api.qrserver.com/v1/create-qr-code/?data=" & varSelectedProduct.sa_SKU`).

---

### Data Bindings

- `sa_Product` → Product details, edit form
- `sa_StockMovement` → Movement history tab gallery
- `sa_Location` → Location label lookup
- `sa_Category` → Category chip label and colour
- `sa_Supplier` → Supplier name display

---

---

## Screen 4 – Add New Product

**Purpose:** Capture all required information to register a new product in the inventory.

---

### UI Design Requirements

- **Layout:** Centered form card (max-width 720px, white, 12px radius, shadow) on a `#F5F5F5` page background. Scrollable vertically.
- **Form Header:** Section title "Add New Product" in `Semibold 20px`, subtitle "Fill in the product details below" in `Regular 13px #6B6B6B`. Progress indicator at the top showing 3 steps: Basic Info → Stock & Pricing → Location & Supplier.
- **Step 1 – Basic Info:** Product Name (full-width text input), SKU (text input with "Auto-generate" toggle button that creates SKU from name + timestamp), Category (dropdown with coloured chips), Description (multiline textarea 4 rows), Image Upload (dashed border upload zone with file picker, image preview thumbnail when uploaded).
- **Step 2 – Stock & Pricing:** Initial Quantity on Hand (number input with stepper +/–), Reorder Level (number input), Reorder Quantity (number input), Unit of Measure (dropdown: Each, Box, Kg, Litre, Metre), Unit Cost (currency input with PKR/USD toggle), Selling Price (currency input), Gross Margin % (auto-calculated read-only field shown in grey, updates live).
- **Step 3 – Location & Supplier:** Supplier (searchable dropdown from `sa_Supplier`), Warehouse/Location (cascading: Warehouse → Zone → Shelf, dropdowns from `sa_Location`).
- **Navigation:** "Back" and "Next" buttons between steps. On Step 3, "Save Product" replaces "Next" — primary blue button, full width. "Cancel" link top-right navigates back.
- **Validation Indicators:** Required fields marked with red asterisk. Inline validation messages appear below inputs on blur (e.g., "SKU already exists", "Quantity must be ≥ 0"). All required fields must be valid before step can advance.
- **Field Styling:** Inputs use `border: 1px solid #D1D1D1`, `border-radius: 6px`, `height: 40px`, focus state border changes to `#0F6CBD` with a subtle glow. Labels are `Semibold 13px` above each input.

---

### Functional Requirements

- Multi-step state is managed by variable `varAddStep` (1, 2, or 3).
- "Next" button validates current step's required fields before advancing. If validation fails, display error messages and prevent navigation.
- SKU auto-generate: `Upper(Left(ProductNameInput.Text, 3)) & "-" & Text(Now(), "YYYYMMDD") & "-" & Text(Rand()*1000, "000")`.
- SKU uniqueness check: `CountRows(Filter(sa_Product, sa_SKU = SKUInput.Text)) > 0` triggers an error.
- Gross Margin auto-calculation: `If(SellingPriceInput.Value > 0, Round((SellingPriceInput.Value - UnitCostInput.Value) / SellingPriceInput.Value * 100, 1), 0) & "%"`.
- On "Save Product": `Collect(sa_Product, { sa_ProductId: GUID(), sa_ProductName: ..., sa_SKU: ..., ... , sa_IsActive: true, sa_CreatedOn: Now() })`.
- If initial quantity > 0, also create an `sa_StockMovement` record with `sa_MovementType = "Inbound"` and `sa_ReferenceNumber = "INITIAL-STOCK"`.
- After successful save: navigate to the new product's Screen 3, show a success toast "Product added successfully ✓".
- Image upload stores the image in a local collection variable for now (`varProductImages`) to be mapped to Dataverse File field later.

---

### Data Bindings

- `sa_Product` → Save target via `Collect()`, SKU uniqueness check
- `sa_Category` → Category dropdown
- `sa_Supplier` → Supplier searchable dropdown
- `sa_Location` → Warehouse/Zone/Shelf cascading dropdowns
- `sa_StockMovement` → Initial stock movement record on save

---

---

## Screen 5 – Stock Movement Log

**Purpose:** A comprehensive audit log of all stock movements across all products, with filtering and export.

---

### UI Design Requirements

- **Layout:** Full-width list view with a filter bar at the top (horizontal, not sidebar).
- **Filter Bar:** A horizontal strip of filter controls below the header: Date Range picker (From / To), Movement Type multi-select chips (All, Inbound, Outbound, Adjustment, Transfer), Product search (type-ahead), Created By (dropdown). A "Clear All" link on the right.
- **Movement Log Table:** Columns — Date & Time, Product Name (with SKU sub-label), Movement Type (coloured badge), Qty Change (+50 green / –12 red), Qty Before → After (e.g., "92 → 142"), Reference No., Location, Created By, Notes (truncated, hover to expand). Column headers are sortable (click to toggle asc/desc with arrow indicator).
- **Movement Type Badges:** Styled as small pill chips — Inbound (`#D1F0D1` background, `#1A7B1A` text), Outbound (`#FFE8CC` background, `#C45000` text), Adjustment (`#E8DEFF` background, `#5B2C9E` text), Transfer (`#D6EDFF` background, `#004E8C` text).
- **Row Detail Expansion:** Clicking a row expands an inline detail panel below showing full Notes text and any linked reference details.
- **Pagination:** Page size selector (25 / 50 / 100) and prev/next page controls at the bottom. Total record count displayed.
- **Export Button:** Top-right "Export to CSV" button (`#FFFFFF` background, `#0F6CBD` border and text, download icon). Disabled if no records match current filter.
- **Summary Strip:** Above the table — 4 mini stat chips showing totals for the filtered result set: Total Movements, Total Units In, Total Units Out, Net Change. Styled as `#F0F0F0` pills with `Semibold` numbers.

---

### Functional Requirements

- Gallery source is `sa_StockMovement` filtered by all active filter values simultaneously.
- Date range filter uses `sa_MovementDate >= DateRangeFrom.SelectedDate && sa_MovementDate <= DateRangeTo.SelectedDate + 1`.
- Movement Type filter uses a collection `colSelectedTypes`; if empty, all types are shown.
- Product search filters `sa_ProductId` by looking up matching products from `sa_Product` where name or SKU contains the search term.
- Summary strip values are recalculated on filter change: `Sum(FilteredMovements, sa_Quantity)` split by movement type.
- Sort state managed by `varMovLogSortField` and `varMovLogSortDir`.
- Pagination: `varMovLogPage` (current page), `varMovLogPageSize`. Gallery offset calculated as `(varMovLogPage - 1) * varMovLogPageSize`.
- CSV export: Constructs a delimited text string from the filtered collection and uses `Launch()` with a data URI or sends to a Power Automate flow for file generation.
- Navigating from Screen 3's Movement History tab passes the product filter pre-applied to this screen.

---

### Data Bindings

- `sa_StockMovement` → Primary gallery source
- `sa_Product` → Product name/SKU lookup for display and search filter
- `sa_Location` → Location name lookup
- User context → Created By default filter option

---

---

## Screen 6 – Receive Stock (Inbound)

**Purpose:** Record incoming stock from a supplier or purchase order, updating quantity on hand.

---

### UI Design Requirements

- **Layout:** Centered two-panel card layout (max-width 900px). Left panel: PO / supplier selection. Right panel: line item entry.
- **Panel 1 – Reference Details:** Section header "Receive Stock" with a warehouse-in icon. Fields: Reference Number (text input, auto-suggested from `sa_PurchaseOrder`), Supplier (searchable dropdown), Expected PO (optional lookup dropdown showing open POs for selected supplier), Received Date (date picker, defaults to today), Notes (textarea, optional).
- **Panel 2 – Product Lines:** A dynamic table of product lines. Each row: Product (searchable dropdown), Location (dropdown), Expected Qty (read-only from PO if linked), Received Qty (number input — highlighted in amber if different from expected), Unit Cost (editable, pre-filled from product record). "Add Line" button adds a new blank row. Row delete (×) button on the far right. A running subtotal row at the bottom of the table.
- **Product Search in Lines:** Typing in the product field shows a dropdown with product name, SKU, current stock level, and a low-stock indicator.
- **Confirmation Panel:** A summary card on the right side (or below on smaller screens): Lists all lines with quantities, total units to be received, and total value. "Post Receipt" large primary button. "Save as Draft" secondary button. "Cancel" link.
- **Success State:** After posting, the screen transitions to a confirmation view: green checkmark icon, "Stock Received Successfully", summary of what was posted, and buttons for "View Movement Log" and "Receive Another".

---

### Functional Requirements

- On "Post Receipt": iterate through each line, for each product call `Patch(sa_Product, LookUp(sa_Product, sa_ProductId = line.ProductId), { sa_QuantityOnHand: sa_QuantityOnHand + line.ReceivedQty })`.
- For each line, `Collect(sa_StockMovement, { sa_MovementType: "Inbound", sa_ProductId: line.ProductId, sa_Quantity: line.ReceivedQty, sa_QuantityBefore: line.StockBefore, sa_QuantityAfter: line.StockBefore + line.ReceivedQty, sa_ReferenceNumber: ReferenceInput.Text, sa_MovementDate: Now(), sa_CreatedBy: User().FullName, sa_LocationId: line.LocationId, sa_Notes: NotesInput.Text })`.
- If linked to a `sa_PurchaseOrder`, update `sa_Status` to "Received" (or "Partially Received" if any line quantities differ).
- Validation: All lines must have a product selected and a received quantity > 0. Reference number is required. Duplicate product lines in the same receipt are flagged with a warning.
- Product dropdown in line items pre-filters active products (`sa_IsActive = true`).
- When a product is selected in a line, `sa_QuantityOnHand` is fetched and stored in `varStockBefore` for that line to calculate QuantityBefore/After.
- "Save as Draft" stores the incomplete receipt in a local `colDraftReceipts` collection (to be mapped to a Dataverse draft table later).
- If a product crosses above its reorder level after receiving, show a subtle informational toast.

---

### Data Bindings

- `sa_Product` → Product line dropdown, current stock fetch, post-receipt patch
- `sa_StockMovement` → New records created per line on post
- `sa_Supplier` → Supplier dropdown
- `sa_PurchaseOrder` → Optional PO lookup and status update
- `sa_Location` → Location dropdown per line

---

---

## Screen 7 – Issue Stock (Outbound)

**Purpose:** Record stock being issued/dispatched (to departments, customers, or projects), deducting from quantity on hand.

---

### UI Design Requirements

- **Layout:** Mirrors Screen 6 structure (two-panel card) but with an outbound colour theme — outbound accent uses `#C45000` (warm orange) for header icons and action buttons to visually distinguish from receiving.
- **Panel 1 – Issue Details:** Fields: Issue Reference (text input), Issued To (free text or lookup — department, project, or customer name), Issue Date (date picker, defaults to today), Reason / Purpose (dropdown: Internal Use, Sales Order, Damage Write-off, Transfer, Other), Notes (textarea).
- **Panel 2 – Product Lines:** Same dynamic table structure as Screen 6. Each row shows: Product (searchable dropdown), Current Stock (read-only badge, turns red if selected quantity would exceed it), Location (dropdown), Quantity to Issue (number input — validated against stock on hand). A warning icon appears on the row if quantity entered exceeds available stock.
- **Stock Availability Indicator:** Next to each product line's current stock, a colour indicator: green (ample stock), amber (issuing will bring below reorder level), red (insufficient stock — issue blocked).
- **Partial Issue Option:** A toggle on the confirmation panel "Allow Partial Issue" — when enabled, lines with insufficient stock are issued at the available quantity and flagged.
- **Confirmation & Post:** Same layout as Screen 6. "Post Issue" primary button styled in `#C45000`. Success state shows red-themed confirmation with outbound icon.

---

### Functional Requirements

- On product selection per line, fetch `sa_QuantityOnHand` and store in `line.AvailableStock`. Quantity input is validated: `IssuedQty <= AvailableStock`.
- Stock availability colour logic: if `(AvailableStock - IssuedQty) <= 0` → red; if `(AvailableStock - IssuedQty) <= sa_ReorderLevel` → amber; else → green.
- Insufficient stock warning does not block the user from entering the quantity, but does disable the "Post Issue" button unless "Allow Partial Issue" is toggled.
- On "Post Issue": `Patch(sa_Product, ..., { sa_QuantityOnHand: sa_QuantityOnHand - line.IssuedQty })` for each line.
- Create `sa_StockMovement` records with `sa_MovementType = "Outbound"` for each line.
- If any product falls below reorder level after issuing, generate a local alert entry in `colLowStockAlerts` and increment the Dashboard KPI counter.
- Reason dropdown values are stored in `sa_AppSettings` as a delimited string for easy configuration.
- Validation: Issue Reference and Issued To are required. At least one product line must be entered.

---

### Data Bindings

- `sa_Product` → Product line dropdown, stock level fetch, post-issue patch
- `sa_StockMovement` → New outbound records created per line on post
- `sa_Location` → Location dropdown per line
- `sa_AppSettings` → Reason dropdown values
- `colLowStockAlerts` → Populated if products fall below reorder level

---

---

## Screen 8 – Low Stock Alerts

**Purpose:** Monitor products at or below their reorder level and initiate reorder actions.

---

### UI Design Requirements

- **Layout:** Full-width screen. Header with amber warning icon and title "Low Stock Alerts". Subtitle showing "X products need attention".
- **Alert Level Tabs:** Three tabs at the top: "Out of Stock" (red badge count), "Below Reorder Level" (amber badge count), "Approaching Reorder" (yellow badge count — products within 120% of reorder level).
- **Alert Cards:** Each product displayed as a horizontal alert card (full-width, white, 8px radius, left border 4px coloured by severity: red / amber / yellow). Card content: Product image thumbnail (40×40px), Product Name + SKU, Category chip, Current Qty (large, bold, coloured by severity), Reorder Level label, "Deficit" value (how many units short of reorder qty), Last Movement date, and Supplier name. Two action buttons per card: "Receive Stock" (primary) and "Create PO" (secondary, greyed out for now — Phase 2).
- **Bulk Actions:** Checkbox on each card enables a multi-select mode. Bulk "Receive Stock" button appears in a bottom action bar when ≥ 1 card is selected.
- **Sort Controls:** Dropdown — "Sort by: Most Critical / Product Name / Category / Supplier".
- **Filter Chips:** Horizontal scrollable filter chips for Category to narrow alert list.
- **Empty State:** If no low stock items, show a large green checkmark with "All products are well stocked 🎉".
- **Last Refreshed:** Small timestamp label "Last refreshed: 2 minutes ago" with a manual refresh icon button, top-right.

---

### Functional Requirements

- On screen load (and on manual refresh), recompute the filtered product list from `sa_Product`.
- Out of Stock: `sa_QuantityOnHand = 0`. Below Reorder: `0 < sa_QuantityOnHand <= sa_ReorderLevel`. Approaching Reorder: `sa_QuantityOnHand <= sa_ReorderLevel * 1.2 && > sa_ReorderLevel`.
- Tab badge counts refresh whenever the underlying collection changes.
- Deficit value: `Max(0, sa_ReorderQuantity - sa_QuantityOnHand)` — how many units to order to reach optimal level.
- "Receive Stock" button on a card navigates to Screen 6 with the product pre-selected in a new line.
- Bulk selection tracks selected product IDs in `colSelectedAlerts`. The bulk "Receive Stock" action navigates to Screen 6 with multiple lines pre-populated.
- Category filter chips update `varAlertCategoryFilter`; the gallery re-filters accordingly.
- Sort is applied via `SortByColumns()` based on `varAlertSortField`.
- Last refreshed timestamp stored in `varAlertsLastRefresh = Now()` set on each refresh.

---

### Data Bindings

- `sa_Product` → Alert list source, filtered by stock thresholds
- `sa_Category` → Filter chip labels
- `sa_Supplier` → Supplier name display per card
- `sa_StockMovement` → Last movement date per product (via `LookUp` for latest record)

---

---

## Screen 9 – Warehouse / Location Manager

**Purpose:** View and manage the physical storage locations, zones, aisles, and shelves, and see what's stored where.

---

### UI Design Requirements

- **Layout:** Two-panel layout. Left panel (35%) — hierarchical location tree. Right panel (65%) — selected location detail.
- **Location Tree (Left Panel):** An expandable tree view styled as a vertical accordion. Top level: Warehouse name. Second level: Zones (A, B, C…). Third level: Aisles. Fourth level: Shelves. Each node shows its `sa_LocationCode`, an item count badge (`14 SKUs`), and a capacity utilisation bar (thin progress bar below the label, coloured green/amber/red based on % full). Clicking any node selects it and populates the right panel.
- **Right Panel – Location Detail:** Header showing full location path (e.g., "Main Warehouse → Zone A → Aisle 1 → Shelf 3"). Capacity utilisation ring (like Screen 3 stock ring). Below: a gallery list of all products stored at this location — product image thumbnail, name, SKU, and quantity. A "Move Products" button (allows reassigning products to a different location). An "Edit Location" button opens a side panel form.
- **Add Location Button:** "+" button above the tree to add a new warehouse, zone, aisle, or shelf (a modal dialog with a parent-location dropdown and fields for code/name/capacity).
- **Utilisation Colour Logic:** 0–60% = green, 61–85% = amber, 86–100% = red.
- **Search:** A search input above the tree to filter/highlight matching location codes or names.

---

### Functional Requirements

- Location tree is built from `sa_Location` records grouped by `sa_WarehouseName`, `sa_Zone`, `sa_Aisle`, `sa_Shelf`.
- Item count per location: `CountRows(Filter(sa_Product, sa_LocationId = location.sa_LocationId, sa_IsActive = true))`.
- Capacity utilisation: `Sum(Filter(sa_Product, sa_LocationId = location.sa_LocationId), sa_QuantityOnHand) / location.sa_Capacity`.
- Selecting a tree node sets `varSelectedLocation`; right panel gallery filters `sa_Product` by `sa_LocationId = varSelectedLocation.sa_LocationId`.
- "Move Products" opens a modal where user picks a target location and selects which products to move. On confirm: `Patch` all selected products' `sa_LocationId` to the new location and create `sa_StockMovement` records with `sa_MovementType = "Transfer"`.
- "Edit Location" pre-populates a form with the selected location's fields; saves via `Patch(sa_Location, varSelectedLocation, {...})`.
- "Add Location" dialog uses `Collect(sa_Location, { sa_LocationId: GUID(), ... })`.
- Soft delete for locations: only allowed if `CountRows(Filter(sa_Product, sa_LocationId = ...)) = 0`; otherwise show error "Location has products assigned — reassign before deleting".

---

### Data Bindings

- `sa_Location` → Tree structure, edit and add forms
- `sa_Product` → Item counts per location, right panel product list, utilisation calculation
- `sa_StockMovement` → Transfer records on product move

---

---

## Screen 10 – Reports & Analytics

**Purpose:** Provide pre-built visual reports on inventory health, stock movements, and value trends.

---

### UI Design Requirements

- **Layout:** A report selector sidebar (220px) on the left listing available reports. Main content area on the right renders the selected report.
- **Report List (Left Sidebar):** Vertical list of report names with icons. Active report highlighted with `#EFF6FC` background and `#0F6CBD` left border. Reports grouped into sections: Inventory, Movements, Valuation.
- **Report Toolbar (Top of Main Area):** Report title, a date range picker, optional dimension filters (Category, Supplier, Location), and an "Export" button.
- **Available Reports:**
  - *Inventory Summary* — Table of all products with current stock, reorder level, status, and value. Sortable columns.
  - *Stock Movement Trend* — Line chart showing daily total inbound vs. outbound over a selected date range.
  - *Category Distribution* — Donut/pie chart of inventory value split by category, with a data table below.
  - *Low Stock Report* — Table of products below reorder level with deficit and suggested order quantities.
  - *Stock Valuation* — Bar chart of total inventory value by category. Summary cards for Total Value, Average Value per SKU, Highest Value Item.
  - *Supplier Activity* — Table grouped by supplier showing total units received in the period.
  - *Dead Stock Report* — Products with zero movements in the last 90 days.
- **Chart Styling:** All charts use the app's colour palette. Tooltips show exact values on hover. Legends below or to the right of charts.
- **Data Table Styling:** Matches Screen 5 table styling — sortable headers, alternating rows, export via CSV.

---

### Functional Requirements

- Selected report is tracked by `varSelectedReport` (text key). The main content area conditionally shows the relevant container.
- Date range defaults to "Last 30 Days"; user can change to Last 7 / 30 / 90 Days or a custom range.
- All report data is derived from `sa_Product` and `sa_StockMovement` collections with `Filter()` and `GroupBy()` operations.
- Stock Movement Trend: `GroupBy(Filter(sa_StockMovement, sa_MovementDate >= StartDate, sa_MovementDate <= EndDate), "MovementDate", "sa_MovementType", "DayGroup")` — requires date truncation to day level.
- Dead Stock Report: `Filter(sa_Product, sa_IsActive = true, CountRows(Filter(sa_StockMovement, sa_ProductId = sa_ProductId, sa_MovementDate >= DateAdd(Today(), -90, Days))) = 0)`.
- Export button constructs a CSV string from the currently displayed data table and triggers download.
- Charts use Power Apps Gallery-based charting or the built-in Chart control where available.

---

### Data Bindings

- `sa_Product` → All inventory reports
- `sa_StockMovement` → Movement trend, supplier activity, dead stock reports
- `sa_Category` → Category distribution chart
- `sa_Supplier` → Supplier activity report grouping

---

---

## Screen 11 – Suppliers

**Purpose:** Manage supplier master records used across the app.

---

### UI Design Requirements

- **Layout:** Standard list + detail split. Left: searchable, sortable supplier list (cards or table rows). Right: supplier detail/edit panel (slides in on selection).
- **Supplier List Cards:** Each card shows: Supplier name (Semibold 14px), Contact name (Regular 12px), Phone and Email (with click-to-call / click-to-email links), Lead Time badge ("7 days"), Active/Inactive status pill. A "⋯" overflow menu on each card for Edit and Deactivate.
- **Detail/Edit Panel:** Slides in from the right (280px wide on desktop, full-screen on mobile). Shows all supplier fields in a form layout. "Save" and "Cancel" buttons at the bottom. "Add New Supplier" button at the top of the list.
- **Supplier Stats:** In the detail panel, a mini stats row showing: Total Products Supplied (count), Total Stock Received (sum of units), Average Lead Time (read-only, from `sa_LeadTimeDays`).
- **Active / Inactive Toggle:** Switch control in the detail form. Inactive suppliers are shown with reduced opacity and an "Inactive" badge in the list.

---

### Functional Requirements

- Supplier list gallery filters by a search term across `sa_SupplierName`, `sa_ContactName`, and `sa_Email`.
- Active/Inactive toggle filters via a tab or toggle switch at the top of the list (All / Active / Inactive).
- Selecting a supplier sets `varSelectedSupplier`; the detail panel populates from this variable.
- "Add New Supplier" clears `varSelectedSupplier` and opens the panel in blank create mode; Save calls `Collect(sa_Supplier, {..., sa_SupplierId: GUID()})`.
- Edit mode: `Patch(sa_Supplier, varSelectedSupplier, { edited fields })`.
- Total Products Supplied: `CountRows(Filter(sa_Product, sa_SupplierId = varSelectedSupplier.sa_SupplierId))`.
- Total Units Received: `Sum(Filter(sa_StockMovement, sa_MovementType = "Inbound", LookUp(sa_Product, sa_ProductId = sa_ProductId).sa_SupplierId = varSelectedSupplier.sa_SupplierId), sa_Quantity)`.
- Deactivating a supplier (setting `sa_IsActive = false`) is blocked if the supplier has products with `sa_IsActive = true` assigned — show warning "This supplier has X active products. Deactivate or reassign products first."

---

### Data Bindings

- `sa_Supplier` → List gallery, detail/edit form
- `sa_Product` → Product count per supplier, deactivation guard
- `sa_StockMovement` → Total units received per supplier

---

---

## Screen 12 – Settings & Categories

**Purpose:** Manage application configuration, categories, units of measure, and user preferences.

---

### UI Design Requirements

- **Layout:** Left settings menu (200px) with grouped settings links. Right content area shows the selected settings panel.
- **Settings Groups:** Categories, Units of Measure, Movement Reasons, App Preferences, About.
- **Categories Panel:** A simple list of category records with Name, Description, and a colour swatch picker. Add / Edit / Delete inline. Colour picker shows a palette of 12 preset colours (`#0F6CBD`, `#10893A`, `#CA5010`, `#8764B8`, etc.) — user selects one. Deleting a category is blocked if products are assigned to it.
- **Units of Measure Panel:** Editable list of UoM values (Each, Box, Kg, Litre, Metre, Pallet). Add custom UoM. Reorder by drag-and-drop (or up/down arrows).
- **Movement Reasons Panel:** Editable list of outbound issue reasons. Add, rename, or remove entries.
- **App Preferences Panel:** Form with settings: Default Warehouse (dropdown), Low Stock Notification (toggle), Currency Symbol (text input, default PKR), Date Format (dropdown: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD), Items per page (number input, default 50).
- **About Panel:** App version, build date, developer/organisation name, and a "Check for Updates" button (placeholder).
- **All panels:** Use consistent form styling with `Save` and `Cancel` buttons. Unsaved changes prompt a confirmation before navigating away.

---

### Functional Requirements

- Categories CRUD: `Collect`, `Patch`, and `Remove` operations on `sa_Category`. Delete guard: `CountRows(Filter(sa_Product, sa_CategoryId = cat.sa_CategoryId)) > 0`.
- Colour selection updates `sa_ColorCode` field on the category record; colour is used across the app for category chips.
- UoM and Reason lists are stored in `sa_AppSettings` as delimited strings (e.g., key: `"UnitOfMeasure"`, value: `"Each|Box|Kg|Litre|Metre|Pallet"`).
- App Preferences are saved to `sa_AppSettings` key-value records and loaded into global variables on app start: `varDefaultWarehouse`, `varCurrencySymbol`, `varDateFormat`, `varPageSize`.
- Currency symbol variable `varCurrencySymbol` is used across all currency-displaying screens.
- Date format variable `varDateFormat` is used in `Text(date, varDateFormat)` calls across the app.
- Unsaved changes detection: `varSettingsDirty` flag set on any input change; navigate-away triggers `ConfirmExit` dialog if `varSettingsDirty = true`.

---

### Data Bindings

- `sa_Category` → Categories CRUD panel
- `sa_AppSettings` → UoM, reasons, and app preferences storage
- `sa_Product` → Category delete guard, UoM reference

---

---

## Global Design Tokens

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#0F6CBD` | Buttons, active states, links, progress rings |
| Dark Blue | `#0A4A7C` | Headings, primary text emphasis |
| Light Blue BG | `#EFF6FC` | Active nav items, card highlights |
| Mid Blue | `#CDEAF7` | Hover states, chip backgrounds |
| Success Green | `#10893A` | Positive values, in-stock badges |
| Warning Amber | `#CA5010` | Low stock, warnings |
| Error Red | `#C50F1F` | Out of stock, validation errors |
| Page Background | `#F5F5F5` | App background |
| Card Background | `#FFFFFF` | Cards, panels |
| Border | `#E0E0E0` | Dividers, input borders |
| Text Primary | `#1B1B1B` | Main text |
| Text Secondary | `#6B6B6B` | Labels, sub-text |
| Font | Segoe UI | All text elements |
| Border Radius | 8px | Cards, modals, large elements |
| Border Radius SM | 6px | Inputs, buttons |
| Shadow | `0 2px 8px rgba(0,0,0,0.08)` | Cards and panels |

---

## Global Navigation Rail

The left navigation rail (persistent across all screens) contains the following items in order:

| Icon | Label | Navigates To |
|---|---|---|
| 🏠 | Dashboard | Screen 1 |
| 📦 | Products | Screen 2 |
| 📋 | Stock Log | Screen 5 |
| ⬇️ | Receive | Screen 6 |
| ⬆️ | Issue | Screen 7 |
| 🔔 | Alerts | Screen 8 |
| 🏭 | Locations | Screen 9 |
| 📊 | Reports | Screen 10 |
| 🤝 | Suppliers | Screen 11 |
| ⚙️ | Settings | Screen 12 |

Active item: `#EFF6FC` background fill, `3px #0F6CBD` left border, icon and label in `#0F6CBD`.
Inactive item: transparent background, icon and label in `#6B6B6B`.

---

*Document Version: 1.0 | Generated for Power Apps Development | sa_ prefix conventions align with Dataverse standard table naming.*
