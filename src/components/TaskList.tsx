import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { AddTaskForm } from './AddTaskForm';
import { EditListTitleForm } from './EditListTitleForm';
import { TaskList as TaskListType } from '../types';

interface TaskListProps {
  list: TaskListType;
  onToggleTask: (taskId: string) => void;
  onAddTask: (listId: string, title: string) => void;
  onEditTask: (taskId: string, newTitle: string) => void;
  onEditList: (listId: string, newTitle: string) => void;
  onDeleteTask: (listId: string, taskId: string) => void;
  onDeleteList: (listId: string) => void;
  isEditMode: boolean;
}

export function TaskList({
  list,
  onToggleTask,
  onAddTask,
  onEditTask,
  onEditList,
  onDeleteTask,
  onDeleteList,
  isEditMode,
}: TaskListProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleSaveTitle = (newTitle: string) => {
    onEditList(list.id, newTitle);
    setIsEditingTitle(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4 group">
        {isEditingTitle && isEditMode ? (
          <EditListTitleForm
            initialTitle={list.title}
            onSave={handleSaveTitle}
            onCancel={() => setIsEditingTitle(false)}
          />
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-800">{list.title}</h2>
            {isEditMode && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-gray-100"
                  title="Edit list title"
                >
                  <Pencil className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => onDeleteList(list.id)}
                  className="p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-gray-100"
                  title="Delete list"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="space-y-2">
        {list.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onEdit={onEditTask}
            onDelete={(taskId) => onDeleteTask(list.id, taskId)}
            isEditMode={isEditMode}
          />
        ))}
      </div>
      <AddTaskForm listId={list.id} onAddTask={onAddTask} />
    </div>
  );
}