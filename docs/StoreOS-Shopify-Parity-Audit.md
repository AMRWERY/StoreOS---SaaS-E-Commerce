# StoreOS — Existing Features, Shopify-Parity Gaps & Implementation Roadmap

> **Repository:** [AMRWERY/StoreOS---SaaS-E-Commerce](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce)  
> **Branch reviewed:** `main`  
> **Audit date:** 12 November 2026  
> **Target:** Build a multi-tenant SaaS commerce platform with broad Shopify-like capabilities—not only a Shopify-looking dashboard.  
> **Revision 2 (12 November 2026):** Added sections 3.20–3.26 (gaps not covered in revision 1), extra database entities, engineering rules 15–18, extra roadmap and acceptance items, and the parity scorecard in section 10. Everything added in revision 2 is marked **[R2]**.

---

## 1. Executive summary

StoreOS already has a substantial **Nuxt/Vue frontend foundation**: a merchant-facing marketing site, dashboard screens, reusable UI components, a visual storefront/page-builder interface, storefront section renderers, bilingual English/Arabic UI, and several commerce-related modules.

However, the current repository is still primarily a **frontend prototype with demo data and incomplete server scaffolding**. The most important missing part is the operational commerce platform behind the screens:

- There is no dedicated production backend application or documented database implementation in the current repository tree.
- Merchant authentication and plan state are not backed by real authentication and authorization services.
- Product, order, customer, inventory, coupon, analytics, and settings data are largely local demo state.
- Existing Nuxt server API handlers for products, orders, shipping, and webhooks are stubs.
- The page, section, and theme persistence composables are stubs.
- There is no separate customer-facing storefront application with a complete shopping and checkout journey.
- Payment, shipping, subscription billing, public API, and webhook screens are mostly presentation/demo interfaces rather than complete integrations.
- The current `apps/admin` is documented as an older near-copy of the merchant dashboard, not a StoreOS super-admin/control-plane application.
- The repository documentation says no test framework or test suite is configured; the `lint` command runs Nuxt type checking.

**Conclusion:** Keep and improve the existing frontend. Do not spend the next major development cycle adding more dashboard screens. First establish a secure, persistent, multi-tenant commerce backend and complete one real purchase-to-fulfillment journey.

### Status legend used in this document

| Status | Meaning |
|---|---|
| **UI exists** | A page, component, editor, or interaction is present in the repository. This does not prove that it is connected to a backend. |
| **Demo / mocked** | The visible interface uses local sample data, hardcoded values, in-memory state, or placeholder actions. |
| **Scaffold / partial** | Some routes, types, components, or handlers exist, but the full business workflow is not implemented. |
| **Missing** | No meaningful implementation was identified in the current repository tree. |
| **Production-ready** | A complete, tested, secure, deployed workflow. Do not assume this status merely because a page exists. |

**Important:** This is a source-code and repository-structure audit. It is not a runtime certification. No local build, database deployment, payment transaction, security penetration test, or end-to-end purchase was performed as part of this audit.

---

## 2. What already exists in the GitHub repository

This section records what is present in the current `main` branch. Where the feature is only a screen or demo, that limitation is called out explicitly.

### 2.1 Monorepo and application architecture

**Status: UI / architecture foundation exists; backend architecture is missing.**

The repository uses:

- pnpm workspaces.
- Turborepo task orchestration.
- Nuxt 4 applications.
- Vue 3 and TypeScript.
- Shared Nuxt layers for core configuration and UI.
- Tailwind CSS-based styling.

Current high-level structure:

```text
StoreOS/
├── apps/
│   ├── merchant/              # Marketing site, merchant dashboard, builder UI
│   └── admin/                 # Older near-copy of merchant dashboard
├── layers/
│   ├── core/                  # Shared Nuxt config, i18n, composables and plugins
│   └── ui/                    # Shared UI components and design system
├── rules/                     # Design and SEO rules
├── public/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── CLAUDE.md
└── ROADMAP.md
```

The root scripts include merchant/admin development, build, lint/typecheck, and clean tasks. The repository does **not** currently contain dedicated `apps/api`, `apps/storefront`, or `apps/platform-admin` applications, nor a shared backend/database package.

Useful files:

- [Root package.json](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/package.json)
- [pnpm workspace](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/pnpm-workspace.yaml)
- [Project guidance — CLAUDE.md](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/CLAUDE.md)

### 2.2 Merchant marketing and public information pages

**Status: UI exists.**

The merchant application includes public/marketing content pages such as:

- Home / landing page.
- About.
- Blog.
- Careers.
- Community.
- Contact.
- Documentation.
- Help center.
- Integrations.
- Marketing.
- Messaging.
- Roadmap.
- Shipping information.
- Privacy policy.
- Terms.

These are StoreOS marketing/information pages. They are not the same thing as a merchant's generated customer storefront.

### 2.3 Merchant authentication and onboarding interfaces

**Status: UI exists; real identity/authentication is missing.**

Present routes and components include:

- Registration interface.
- Authentication entry page.
- Add-first-product onboarding route.
- First-product onboarding form components.
- Onboarding-related composables.
- Guest/demo preview access.
- Trial/free/starter/growth/enterprise plan concepts.

The current `useAuth` implementation is not a production identity system. It manages application state in the frontend; a cookie is used for guest-preview continuity, but that is not equivalent to authenticated user sessions, persistent accounts, or server-side authorization.

Missing from the real auth workflow: password verification, email verification, reset-password flow, session issuance/rotation/revocation, OAuth callbacks, account lifecycle, and authorization checks on backend requests.

Useful files:

- [Merchant auth composable](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/apps/merchant/composables/useAuth.ts)
- [Merchant auth pages](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/apps/merchant/pages/auth)
- [Merchant onboarding composable](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/apps/merchant/composables/useOnboarding.ts)

### 2.4 Merchant dashboard modules

**Status: UI exists across the modules; many stores use demo data.**

| Module | Existing screens/components | Current limitation to address |
|---|---|---|
| Dashboard home | KPIs/stat cards, revenue chart, recent orders, top products, low-stock alerts | Replace sample metrics and sample records with tenant-scoped live data. |
| Products | Product list, product cards, status filters, search/filter bar, add/update product form | Complete persistence, variants/options, media, bulk actions, import/export, collection assignment, publishing and validation. |
| Orders | Orders list/table, status filters, batch actions, details sidebar, order form | Implement actual order lifecycle, payment state, fulfillment, refund, cancellation, returns, and transaction-safe updates. |
| Customers | Customer list/table, filters, stats, customer details, create panel | Implement customer identity, account pages, addresses, consent, segmentation and persistent activity/history. |
| Inventory | Inventory table, summary cards, adjustment modal, movement history, low-stock states | Implement stock ledger, inventory locations, reservations, transfers, purchase orders and concurrency-safe stock updates. |
| Coupons | Coupon list/table, stats and create panel | Implement server-side rule evaluation, automatic discounts, eligibility, combination rules, usage limits and gift cards. |
| Analytics | KPI grid, revenue chart, order-status chart, category revenue, sales-velocity insight, top-performance tables, create panel | Connect to real event/order data, define metric semantics, add attribution, date comparisons and reporting exports. |
| Notifications | Notification center, configuration cards, sidebar and command bar | Implement real notification preferences, event triggers, delivery providers, retries, templates and logs. |
| Store information | Brand profile, contact details, localization, network/domain-related settings | Persist settings and implement domain verification, routing, SSL and locale/market behavior. |
| Payment gateways | UI for COD, Stripe, Paymob and Vodafone Cash | Implement provider connection, secrets, checkout/payment sessions, webhook verification, refunds, reconciliation and statuses. |
| Shipping/logistics | Carrier selection, shipping zones, metrics, configuration cards | Implement live carrier APIs, checkout shipping rates, labels, shipments, tracking and returns. |
| Staff and permissions | Active members, role matrix and staff settings | Implement invitations, roles, permissions, membership enforcement, staff lifecycle and audit logs. |
| Billing and plans | Active plan, feature access, payment method, usage and billing history UI | Implement subscription provider, invoices, renewal, proration, failed payments and server-side entitlements. |
| User profile | General profile, preferences, security, sessions and danger-zone UI | Implement real profile changes, password/security actions, session revocation and account deletion. |
| API and webhooks | API key presentation and webhook event list | Replace demo key/endpoints with API credentials, scopes, real subscriptions, delivery attempts and retry tooling. |

Primary source directories:

- [Merchant dashboard pages](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/apps/merchant/pages/dashboard)
- [Merchant dashboard components](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/apps/merchant/components/dashboard)
- [Merchant Pinia stores](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/apps/merchant/stores)
- [Merchant types](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/apps/merchant/types)

### 2.5 Storefront/page-builder frontend

**Status: Significant editor UI exists; data persistence and live storefront publishing are incomplete.**

Existing builder capabilities/components include:

- Builder shell and top bar.
- Left, center/preview, and right settings panels.
- Page list and page settings.
- Add-section modal and section template picker.
- Section selection, editing, and settings panels.
- Theme settings and theme controls.
- Navbar and footer settings.
- Image, color, font, text, textarea, range, toggle, select, repeater, link, category, and product builder inputs.
- Device preview controls.
- Publish modal and preview route.
- Undo/redo/history-related composables.
- Section templates and default builder settings.

Existing storefront section renderer components include:

1. Hero banner.
2. Hero slideshow.
3. Hero split.
4. Hero video.
5. Full banner.
6. Split banner.
7. Product grid.
8. Product carousel.
9. Featured product.
10. Categories grid.
11. Rich text.
12. Image and text.
13. Image gallery.
14. Logo bar.
15. Countdown timer.
16. Testimonials.
17. Trust badges.
18. FAQ.
19. Newsletter form.
20. Contact form.
21. Video embed.
22. Spacer.
23. Divider.
24. Custom HTML.

The builder UI and section renderers are an important asset. However, the existence of a preview or publish button does not prove that the theme/pages are saved to a database, published to a public domain, versioned, cached, or served to customers.

The following composables are explicitly stubs in the current source:

- `usePageSections()` — returns empty results/null for list/create/update/remove/reorder.
- `useStorePages()` — returns empty results/null for list/getBySlug/create/update/remove.
- `useStoreTheme()` — only holds a local nullable theme reference.

Useful source directories:

- [Builder components](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/apps/merchant/components/builder)
- [Storefront section renderers](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/apps/merchant/components/storefront/sections)
- [Builder pages](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/apps/merchant/pages/dashboard/builder)
- [Builder store](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/apps/merchant/stores/builder.ts)
- [Store page composable](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/apps/merchant/composables/useStorePages.ts)
- [Page section composable](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/apps/merchant/composables/usePageSections.ts)
- [Theme composable](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/apps/merchant/composables/useStoreTheme.ts)

### 2.6 Shared UI and design system

**Status: UI exists.**

The shared `layers/ui` layer includes reusable components such as:

- Buttons, inputs, selects, textareas and form wrappers.
- Tables and pagination.
- Search input and product card.
- Dialog, overlay, side panel and dropdown menu.
- Tabs, accordion, breadcrumbs and back button.
- Date picker, color input, range input, file upload and OTP input.
- Progress bar, loading spinner, stat card and alert banner.
- Theme toggle and switch controls.

The shared layer also contains Tailwind configuration, CSS tokens and transition styles.

Source: [Shared UI components](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/layers/ui/components)

### 2.7 Internationalization and theme preferences

**Status: UI foundation exists.**

The current repository includes:

- English (`en`) and Arabic (`ar`) translation files.
- RTL support for Arabic.
- Locale-prefixed routing configuration.
- Dark/light application theme infrastructure.
- Shared SEO helpers and metadata handling.
- Shared theme and navigation-related composables/plugins.

This is a good starting point for internationalization. It does not yet provide full market-specific selling rules such as separate catalogs, regional price lists, currency conversion, tax/duty configuration, localized domains, or per-market shipping.

Source directories:

- [Core layer](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/layers/core)
- [Locale files](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/layers/core/i18n/locales)
- [UI layer](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/tree/main/layers/ui)

### 2.8 Current roadmap already written in the repository

**Status: Roadmap exists; roadmap items must not be treated as completed features.**

The current [ROADMAP.md](https://github.com/AMRWERY/StoreOS---SaaS-E-Commerce/blob/main/ROADMAP.md) outlines:

| Phase | Stated roadmap scope |
|---|---|
| Phase 1 — MVP | Store setup wizard, products without variants, basic inventory, manual order management, COD, WhatsApp merchant notification. |
| Phase 2 — Core features | Variants, Stripe/Paymob, coupons, customers, basic analytics, Bosta shipping, merchant mobile app. |
| Phase 3 — Growth | Customer mobile app, advanced/AI analytics, multi-location inventory, Aramex/J&T, abandoned-cart recovery, email marketing, custom domains. |
| Phase 4 — Scale | White label, public API, B2B wholesale, POS integration, marketplace mode. |

The repository also includes draft Starter, Growth and Enterprise pricing tiers. Pricing, included limits, and transaction fees should be treated as business proposals until billing and entitlement enforcement are implemented.

### 2.9 Current implementation reality

The following items are confirmed by the current source/documentation and should be considered blockers:

| Item | Current state | Evidence |
|---|---|---|
| Backend application | No dedicated Express/API workspace in the current tree | Root workspace currently includes `apps/*` and `layers/*`; `apps/merchant` and `apps/admin` are Nuxt applications. |
| Database/schema | No current database migration/schema directory is present in the current `main` tree | Current `CLAUDE.md` states that there is no database schema in the repository. Earlier SQL migration files are not part of the current tree. |
| Authentication | Frontend state / demo behavior, not production auth | `apps/merchant/composables/useAuth.ts`; project guidance describes auth as in-memory. |
| Product API | Stub | `apps/merchant/server/api/products/index.ts` returns `{}`. |
| Order API | Stub | `apps/merchant/server/api/orders/index.ts` returns `{}`. |
| Shipping API | Stub | `apps/merchant/server/api/shipping/index.ts` returns `{}`. |
| Webhook API | Stub | `apps/merchant/server/api/webhooks/index.ts` returns `{}`. |
| Builder persistence | Stub | `usePageSections`, `useStorePages`, and `useStoreTheme` do not perform API/database operations. |
| Domain data | Demo data | Pinia stores include hardcoded sample records. |
| Provider connections | UI/placeholder | Payment and shipping screens include disconnected/demo states and placeholder values. |
| API credentials | Demo presentation | The API settings page constructs a demo key and hardcoded webhook examples. |
| Automated tests | Not configured | Current `CLAUDE.md` says no test framework or test suite is present. |
| Linting | Type checking only | App `lint` scripts call `nuxt typecheck`; there is no ESLint configuration described. |
| README | Still starter content | Root `README.md` is the default Nuxt Minimal Starter README. |
| Platform admin | Not implemented as a distinct control plane | Current `CLAUDE.md` describes `apps/admin` as a stale near-duplicate of the merchant dashboard. |

**Architecture note:** An earlier version of the repository contained draft Supabase migrations, but those files are not present in the current audited `main` tree. Do not base new implementation work on that old schema as if it were currently installed or active. Design and add the database schema deliberately as part of the backend foundation.

---

## 3. What is missing to reach broad Shopify-like capability

Shopify parity is a moving target. StoreOS does not need to reproduce every Shopify feature on day one, but it should build the same major capability areas over time. A feature should only be marked complete after the real workflow, security rules, persistence, tests, and operational behavior exist.

### 3.1 SaaS platform foundation and tenant isolation

**Priority: P0 — must come first.**

Missing:

- Real Node.js + Express backend application.
- PostgreSQL database and migration strategy.
- Database access layer and transaction handling.
- Tenant/store context resolution on every authenticated request.
- Users, stores, store memberships, invitations and ownership transfer.
- Server-side role-based access control (RBAC) and permission checks.
- Secure session handling, password reset, email verification and optional OAuth.
- Request validation, typed errors and centralized error handling.
- Rate limiting, abuse prevention and bot protection where appropriate.
- Audit logs for sensitive merchant/admin operations.
- File/object storage for product images, videos, theme assets and documents.
- Background jobs and scheduled tasks.
- Event/outbox pattern for reliable notifications, webhooks and integrations.
- Secrets management and secure configuration per environment.
- Logging, metrics, tracing, alerting, backups and restore procedures.
- Data export, account deletion, retention and privacy workflows.
- Automated unit, integration, security and end-to-end tests.

**Non-negotiable rule:** A merchant must never be able to access another merchant's data by changing a `storeId`, URL parameter, request body, or API query. Tenant isolation must be enforced by trusted server/database logic, not by hiding UI elements.

### 3.2 Product catalog and merchandising

**Priority: P1 — core commerce.**

Existing product list/form UI should be connected to real catalog services.

Missing capabilities:

- Full product create/read/update/archive/delete lifecycle.
- Product options (size, color, material, etc.) and variant combinations.
- Variant-specific SKU, barcode, price, compare-at price, cost, weight and stock.
- Product media library with uploads, image transformations, ordering and alt text.
- Categories and collections (manual and rule-based/automated).
- Product tags, vendors/brands, product types and product status.
- Product publishing to individual sales channels and markets.
- Scheduled publishing and unpublishing.
- SEO title, description, canonical URL, social image and structured data.
- Product metafields/custom attributes and custom data definitions.
- Bulk editing, bulk archive, bulk price update and bulk channel publishing.
- CSV import/export with validation and error reports.
- Product search, faceted filtering and sorting.
- Related products, recommendations and merchandising rules.
- Product bundles and kits.
- Product reviews/ratings integration or native review capability.
- Digital products/download delivery where supported.
- Product subscription/recurring purchase options if in the target market.

### 3.3 Storefront runtime and theme platform

**Priority: P1 — required for merchants to sell online.**

Keep the current builder UI and section renderers, but build the real storefront runtime around them.

Missing capabilities:

- Dedicated customer-facing storefront application/runtime.
- Resolve store by subdomain or custom domain.
- Public pages rendered from published store/page/theme data.
- Product detail pages and collection/category listing pages.
- Search results pages and filtering/sorting.
- Navigation/menu management.
- Cart drawer and cart page.
- Customer account entry points.
- Responsive, accessible and SEO-friendly storefront layouts.
- Theme installation, theme library and starter themes.
- Theme settings schema and validation.
- Save drafts separately from the published theme.
- Theme versions, publish history, rollback and preview links.
- Safe custom code/custom CSS support with sandboxing and validation.
- Global content: announcement bar, header, footer, favicon, social links and policies.
- Store pages (About, Contact, FAQ, Shipping, Returns, custom landing pages).
- Redirect management and 404 handling.
- Caching, CDN/media delivery and cache invalidation after publishing.
- Storefront performance budgets and Core Web Vitals monitoring.
- SEO sitemap, robots rules, canonical links, hreflang and structured data.
- Analytics/pixel consent and customer privacy controls.

**Important distinction:** `components/storefront/sections/*` are reusable renderer components. They are not, by themselves, a published storefront application.

### 3.4 Cart and checkout

**Priority: P1 — required for the first real sale.**

Missing capabilities:

- Persistent carts for guests and logged-in customers.
- Cart line updates, quantity changes and item removal.
- Cart merging after customer login.
- Server-side product/variant price validation.
- Inventory availability and reservation checks.
- Discount and gift-card application.
- Shipping address and delivery method selection.
- Shipping rate calculation.
- Tax and duty calculation appropriate to the merchant's market.
- Checkout session lifecycle and expiry.
- Payment method selection and payment processing.
- Guest checkout and authenticated checkout.
- Checkout validation and fraud/risk checks.
- Idempotent order creation to prevent duplicate orders.
- Order confirmation page and email/SMS/WhatsApp notifications.
- Order status/tracking page.
- Abandoned cart and abandoned checkout tracking/recovery.
- Checkout extension/customization points for future integrations.

Prices, discounts, taxes, shipping, and totals must be recalculated on the server. Never trust client-submitted totals.

### 3.5 Payments, transactions and financial operations

**Priority: P1 — required for online payments; COD still needs order lifecycle support.**

The current screens mention COD, Stripe, Paymob and Vodafone Cash. The missing work is the real provider lifecycle:

- Payment-provider adapter interface.
- Merchant/provider account connection and disconnection.
- Secure encrypted storage for credentials and tokens.
- Sandbox/test mode and live mode.
- Payment intent/session creation.
- Redirect/hosted checkout or supported payment UI integration.
- Signature verification for provider callbacks/webhooks.
- Idempotent processing of payment events.
- Payment authorization, capture, void and failure flows where supported.
- Full and partial refunds.
- Transaction ledger and payment history.
- Reconciliation of local orders with provider transactions.
- Payout and settlement information where provider APIs expose it.
- Payment failure recovery and customer retry flow.
- Chargeback/dispute records and merchant notifications.
- Multi-currency support and currency-safe money representation.
- Fraud/risk rules and suspicious transaction review.

For an Egypt-first launch, prioritize local provider support and COD, but design the adapter boundary so that additional providers can be added without rewriting checkout/order logic.

### 3.6 Orders, fulfillment, returns and exchanges

**Priority: P1 — core merchant operations.**

Existing orders table/detail UI needs a real domain model and workflows.

Missing capabilities:

- Draft orders and manual order creation.
- Order editing with recalculation and audit history.
- Reliable order status state machine.
- Payment status separate from fulfillment status.
- Order timeline and internal notes.
- Partial fulfillment and multi-package shipments.
- Fulfillment orders and location assignment.
- Pick/pack workflows and packing slips.
- Shipping label purchase/printing.
- Tracking number and tracking-event synchronization.
- Partial and full cancellation.
- Partial and full refunds.
- Return merchandise authorization (RMA).
- Exchanges and replacement orders.
- Restock rules on cancel/return/refund.
- Bulk fulfillment and batch operations.
- Fulfillment-service/3PL integrations.
- Customer notifications at key order milestones.
- Order export and accounting integrations.

### 3.7 Inventory and supply chain

**Priority: P1/P2 — start simple, then scale.**

Current inventory UI includes adjustments and movement-history concepts, but requires a real stock ledger.

Missing capabilities:

- Inventory locations/warehouses/branches.
- Available, on-hand, committed, incoming and reserved quantities.
- Variant-level inventory.
- Atomic inventory reservations during checkout.
- Stock decrement/release on payment, failure, cancel and return according to business rules.
- Prevent or deliberately configure overselling.
- Inventory adjustments with reason and actor.
- Stock transfers between locations.
- Purchase orders and supplier records.
- Receive incoming stock.
- Cycle counts and stocktakes.
- Low-stock thresholds and alert rules.
- Inventory valuation/cost reporting.
- Barcode scanning and label support.
- Inventory imports/exports.
- Multi-location fulfillment routing.

### 3.8 Shipping, delivery and fulfillment integrations

**Priority: P1/P2.**

Missing capabilities:

- Shipping profiles and product-based shipping rules.
- Shipping zones and region-level configuration.
- Flat, weight-based, price-based and carrier-calculated rates.
- Free-shipping thresholds and conditional rates.
- Pickup/local delivery options where applicable.
- Carrier adapter architecture.
- Carrier account connection and credentials.
- Rate quote API at checkout.
- Shipment creation and label generation.
- Pickup scheduling and manifests where supported.
- Tracking updates/webhooks and delivery exceptions.
- Return labels and reverse logistics.
- Shipping insurance and declared value where available.
- Multi-package and split shipment support.
- Shipping cost/revenue reporting.

Potential Egypt/region-first integrations can include Bosta and other locally relevant providers. Add international providers only after the integration abstraction is stable.

### 3.9 Customers, identity and CRM

**Priority: P1/P2.**

Missing capabilities:

- Customer registration, login and account recovery.
- Customer profile and address book.
- Order history and order detail pages.
- Guest-to-registered customer identity merging.
- Marketing consent and communication preferences.
- Customer tags and saved notes.
- Dynamic customer segments based on behavior and orders.
- Purchase history, lifetime value and cohort metrics.
- Customer import/export and duplicate detection.
- Saved carts/wishlists (if included in product scope).
- Store credit and customer balance.
- Privacy data export, correction and deletion workflows.
- B2B company contacts and buyer permissions.

### 3.10 Discounts, promotions and gift cards

**Priority: P2.**

Current coupon UI is a foundation only. Add:

- Percentage and fixed discounts.
- Free shipping discounts.
- Buy X Get Y promotions.
- Automatic discounts and code-based discounts.
- Product, variant, collection and order eligibility.
- Customer/segment eligibility.
- Minimum/maximum purchase rules.
- Start/end scheduling and timezone handling.
- Total usage and per-customer usage limits.
- Discount combinations/stacking policy.
- Usage tracking and redemption history.
- Gift card issuance, balance, redemption and expiry policy.
- Promotion performance reporting.
- Server-side validation in cart/checkout.

### 3.11 Subscription billing and SaaS monetization

**Priority: P0/P1 — critical to operating StoreOS as a SaaS business.**

The current UI and `PLAN_CONFIGS` define plan ideas and feature gates. A real SaaS subscription engine is missing:

- Subscription provider integration.
- Checkout to start a StoreOS subscription.
- Free trial start/end and trial conversion.
- Monthly/annual billing cycles.
- Upgrade/downgrade flow.
- Proration and plan-change effective dates.
- Subscription renewal and invoice generation.
- Payment method update.
- Failed payment retries and dunning.
- Cancellation, pause, resume and reactivation.
- Server-side plan entitlement checks.
- Usage metering and limit enforcement.
- Order/product/staff/domain/API usage records.
- Billing history and downloadable invoices.
- Taxes/VAT on StoreOS subscription invoices where applicable.
- Transaction-fee calculation and reporting if StoreOS charges a platform fee.
- Enterprise contracts/custom limits.

Do not rely on frontend feature gating for billing enforcement. The API must enforce the merchant's actual subscription entitlements.

### 3.12 Platform super-admin / control plane

**Priority: P0/P2 — needed to operate the SaaS.**

`apps/admin` is documented as an older near-copy of the merchant dashboard. StoreOS needs a distinct operator console with:

- Platform-wide merchant/store directory.
- Search and inspect merchant accounts.
- Store activation, suspension and reactivation.
- Subscription and billing overview.
- Plan/entitlement administration.
- Usage/limits monitoring.
- Platform-wide order/volume/GMV and revenue metrics.
- Support impersonation with explicit authorization, reason and audit trail (optional, highly controlled).
- Merchant support tickets and internal notes.
- Abuse/fraud/security review queue.
- Integration/provider health dashboard.
- Webhook/job failure monitoring.
- Feature flags and staged rollouts.
- Platform configuration and announcements.
- Admin staff roles, permissions and audit logs.

### 3.13 Domains, localization and international Markets

**Priority: P2/P3.**

The existing English/Arabic UI and RTL support are useful but do not equal international commerce Markets.

Missing capabilities:

- StoreOS-managed subdomains for every merchant.
- Custom domain connection and ownership verification.
- DNS verification and SSL certificate provisioning/renewal.
- Domain routing to the correct tenant.
- Domain changes, redirects and canonical domain selection.
- Per-market languages and localized content.
- Per-market currency and exchange-rate policy.
- Manual/localized price lists and rounding rules.
- Product availability per market.
- Per-market theme/content customization.
- Market-specific shipping and payment methods.
- Tax/VAT/duties configuration and display.
- International SEO, hreflang and domain/subfolder strategy.
- Country/region availability and localization rules.

### 3.14 Marketing, automation and customer retention

**Priority: P2/P3.**

The marketing and messaging pages exist as interfaces/content, but the operating capabilities are missing or incomplete:

- Abandoned-cart recovery.
- Abandoned-checkout recovery.
- Email campaign builder and delivery integrations.
- SMS/WhatsApp campaigns where consent and provider rules allow.
- Marketing automation/workflow builder.
- Welcome, post-purchase, win-back and replenishment flows.
- Customer segmentation for campaigns.
- Discount/coupon campaign management.
- Newsletter subscriber management and consent.
- Campaign attribution and conversion measurement.
- Product recommendations and upsells/cross-sells.
- Loyalty points, rewards and referrals (optional growth features).
- Campaign analytics and delivery logs.

### 3.15 Analytics, reporting and data exports

**Priority: P2.**

Current analytics UI should be driven by a consistent event and reporting model.

Missing capabilities:

- Accurate orders, gross sales, net sales, refunds, discounts, taxes and shipping metrics.
- Date range comparisons and timezone-aware reporting.
- Product, collection, channel, market and location reports.
- Conversion funnel and checkout abandonment analysis.
- Customer cohort and retention reports.
- Traffic source and marketing attribution.
- Campaign performance.
- Inventory aging and sell-through.
- Profit/margin reporting based on cost data.
- Custom report builder.
- Scheduled reports and exports.
- Event collection and consent-aware pixels.
- Data warehouse/export pipeline for larger merchants.

### 3.16 POS and omnichannel sales

**Priority: P3.**

Missing capabilities:

- POS web/mobile application.
- Register/session and cash drawer workflows.
- In-person cart and checkout.
- Barcode scanner and receipt printer support.
- In-person cash/card/payment integrations.
- Offline mode and safe synchronization.
- Store staff PIN/permissions.
- In-person refunds and exchanges.
- Shared customer/order history across online and retail.
- Synchronized inventory by retail location.
- Sales-channel publishing and channel-specific pricing/inventory.

### 3.17 B2B / wholesale commerce

**Priority: P3.**

Missing capabilities:

- Company accounts and company locations.
- Multiple buyers per company.
- Buyer roles and purchasing permissions.
- Wholesale catalogs and customer-specific pricing.
- Quantity breaks and volume pricing.
- Minimum/maximum order rules.
- Payment terms (for example, net terms) and invoice workflows.
- Draft orders/quotes for wholesale buyers.
- Tax-exemption documentation where relevant.
- Reordering and bulk order forms.
- B2B-specific storefront and checkout conditions.
- ERP/accounting integrations.

### 3.18 Public API, apps, extensions and developer ecosystem

**Priority: P3.**

The existing API/webhook settings screen is a demo presentation. A real platform needs:

- Public REST and/or GraphQL API strategy (choose deliberately and document it).
- API versioning and deprecation policy.
- Authentication and OAuth for third-party apps.
- API keys/tokens with scoped permissions.
- Rate limiting, quotas and usage tracking.
- Pagination, filtering and consistent error responses.
- Webhook subscription management.
- Signed webhook deliveries.
- Retries, exponential backoff, replay and delivery logs.
- App installation/uninstallation lifecycle.
- App permissions and merchant consent.
- Extension points for admin, storefront, checkout and POS.
- Developer documentation and a sandbox/test store environment.
- App review/security process and integration directory/marketplace.

### 3.19 Advanced commerce and optional parity modules

**Priority: P3/P4 — build based on customer demand.**

Potential later modules include:

- Product bundles and subscriptions.
- Pre-orders and backorders.
- Waitlists and back-in-stock alerts.
- Gift cards and store credit.
- Loyalty and referrals.
- Product reviews and Q&A.
- Digital goods.
- Booking/rental products.
- Multi-vendor marketplace functionality (a different business model from normal Shopify store building).
- White-label platform branding.
- AI-assisted product descriptions, merchandising and insights.
- ERP, PIM, accounting and 3PL integrations.

---

### 3.20 [R2] Checkout extensibility and conversion features

**Priority: P2/P3.** Shopify's checkout is a major conversion advantage, and section 3.4 covers only the basic checkout.

Missing capabilities:

- Accelerated/one-click checkout with saved customer addresses and payment methods (Shop Pay-style).
- Express wallets (Apple Pay / Google Pay) where the payment provider supports them.
- Buy-now-pay-later and installment options relevant to the target market.
- Checkout branding and custom fields (delivery notes, gift message, tax ID).
- Order bumps, in-checkout upsells and post-purchase offers.
- Programmable rules for discounts, shipping and payment-method availability, run in a sandboxed extension runtime (comparable to Shopify Functions).
- Address autocomplete and validation, including Arabic address formats.
- Payment links, buy buttons, QR codes and embeddable cart for selling outside the storefront.
- Waiting room/queue and capacity protection for flash sales.

### 3.21 [R2] Content, search and discovery

**Priority: P2.**

Missing capabilities:

- Per-store blog engine (articles, authors, tags, SEO fields, scheduled publishing).
- Central files/media library shared by products, pages and themes.
- Structured content types and custom data definitions (comparable to metaobjects/metafields) usable in the builder.
- Predictive search with typo tolerance, synonyms and filters.
- **Arabic-aware search:** normalize alef/hamza variants, ta marbuta, diacritics and Arabic-Indic digits so that Arabic queries match product data.
- Collection filters and facets (price, options, availability, tags).
- Field-level translation of product, collection and page content (for example `name_ar` / `name_en`) with a translation-management UI. The current i18n work translates the interface, not merchant content.
- Policy page generators (privacy, refund, shipping, terms) with merchant-editable templates.

### 3.22 [R2] Sales channels, feeds and messaging inbox

**Priority: P2/P3.**

Missing capabilities:

- Product feeds and catalog sync for Google Merchant Center, Meta (Facebook/Instagram), TikTok and WhatsApp catalog.
- Server-side conversion events and consent-aware pixels for each channel.
- Marketplace listing sync (for example Noon, Jumia, Amazon) with order and inventory sync.
- Social-commerce inbox: WhatsApp, Messenger and Instagram DMs with one-click conversion of a conversation into a draft order.
- Per-channel product publishing, pricing and inventory rules (extends section 3.16).

### 3.23 [R2] Merchant operations tooling and automation

**Priority: P2/P3.**

Missing capabilities:

- **Workflow automation engine** (trigger → condition → action), comparable to Shopify Flow. Examples: tag high-risk orders, notify on low stock, hold orders with unverified phone numbers.
- Saved views, bulk spreadsheet-style editor, global search, activity feed and undo for destructive actions.
- Merchant mobile app with push notifications for new orders (the roadmap mentions Capacitor).
- Store setup guide and launch-readiness checklist (domain, payment, shipping, policies, test order), industry starter templates and optional sample data.
- Store migration/import from Shopify, WooCommerce and regional platforms (products, customers, orders, redirects).
- **Organization/multi-store hierarchy.** The Growth and Enterprise plans promise 3 and unlimited stores, so an `organization` entity above `store` is needed for shared staff, billing and cross-store reports.
- Merchant support surface: help center search, in-app chat, status banner and ticket history.
- Merchant finance: payout dashboard, platform-fee statements, invoices for StoreOS fees and optional merchant financing.

### 3.24 [R2] Egypt/MENA-specific commerce (COD-first market)

**Priority: P1 for COD items, P2 for the rest.** The roadmap makes COD the MVP payment method, so the COD lifecycle needs its own design. Verify all legal and tax points with a local advisor.

- **COD order lifecycle:** order confirmation by call/WhatsApp/SMS, failed delivery attempts, refused parcels, return-to-origin (RTO) tracking, and payment status separate from fulfillment status.
- **COD cash reconciliation:** courier collection records, remittance/settlement batches, COD fees, short-payment and dispute handling.
- **COD risk controls:** repeat-refuser phone/address flags, order velocity limits, optional deposit for high-risk orders, merchant blocklists.
- Local payment methods: Paymob, Fawry, InstaPay, mobile wallets, local installment providers.
- Egyptian addressing: governorate → city → area selection, landmark field, optional map pin, phone normalization for `+20` formats.
- Tax/compliance review: VAT, Egyptian Tax Authority e-invoice/e-receipt requirements where they apply to merchants or to StoreOS fees, and the Egyptian Personal Data Protection Law.
- **WhatsApp Business Platform:** template approval, customer opt-in, order-status messages and conversation-cost tracking.
- Arabic everywhere, not only the UI: RTL in storefront themes, emails, invoices/PDFs, shipping labels and packing slips; Arabic fonts; Arabic URL slug handling.
- If expanding to the Gulf: local currencies (SAR/AED), regional payment and BNPL providers, and Saudi e-invoicing requirements.

### 3.25 [R2] Trust, security, compliance and platform reliability

**Priority: P0/P1 for items marked (P0).**

- **(P0) Sanitize merchant-supplied code.** The builder includes a *Custom HTML* section; custom HTML/CSS/JS in a storefront is an XSS and session-theft risk. Use strict CSP, a sanitizer or sandboxed iframe, and serve merchant storefronts from a different origin than the merchant dashboard.
- **(P0)** Keep card data out of StoreOS scope (hosted fields or redirect to the provider) to minimize PCI DSS obligations.
- 2FA/MFA and passkeys for merchants and staff, login alerts, device management; SSO/SAML and IP allowlists for Enterprise.
- Merchant KYC/KYB, prohibited-goods policy, fake-store and phishing detection, takedown (IP/abuse) process.
- Bot protection and CAPTCHA on login, checkout and forms; WAF/DDoS protection; per-tenant resource limits to prevent noisy neighbors.
- Email deliverability: SPF/DKIM/DMARC setup per merchant sending domain, bounce and complaint handling, suppression lists.
- Encryption and minimization of customer PII (phone, address); retention schedule; subprocessors list and data-processing agreement.
- Accessibility: WCAG 2.2 AA targets for the storefront and checkout.
- Reliability: public status page, SLA targets, incident process, RPO/RTO targets, load testing before flash sales and launches, data-residency decision.
- Merchant-facing legal documents: terms of service, acceptable-use policy, refund policy for StoreOS subscriptions.

### 3.26 [R2] Theme and developer experience

**Priority: P3, but design the data model early.**

- Theme schema/templating approach (section schemas, blocks, presets) and a documented contract between the builder and the storefront renderer.
- Theme packaging, versioning and update path for merchants who customized a theme.
- Theme CLI/local development and a test-store sandbox for developers.
- App blocks/embeds so third-party apps can add storefront widgets without editing theme code.

---

## 4. Recommended technical architecture

The existing Nuxt apps and shared UI should remain the frontend foundation. Build the commerce backend as a separate service so that merchant dashboard, storefront, admin, mobile apps, and external integrations can all use the same business logic.

### 4.1 Recommended monorepo target

```text
StoreOS/
├── apps/
│   ├── merchant/             # Existing Nuxt merchant dashboard and builder
│   ├── storefront/           # New Nuxt customer-facing multi-tenant stores
│   ├── platform-admin/       # New StoreOS super-admin/control plane
│   └── api/                  # New Node.js + Express API
│
├── packages/
│   ├── database/             # PostgreSQL schema, migrations, seed tools
│   ├── domain/               # Commerce entities and business rules
│   ├── validation/           # Shared request/input validation schemas
│   ├── contracts/            # API DTOs and event contracts
│   ├── payments/             # Provider adapters
│   ├── shipping/             # Carrier adapters
│   ├── notifications/        # Email/SMS/WhatsApp provider adapters
│   ├── shared/               # Shared TypeScript types/utilities
│   └── config/               # Shared lint/TypeScript/test configuration
│
├── layers/
│   ├── core/                 # Existing shared Nuxt core layer
│   └── ui/                   # Existing shared Nuxt UI layer
│
├── tests/
│   ├── integration/
│   ├── e2e/
│   └── security/
│
├── rules/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

**Recommendation:** Refactor or replace the current `apps/admin` deliberately. Do not mistake a second merchant dashboard copy for a platform operator application. Keep the existing `apps/merchant` UI and evolve it in place where sensible.

### 4.2 Backend responsibilities

The Express API should own:

- Authentication and session verification.
- Tenant/store resolution and authorization.
- Product/catalog operations.
- Cart and checkout calculations.
- Order creation and lifecycle transitions.
- Inventory reservations and movements.
- Payment and refund operations.
- Shipping and fulfillment workflows.
- Customer account and CRM operations.
- Subscription billing and entitlement checks.
- Builder page/theme persistence and publishing.
- Public API and webhook delivery.
- Audit events and background job scheduling.

The browser should never be trusted to decide the final price, tax, shipping fee, discount eligibility, payment status, available stock, plan entitlement, or store ownership.

### 4.3 Database domains to design

No active database schema is present in the current audited repository tree. Design the schema before wiring screens to the API.

Recommended domain groups and likely entities:

| Domain | Candidate entities |
|---|---|
| Identity and tenancy | `users`, `sessions`, `stores`, `store_memberships`, `roles`, `permissions`, `invitations` |
| SaaS billing | `plans`, `plan_features`, `subscriptions`, `subscription_items`, `invoices`, `billing_events`, `usage_records` |
| Catalog | `products`, `product_options`, `product_variants`, `collections`, `collection_products`, `product_media`, `product_metafields`, `product_publications` |
| Storefront | `themes`, `theme_versions`, `theme_settings`, `store_pages`, `page_sections`, `navigation_menus`, `domains`, `sales_channels` |
| Customers | `customers`, `customer_accounts`, `customer_addresses`, `customer_tags`, `customer_segments`, `marketing_consents` |
| Cart and checkout | `carts`, `cart_items`, `checkout_sessions`, `checkout_lines`, `checkout_addresses`, `checkout_discounts` |
| Orders | `orders`, `order_items`, `order_adjustments`, `order_events`, `order_notes`, `order_transactions` |
| Payments | `payment_providers`, `provider_connections`, `payment_intents`, `transactions`, `refunds`, `disputes`, `payouts` |
| Inventory | `locations`, `inventory_levels`, `inventory_reservations`, `inventory_movements`, `stock_transfers`, `purchase_orders`, `suppliers` |
| Shipping | `shipping_profiles`, `shipping_zones`, `shipping_rates`, `carriers`, `shipments`, `shipment_items`, `tracking_events`, `shipping_labels` |
| Promotions | `discounts`, `discount_rules`, `discount_redemptions`, `gift_cards`, `gift_card_transactions` |
| Returns | `returns`, `return_items`, `exchanges`, `restock_events` |
| Marketing | `campaigns`, `automation_workflows`, `automation_runs`, `abandoned_carts`, `abandoned_checkouts`, `subscribers` |
| Integrations | `apps`, `app_installations`, `api_credentials`, `webhook_subscriptions`, `webhook_deliveries`, `integration_events` |
| B2B | `companies`, `company_locations`, `company_members`, `catalogs`, `price_lists`, `payment_terms` |
| Platform operations | `audit_logs`, `feature_flags`, `support_tickets`, `admin_actions`, `background_jobs` |
| [R2] Organizations and trust | `organizations`, `organization_members`, `kyc_verifications`, `email_sending_domains`, `blocked_contacts` |
| [R2] Content and localization | `files`, `metaobject_definitions`, `metaobjects`, `blog_articles`, `translations`, `saved_views` |
| [R2] Automation and channels | `workflow_rules`, `workflow_runs`, `channel_connections`, `product_feeds`, `conversation_threads` |
| [R2] COD operations | `cod_confirmations`, `delivery_attempts`, `cod_remittances`, `rto_events`, `cod_risk_scores` |

These are design candidates, not a final migration specification. Normalize and constrain the schema based on the chosen database and workflows.

### 4.4 Engineering rules that should be established early

1. **Tenant isolation:** Every tenant-owned resource must be scoped to the authenticated store context; enforce it server-side and test cross-tenant access.
2. **Money:** Use exact decimal/minor-unit representations with an explicit currency. Never use JavaScript floating-point arithmetic for financial totals.
3. **Inventory:** Use database transactions/locking or another concurrency-safe strategy for reservations and stock changes.
4. **Idempotency:** Payment callbacks, checkout submissions, order creation, and webhook handlers must safely handle duplicate requests/events.
5. **Payments:** Verify provider webhook signatures; never trust a browser redirect as proof of payment.
6. **Secrets:** Encrypt provider credentials at rest; reveal them only when necessary; never commit real keys or log secrets.
7. **Authorization:** Enforce resource permissions on every API route, not just navigation/middleware in Nuxt.
8. **Auditability:** Record important changes to orders, payments, refunds, inventory, users, permissions and platform operations.
9. **Background work:** Use durable jobs for email, WhatsApp, webhook delivery, scheduled campaigns and reconciliation.
10. **Observability:** Add structured logs, metrics, request IDs, traces, error monitoring and provider-health monitoring.
11. **Data safety:** Backups, restore drills, data export/deletion and retention policies are part of the product—not optional cleanup work.
12. **API contracts:** Validate request and response payloads; version public APIs and use stable event contracts.
13. **Testing:** Add unit tests for business rules, integration tests against a real test database, and E2E tests for critical customer/merchant journeys.
14. **Performance:** Paginate large datasets server-side; use indexes, caching and CDN delivery where appropriate.
15. **[R2] Untrusted content:** Treat all merchant-provided HTML, CSS and script as hostile; sanitize or sandbox it, apply strict CSP, and never serve it from the dashboard origin.
16. **[R2] Time and locale:** Store timestamps in UTC, keep a store time zone for reporting and scheduling, and normalize phone numbers and Arabic text before storing or searching.
17. **[R2] Safe migrations:** Use backward-compatible, zero-downtime database migrations and feature flags for staged rollouts.
18. **[R2] Outbound messaging:** Route every email/SMS/WhatsApp message through one consent-checking service with templates, rate limits and delivery logs.

---

## 5. Prioritized implementation roadmap

Build a complete working vertical slice before trying to reproduce every advanced Shopify module.

### Phase 0 — Architecture and foundations

**Goal:** Turn the current frontend prototype into a secure, persistent multi-tenant application foundation.

- [ ] Confirm Node.js/Express API application and runtime strategy.
- [ ] Select PostgreSQL hosting and database migration tooling.
- [ ] Create `apps/api` and shared `packages/database` / `packages/contracts`.
- [ ] Design the initial identity, stores, memberships, catalog, cart, order and payment schema.
- [ ] Implement real user registration, login, password reset and email verification.
- [ ] Implement sessions/cookies and logout/session revocation.
- [ ] Implement store creation and owner membership.
- [ ] Implement tenant resolution and server-side authorization.
- [ ] Implement validation, error handling, rate limiting and audit logging.
- [ ] Add file storage for product and theme media.
- [ ] Add test framework, CI checks, database integration tests and tenant-isolation tests.
- [ ] Replace mock authentication in the merchant app with real API calls.
- [ ] **[R2]** Decide the `organization` → `store` hierarchy now, because plan limits (3 / unlimited stores) depend on it.
- [ ] **[R2]** Sanitize or sandbox the *Custom HTML* section and serve stores from a separate origin (see 3.25).

**Exit criteria:** A merchant can register, sign in, create a store, and access only the resources belonging to that store. Cross-tenant access tests pass.

### Phase 1 — First real commerce journey

**Goal:** A merchant can create a product and receive a real customer order.

- [ ] Persist products and product images.
- [ ] Implement categories/collections and basic product variants.
- [ ] Connect product dashboard to the API.
- [ ] Build the new customer-facing storefront application.
- [ ] Resolve stores using StoreOS subdomains.
- [ ] Render homepage, collection pages and product pages.
- [ ] Implement cart persistence and cart validation.
- [ ] Implement checkout with server-side totals.
- [ ] Support COD and one online payment provider suitable for the launch market.
- [ ] Implement verified payment callbacks and idempotency.
- [ ] Create orders and line-item snapshots transactionally.
- [ ] Implement stock reservation/decrement rules.
- [ ] Connect order dashboard to the API.
- [ ] Send order confirmation to the merchant and customer.
- [ ] Add a basic order status/tracking page.
- [ ] **[R2]** Add COD confirmation step (call/WhatsApp/SMS) and `cod_risk` checks before an order becomes fulfillable.
- [ ] **[R2]** Add Egyptian address fields (governorate/city/area) and phone normalization to checkout.
- [ ] **[R2]** Make order emails, invoices and labels RTL-correct for Arabic.

**Exit criteria:** A customer can visit a merchant's public store, buy a product, complete COD or online payment, and the merchant sees the persisted order with correct totals and stock.

### Phase 2 — Store operations and customer experience

**Goal:** Merchants can manage their day-to-day business without editing data manually.

- [ ] Complete order editing, cancellation and refund workflows.
- [ ] Implement real customer profiles, addresses and order history.
- [ ] Implement inventory ledger, low-stock alerts and one-location inventory.
- [ ] Add shipping zones and one real carrier integration.
- [ ] Generate shipment/tracking records and notify customers.
- [ ] Implement discounts/coupons with server-side validation.
- [ ] Persist storefront pages, sections, themes and navigation.
- [ ] Implement draft/publish states, preview links and rollback/version history.
- [ ] Add notification templates and delivery logs.
- [ ] Add operational analytics and CSV exports.
- [ ] Implement returns and partial/full refunds.
- [ ] **[R2]** Add COD remittance reconciliation with the courier, RTO tracking and failed-delivery handling.
- [ ] **[R2]** Add WhatsApp Business templates, opt-in tracking and order-status messages.
- [ ] **[R2]** Add store setup checklist, starter templates and a CSV/Shopify product importer.
- [ ] **[R2]** Add Arabic-aware product search and field-level content translation.

**Exit criteria:** A merchant can manage products, customers, stock, orders, discounts, shipments and basic reporting through persistent workflows.

### Phase 3 — SaaS business operations

**Goal:** StoreOS can onboard and monetize multiple merchants as a SaaS business.

- [ ] Implement subscription checkout and recurring billing.
- [ ] Implement trial lifecycle, invoices, renewals, upgrades, downgrades and cancellation.
- [ ] Enforce plans, feature entitlements and usage limits in the API.
- [ ] Implement StoreOS platform admin/control plane.
- [ ] Add merchant suspension/reactivation and support tooling.
- [ ] Add custom domains, domain verification and SSL automation.
- [ ] Implement staff invitations and server-side roles/permissions.
- [ ] Add background jobs, webhooks, retry queues and provider monitoring.
- [ ] Add data export, deletion and privacy workflows.
- [ ] **[R2]** Add 2FA/MFA, merchant KYC/KYB and fake-store/abuse review.
- [ ] **[R2]** Add public status page, SLA/RPO/RTO targets and load testing.
- [ ] **[R2]** Add email-domain authentication (SPF/DKIM/DMARC) and bounce handling.
- [ ] **[R2]** Review Egyptian tax/e-invoicing obligations with a local advisor.
- [ ] **[R2]** Implement organizations with multi-store membership and shared billing.

**Exit criteria:** StoreOS can safely onboard, bill, support and operate many isolated stores.

### Phase 4 — Growth and advanced commerce

**Goal:** Expand from a core store builder into a broader commerce platform.

- [ ] Multi-location inventory and stock transfers.
- [ ] More payment and shipping providers.
- [ ] Abandoned-cart and abandoned-checkout recovery.
- [ ] Email/SMS/WhatsApp marketing integrations.
- [ ] Marketing automation and customer segments.
- [ ] Advanced analytics and attribution.
- [ ] Gift cards, store credit and loyalty.
- [ ] Product bundles, preorders and backorders.
- [ ] International Markets: currencies, languages, catalogs, domains and tax handling.
- [ ] Public API with versioning, scopes and rate limits.
- [ ] Developer app installation and webhook subscriptions.
- [ ] **[R2]** Workflow automation engine (trigger → condition → action).
- [ ] **[R2]** Product feeds and pixels/conversion events for Google, Meta and TikTok; WhatsApp catalog.
- [ ] **[R2]** Checkout extensibility, saved payment methods and BNPL options.
- [ ] **[R2]** Blog engine, files library and structured content types.

### Phase 5 — Shopify-like ecosystem

**Goal:** Add advanced channels and enterprise workflows based on customer demand.

- [ ] POS application and retail hardware integrations.
- [ ] B2B/wholesale company accounts, price lists and payment terms.
- [ ] ERP, PIM, accounting and 3PL integrations.
- [ ] App/extension platform and integration marketplace.
- [ ] Theme marketplace and theme distribution/update system.
- [ ] White-label offering.
- [ ] Marketplace/multi-vendor mode only if StoreOS deliberately chooses that separate business model.
- [ ] AI-assisted merchant workflows and insights.
- [ ] **[R2]** Theme packaging/versioning, theme CLI and test-store sandbox.
- [ ] **[R2]** SSO/SAML and IP allowlists for Enterprise.
- [ ] **[R2]** Marketplace listing sync (for example Noon, Jumia) and social-commerce inbox.

---

## 6. First-release acceptance checklist

Do not call the first release a real commerce MVP until all the following work end to end.

### Merchant onboarding

- [ ] User can register with real credentials.
- [ ] Email verification and password recovery work.
- [ ] User can create a store with a unique StoreOS subdomain.
- [ ] Store owner membership is persisted.
- [ ] Authenticated user can only access their own store.

### Product and storefront

- [ ] Merchant can create, edit, archive and publish products.
- [ ] Product images are uploaded to durable object storage.
- [ ] Product pricing and stock persist after refresh/login from another device.
- [ ] Public storefront resolves the right store from its hostname.
- [ ] Customer can browse collections and product details.
- [ ] Storefront renders the currently published theme/page version.

### Checkout and order creation

- [ ] Cart survives page refresh and validates current product/variant state.
- [ ] Server calculates product totals, discounts, shipping and tax.
- [ ] Customer can complete COD or a supported online payment.
- [ ] Payment status changes only after a verified provider event/result.
- [ ] Duplicate payment/order requests do not create duplicate orders.
- [ ] Order and line-item snapshots are persisted correctly.
- [ ] Inventory cannot be oversold by concurrent checkout requests unless overselling is explicitly enabled.
- [ ] Customer receives an order confirmation.
- [ ] **[R2]** COD orders can be confirmed, marked refused/returned and reconciled with the courier's remittance.
- [ ] **[R2]** Governorate/city/area and Egyptian phone formats validate correctly in checkout.

### Merchant operations

- [ ] Merchant can view and update order status.
- [ ] Merchant can fulfill an order and record tracking.
- [ ] Customer can view order status/tracking.
- [ ] Merchant can cancel/refund with correct inventory/payment effects.
- [ ] All important order/payment/inventory changes are auditable.

### Security and reliability

- [ ] Cross-tenant access tests pass for all critical entities.
- [ ] API validates all inputs and enforces permissions.
- [ ] Webhook signatures and idempotency are tested.
- [ ] Secrets are not stored in frontend code or committed to Git.
- [ ] Database backup and restore procedures are tested.
- [ ] Critical flows have integration and E2E tests.
- [ ] Errors, failed jobs and provider webhook failures are observable.
- [ ] **[R2]** An XSS test proves that Custom HTML/CSS cannot read dashboard sessions or other tenants' data.
- [ ] **[R2]** Merchants and staff can enable 2FA, and sensitive actions require recent re-authentication.

---

## 7. What should be done next in the existing codebase

Recommended order of work in the current repository:

1. **Keep `apps/merchant` and the shared UI layer.** They contain the strongest existing frontend value.
2. **Do not add more dashboard mock screens yet.** Replace existing hardcoded Pinia data with typed API services as backend endpoints become available.
3. **Create `apps/api` using Node.js + Express.** Keep business logic out of Vue components and Nuxt-only frontend state.
4. **Create a real database schema and migrations.** The current audited branch has no active schema/migration directory.
5. **Implement identity and tenant security before sensitive commerce endpoints.** This prevents costly rewrites later.
6. **Build a separate `apps/storefront`.** Reuse the current section renderers where appropriate, but make the public store a real runtime independent of the merchant editor/preview.
7. **Complete one vertical slice:** register → create store → create product → publish → add to cart → checkout → payment/COD → order → fulfill.
8. **Convert the existing feature screens progressively.** Products, orders, inventory, customers and coupons should use real backend services.
9. **Make billing and platform administration real.** StoreOS itself needs secure merchant lifecycle and subscription operations.
10. **Expand only after observing merchant demand.** POS, B2B, app marketplace, marketplace mode and AI capabilities should be sequenced based on validated demand and operational capacity.

---

## 8. Shopify reference documentation

Use Shopify's official documentation as a **capability reference**, not as an instruction to copy proprietary implementation details. These sources show the breadth of the platform areas StoreOS is comparing itself against.

- [Shopify APIs, libraries and tools](https://shopify.dev/docs/api) — Admin API, Storefront API, authentication, API versioning, limits, webhooks/events, Functions and extension surfaces.
- [Shopify APIs for apps](https://shopify.dev/docs/apps/build/apis) — which APIs run on a backend, storefront, or customer-facing client; app authentication and webhooks.
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront/latest) — buyer-facing commerce primitives for custom storefronts and carts.
- [Shopify products](https://help.shopify.com/en/manual/products) — product management, pricing, inventory, variants, bulk editing and CSV workflows.
- [Shopify collections](https://help.shopify.com/en/manual/products/collections) — manual and automated product groupings.
- [Shopify order management and fulfillment](https://help.shopify.com/en/manual/fulfillment) — shipping settings, fulfillment, labels, order edits, refunds and cancellations.
- [Shopify Markets](https://help.shopify.com/en/manual/markets) — market-specific currency, language, pricing, product availability, domains, taxes and shipping.
- [Shopify POS](https://help.shopify.com/en/manual/sell-in-person/shopify-pos) — in-person checkout, retail locations, synchronized orders/inventory and hardware.
- [Shopify B2B](https://help.shopify.com/en/manual/b2b) — companies, buyers, catalogs, pricing, payment/shipping conditions and wholesale workflows.
- [Shopify abandoned checkouts](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/abandoned-checkouts) — recovery workflows and reporting.

---

## 9. Audit limitations and important notes

- The audit is based on the public GitHub `main` branch as inspected on **12 November 2026**.
- File presence was used to identify existing UI, routes, stores, composables and server handlers. A component or route was not assumed to be production-functional merely because it exists.
- The project's own `CLAUDE.md` was used to cross-check architecture notes, mocked data, stub endpoints, and test coverage.
- This audit did not run the application, deploy the database, execute payment flows, validate DNS/domain setup, or perform penetration testing.
- Shopify is a mature and continuously evolving platform. “Exactly like Shopify” is not a finite checklist; feature availability also varies by Shopify plan, region, sales channel and app ecosystem. StoreOS should prioritize the core commerce journey and then expand according to target-market needs.
- Update this file whenever a feature moves from UI/demo/scaffold to a completed, tested production workflow.
- **[R2]** Items added in revision 2 come from general knowledge of Shopify's feature set and common Egypt/MENA commerce practice; they were not derived from additional source inspection. Legal, tax and payment-provider requirements must be verified with qualified professionals and current provider documentation.

---

**Suggested rule for future updates:** For every feature in this document, track four separate things: **UI**, **API/business logic**, **database/persistence**, and **tests/operations**. Only mark a feature as complete when all four are implemented and validated for the relevant use case.

---

## 10. [R2] Parity scorecard

Rough, qualitative summary based on the statuses recorded in this document. It is not a measured percentage and was not re-verified against the code.

| Area | What Shopify-level looks like | StoreOS today | Gap | First milestone |
|---|---|---|---|---|
| Backend, database, tenancy | Multi-tenant, durable, secure | Missing | Critical | Phase 0 exit criteria |
| Authentication and staff roles | Real accounts, roles, 2FA | UI / demo | Critical | Phase 0 |
| Product catalog and variants | Options, variants, media, bulk, CSV | UI / demo | Large | Phase 1 |
| Storefront runtime | Public themed store per tenant | Builder UI + section renderers only | Critical | Phase 1 |
| Cart and checkout | Server-priced, fast, extensible | Missing | Critical | Phase 1 |
| Payments | Multiple providers, refunds, reconciliation | UI / placeholder | Critical | Phase 1 (COD + 1 provider) |
| Orders and fulfillment | Full lifecycle, returns, exchanges | UI / demo | Large | Phase 1–2 |
| Inventory | Ledger, locations, reservations | UI / demo | Large | Phase 2 |
| Shipping | Rates, labels, tracking | UI / stub | Large | Phase 2 |
| Discounts and gift cards | Rule engine, stacking, usage limits | UI / demo | Large | Phase 2 |
| Customers and CRM | Accounts, segments, privacy tools | UI / demo | Large | Phase 2 |
| SaaS billing and entitlements | Subscriptions, trials, dunning | UI / demo | Critical for business | Phase 3 |
| Platform admin / control plane | Operator console, support, flags | Not implemented (stale copy) | Large | Phase 3 |
| Domains and SSL | Custom domains, automatic certificates | UI only | Large | Phase 3 |
| Markets / international | Per-market currency, catalog, tax | EN/AR UI only | Large | Phase 4 |
| Marketing and automation | Email/SMS/WhatsApp, flows, abandoned cart | UI / content pages | Large | Phase 4 |
| Analytics | Accurate reports, attribution | UI / demo | Medium–large | Phase 2–4 |
| Channels and feeds | Google, Meta, TikTok, marketplaces | Missing | Large | Phase 4 |
| Public API, apps, webhooks | Versioned API, OAuth, app store | UI / demo | Large | Phase 4–5 |
| POS and B2B | In-person and wholesale | Missing | Optional / demand-driven | Phase 5 |
| Egypt/MENA COD operations | Not a Shopify strength; a StoreOS differentiator | Missing | High value | Phase 1–2 |
| Security, compliance, reliability | PCI scope, 2FA, status, backups | Missing | Critical | Phase 0 and 3 |
| Tests and CI | Automated unit/integration/E2E | Not configured | Critical | Phase 0 |
