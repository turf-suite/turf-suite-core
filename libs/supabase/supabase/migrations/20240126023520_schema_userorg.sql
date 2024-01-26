create table if not exists
  public.organizations (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    avatar text null,
    name text not null,
    constraint organizations_pkey primary key (id)
  ) tablespace pg_default;

create table if not exists
  public.profiles (
    id uuid not null,
    birthday date null,
    first_name text null,
    last_name text null,
    middle_name text null default 'NULL'::text,
    phone text null,
    avatar text null,
    organization uuid not null,
    constraint profiles_pkey primary key (id),
    constraint profiles_phone_key unique (phone),
    constraint profiles_organization_fkey foreign key (organization) references organizations (id) on delete cascade,
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
  ) tablespace pg_default;