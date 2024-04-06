create table if not exists public.boards (
  id big serial,
  project_id serial not null,
  team_id serial not null,
  constraint boards_pkey primary key (id),
  constraint projects_fkey foreign key (project_id) references public.projects (id) on delete cascade,
  constraint team_fkey foreign key (team_id) references public.teams (id) on delete cascade
) tablespace pg_default;

create table if not exists public.board_states (
  board_id big serial not null,
  name text not null,
  ordering number not null,
  is_completion_state boolean not null,
  is_cancelled_state boolean not null,
  constraint board_fkey foreign key (board_id) references public.boards (id) on delete cascade,
  constraint board_states_pkey primary key (board_id, name)
) tablespace pg_default;
