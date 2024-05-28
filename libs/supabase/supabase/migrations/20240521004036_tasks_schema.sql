create table public.tasks (
  task_id numeric,
  project_id serial,
  board_name text,
  task_title text,
  task_description text,
  assignee uuid,
  due_date date,
  hours_estimated integer,
  hours_completed integer,
  constraint tasks_pkey primary key (task_id, project_id, board_name),
  constraint board_fkey foreign key (board_name, project_id)
    references public.boards (board_name, project_id) on delete cascade,
  constraint assignee_fkey foreign key (assignee)
    references public.profiles (user_id)
) tablespace pg_default;

create table public.parent_child_tasks (
  parent_task_project_id serial,
  parent_task_board_name text,
  parent_task_id numeric,
  child_task_project_id serial,
  child_task_board_name text,
  child_task_id numeric,
  constraint parent_task_fkey foreign key (parent_task_id, parent_task_board_name, parent_task_project_id)
    references public.tasks (task_id, board_name, project_id) on delete cascade,
  constraint child_task_fkey foreign key (child_task_id, child_task_board_name, child_task_project_id)
    references public.tasks (task_id, board_name, project_id) on delete cascade,
  constraint only_one_parent unique (child_task_project_id, child_task_board_name, child_task_id)
) tablespace pg_default;

create table public.related_tasks (
  linked_task_project_id serial,
  linked_task_board_name text,
  linked_task_id numeric,
  task_id numeric,
  task_project_id serial,
  task_board_name text,
  constraint task_fkey foreign key (task_id, task_board_name, task_project_id)
    references public.tasks (task_id, board_name, project_id) on delete cascade,
  constraint linked_task_fkey foreign key (linked_task_id, linked_task_board_name, linked_task_project_id)
    references public.tasks (task_id, board_name, project_id) on delete cascade
) tablespace pg_default;

create table public.blocker_tasks (
  blocker_task_project_id serial,
  blocker_task_board_name text,
  blocker_task_id numeric,
  task_id numeric,
  task_project_id serial,
  task_board_name text,
  constraint task_fkey foreign key (task_id, task_board_name, task_project_id)
    references public.tasks (task_id, board_name, project_id) on delete cascade,
  constraint blocker_task_fkey foreign key (blocker_task_id, blocker_task_board_name, blocker_task_project_id)
    references public.tasks (task_id, board_name, project_id) on delete cascade
) tablespace pg_default;

create table public.task_tags (
  tag_name text not null,
  task_id numeric not null,
  board_name text not null,
  project_id serial not null,
  constraint task_fkey foreign key (task_id, board_name, project_id)
    references public.tasks (task_id, board_name, project_id) on delete cascade
) tablespace pg_default;
