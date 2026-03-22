-- =====================
-- STORES & USERS
-- =====================
CREATE TABLE stores (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,  -- storeos.com/stores/my-store
  logo_url        TEXT,
  description     TEXT,
  currency        TEXT DEFAULT 'EGP',
  country         TEXT DEFAULT 'EG',
  phone           TEXT,
  email           TEXT,
  address         TEXT,
  plan            TEXT DEFAULT 'starter',
  custom_domain   TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE store_members (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id  UUID REFERENCES stores(id) ON DELETE CASCADE,
  user_id   UUID REFERENCES auth.users(id),
  role      TEXT DEFAULT 'staff',  -- owner | manager | staff
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- PRODUCTS
-- =====================
CREATE TABLE categories (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id  UUID REFERENCES stores(id) ON DELETE CASCADE,
  name      TEXT NOT NULL,
  slug      TEXT NOT NULL,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id)
);

CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id        UUID REFERENCES stores(id) ON DELETE CASCADE,
  category_id     UUID REFERENCES categories(id),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL,
  description     TEXT,
  price           NUMERIC(12,2) NOT NULL,
  compare_price   NUMERIC(12,2),  -- السعر قبل الخصم
  cost_price      NUMERIC(12,2),  -- تكلفة الشراء
  sku             TEXT,
  barcode         TEXT,
  weight          NUMERIC(8,2),
  is_active       BOOLEAN DEFAULT TRUE,
  track_inventory BOOLEAN DEFAULT TRUE,
  images          JSONB DEFAULT '[]',
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_variants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,   -- "أحمر - L"
  sku         TEXT,
  price       NUMERIC(12,2),
  stock       INT DEFAULT 0,
  options     JSONB  -- {color: "red", size: "L"}
);

CREATE TABLE inventory_movements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID REFERENCES products(id),
  variant_id  UUID REFERENCES product_variants(id),
  store_id    UUID REFERENCES stores(id),
  type        TEXT,  -- purchase | sale | adjustment | return
  quantity    INT NOT NULL,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- CUSTOMERS
-- =====================
CREATE TABLE customers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id      UUID REFERENCES stores(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  email         TEXT,
  phone         TEXT,
  address       JSONB,  -- {street, city, governorate, country}
  total_orders  INT DEFAULT 0,
  total_spent   NUMERIC(12,2) DEFAULT 0,
  notes         TEXT,
  tags          TEXT[],
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ORDERS
-- =====================
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id          UUID REFERENCES stores(id) ON DELETE CASCADE,
  customer_id       UUID REFERENCES customers(id),
  order_number      TEXT NOT NULL,
  status            TEXT DEFAULT 'pending',
                    -- pending | confirmed | processing |
                    -- shipped | delivered | cancelled | refunded
  payment_status    TEXT DEFAULT 'unpaid',  -- unpaid | paid | refunded
  payment_method    TEXT,
  subtotal          NUMERIC(12,2) DEFAULT 0,
  discount_amount   NUMERIC(12,2) DEFAULT 0,
  shipping_cost     NUMERIC(12,2) DEFAULT 0,
  total             NUMERIC(12,2) DEFAULT 0,
  coupon_code       TEXT,
  shipping_address  JSONB,
  tracking_number   TEXT,
  shipping_carrier  TEXT,  -- aramex | bosta | jnt
  notes             TEXT,
  confirmed_at      TIMESTAMPTZ,
  shipped_at        TIMESTAMPTZ,
  delivered_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id),
  variant_id    UUID REFERENCES product_variants(id),
  product_name  TEXT NOT NULL,  -- snapshot وقت الأوردر
  variant_name  TEXT,
  quantity      INT NOT NULL,
  unit_price    NUMERIC(12,2) NOT NULL,
  total         NUMERIC(12,2) NOT NULL
);

-- =====================
-- COUPONS
-- =====================
CREATE TABLE coupons (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id        UUID REFERENCES stores(id) ON DELETE CASCADE,
  code            TEXT NOT NULL,
  type            TEXT,  -- percentage | fixed
  value           NUMERIC(10,2) NOT NULL,
  min_order       NUMERIC(12,2),
  max_uses        INT,
  used_count      INT DEFAULT 0,
  expires_at      TIMESTAMPTZ,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SHIPPING ZONES
-- =====================
CREATE TABLE shipping_zones (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id    UUID REFERENCES stores(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  regions     TEXT[],   -- ["cairo", "giza"] أو ["all"]
  price       NUMERIC(10,2) NOT NULL,
  free_above  NUMERIC(12,2)  -- مجاني فوق كذا
);

-- =====================
-- INDEXES
-- =====================
CREATE INDEX idx_stores_slug                      ON stores(slug);
CREATE INDEX idx_store_members_store_id           ON store_members(store_id);
CREATE INDEX idx_store_members_user_id            ON store_members(user_id);
CREATE INDEX idx_categories_store_id              ON categories(store_id);
CREATE INDEX idx_products_store_id                ON products(store_id);
CREATE INDEX idx_products_category_id             ON products(category_id);
CREATE INDEX idx_product_variants_product_id      ON product_variants(product_id);
CREATE INDEX idx_inventory_movements_product_id   ON inventory_movements(product_id);
CREATE INDEX idx_inventory_movements_store_id     ON inventory_movements(store_id);
CREATE INDEX idx_customers_store_id               ON customers(store_id);
CREATE INDEX idx_orders_store_id                  ON orders(store_id);
CREATE INDEX idx_orders_customer_id               ON orders(customer_id);
CREATE INDEX idx_orders_status                    ON orders(status);
CREATE INDEX idx_order_items_order_id             ON order_items(order_id);
CREATE INDEX idx_coupons_store_id                 ON coupons(store_id);
CREATE INDEX idx_coupons_code                     ON coupons(code);
CREATE INDEX idx_shipping_zones_store_id          ON shipping_zones(store_id);