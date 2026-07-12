-- Bliss Reservations Database

create extension if not exists "uuid-ossp";


-- Restaurant Settings

create table restaurants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  opening_time time not null default '08:00',
  closing_time time not null default '15:00',
  booking_window_days integer not null default 14,
  late_hold_minutes integer not null default 10,
  default_turn_minutes integer not null default 90,
  created_at timestamp default now()
);


-- Tables

create table restaurant_tables (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  table_name text not null,
  seats integer not null,
  priority integer not null,
  active boolean default true
);


-- Reservations

create table reservations (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id),
  table_id uuid references restaurant_tables(id),

  guest_name text not null,
  phone text not null,
  email text,

  party_size integer not null,
  reservation_time timestamp not null,
  duration_minutes integer default 90,

  status text default 'confirmed',

  notes text,

  created_at timestamp default now()
);


-- Waitlist

create table waitlist (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id),

  guest_name text not null,
  phone text,
  party_size integer not null,

  requested_time timestamp,

  status text default 'waiting',

  created_at timestamp default now()
);


-- Owner Users

create table owner_users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  created_at timestamp default now()
);



-- Insert Bliss

insert into restaurants (
  name
)
values (
  'Bliss Caffeine Bar'
);



-- Insert Bliss Tables

insert into restaurant_tables
(
restaurant_id,
table_name,
seats,
priority
)

select
id,
'T1',
3,
10
from restaurants
where name='Bliss Caffeine Bar';


insert into restaurant_tables
(
restaurant_id,
table_name,
seats,
priority
)

select id, x.name, x.seats, x.priority
from restaurants,
(
values
('T2',2,1),
('T3',2,2),
('T4',2,3),
('T5',2,4),
('T6',2,5),
('T7',2,6),
('T8',3,11),
('T9',2,7),
('T10',3,12),
('T10B',3,13),
('T11',5,20),
('T12',5,21),
('Bar 13',2,30),
('Bar 14',2,31),
('Bar 15',2,32),
('Bar 16',2,33),
('BT17',1,40),
('BT18',1,41),
('BT19',1,42),
('BT20',1,43),
('Pillar Table',6,50)
) as x(name,seats,priority)
where restaurants.name='Bliss Caffeine Bar';
