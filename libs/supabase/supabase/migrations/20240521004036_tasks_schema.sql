create table tasks if not exists (
  task_id numeric,
  project_id serial,
  board_name text,
  task_title text,
  task_description text,
  due_date date,
  hours_estimated integer,
  hours_completed integer,
  constraint tasks_pkey primary key (task_id, project_id, board_name),
  constraint board_fkey foreign key (board_name, project_id) references public.boards (board_name, project_id) on delete cascade
) tablespace pg_default;

create table parent_child_tasks if not exists (
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

create table linked_tasks if not exists (
  relationship_type text,
  constraint relation_check check (relationship_type in ('blocker', 'related'))
) tablespace pg_default;

create table task_tags if not exists (
  tag_name text,
  task_id numeric,
  board_name text,
  project_id serial,
  constraint task_fkey foreign key (task_id, board_name, project_id) references public.tasks (task_id, board_name, project_id) on delete cascade
) tablespace pg_default;
