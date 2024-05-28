create table if not exists public.boards (
  board_name text not null,
  project_id serial not null,
  team_id serial not null,
  constraint boards_pkey primary key (project_id, board_name),
  constraint projects_fkey foreign key (project_id) references public.projects (id) on delete cascade,
  constraint team_fkey foreign key (team_id) references public.teams (id) on delete cascade
) tablespace pg_default;

create table if not exists public.board_states (
  board_name text,
  project_id serial,
  name text not null,
  ordering smallint not null,
  is_completion_state boolean not null,
  is_cancelled_state boolean not null,
  constraint board_fkey foreign key (board_name, project_id) references public.boards (board_name, project_id) on delete cascade,
  constraint board_states_pkey primary key (name, board_name, project_id)
) tablespace pg_default;

create table if not exists public.board_task_state_transitions (
  board_name text,
  project_id serial,
  to_state_name text,
  from_state_name text,
  constraint task_state_transitions_pkey primary key (board_name, project_id, from_state_name, to_state_name),
  constraint from_fkey foreign key (board_name, project_id, from_state_name) references public.board_states (board_name, project_id, name),
  constraint to_fkey foreign key (board_name, project_id, to_state_name) references public.board_states (board_name, project_id, name),
  constraint different_states check (from_state_name <> to_state_name),
  constraint unique_transition unique(board_name, project_id, to_state_name, from_state_name)
) tablespace pg_default;
