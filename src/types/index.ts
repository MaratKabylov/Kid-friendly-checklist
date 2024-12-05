export interface Task {
  id: string;
  title: string;
  completed: boolean;
  color: string;
}

export interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
}

export interface AppState {
  isEditMode: boolean;
}