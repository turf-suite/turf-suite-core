create table if not exists public.teams (
    id serial not null,
    name text not null,
    org_id uuid not null,
    avatar text,
    unique (org_id, name),
    constraint teams_org_fkey foreign key (org_id) references public.organizations (id) on delete cascade,
    constraint teams_pkey primary key (id)
) tablespace pg_default;

create table if not exists public.team_members (
    member_id uuid not null,
    org_id uuid not null,
    team_id serial not null,
    constraint member_id_fkey foreign key (member_id) references public.profiles (id) on delete update,
    constraint org_id_fkey foreign key (org_id) references public.organizations (id) on delete cascade,
    constraint team_id_fkey foreign key (team_id) references public.teams (id) on delete cascade,
    constraint team_members_pkey primary key (member_id, org_id, team_id)
) tablespace pg_default;

create table if not exists public.projects (
    id serial not null,
    name text not null,
    description text not null,
    avatar text,
    constraint projects_pkey primary key (id),
    constraint org_id_fkey foreign key (org_id) references public.organizations (id) on delete cascade,
    unique (org_id, name)
) tablespace pg_default;

create table if not exists public.project_teams (
    project_id serial not null,
    team_id serial not null,
    constraint project_id_fkey foreign key (project_id) references public.projects (id) on delete cascade,
    constraint team_id_fkey foreign key (team_id) references public.teams (id) on delete cascade,
    constraint project_teams_pkey primary key (team_id, project_id)
) tablespace pg_default;

create table if not exists public.kanban_projects (
    constraint kanban_projects_fkey foreign key (id) references public.projects (id) on delete cascade
) inherits (public.projects) tablespace pg_default;

create table if not exists public.agile_projects (
    scrum_master uuid,
    constraint scrum_master_fkey foreign key (scrum_master) references public.profiles (id),
    constraint agile_projects_fkey foreign key (id) references public.projects (id) on delete cascade
) inherits (public.projects) tablespace pg_default;

create table if not exists public.waterfall_projects (
    phase_count int,
    constraint waterfall_projects_fkey foreign key (id) references public.projects (id) on delete cascade
) inherits (public.projects) tablespace pg_default;

