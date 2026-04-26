-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products Table
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price_cents integer not null,
  stock integer not null default 0,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders Table
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  stripe_session_id text unique,
  status text not null default 'pending',
  total_cents integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items Table
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) not null,
  quantity integer not null,
  price_cents integer not null
);

-- RLS (Row Level Security)
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Policies for products (Anyone can view)
create policy "Anyone can view products" on products
  for select using (true);

-- Policies for orders (Users can view their own orders)
create policy "Users can view their own orders" on orders
  for select using (auth.uid() = user_id);

-- Policies for order_items (Users can view items of their own orders)
create policy "Users can view their own order items" on order_items
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Function to handle order fulfillment (to be called by webhook or service role)
-- We'll allow the service role to do everything for now as the webhook will use it.
create policy "Service role can do everything on orders" on orders
  using (true) with check (true);

create policy "Service role can do everything on order_items" on order_items
  using (true) with check (true);

-- Function to decrement stock
create or replace function decrement_stock(product_id uuid, amount integer)
returns void as $$
begin
  update products
  set stock = stock - amount
  where id = product_id;
end;
$$ language plpgsql;
