import React, { useState } from 'react';
import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { EditTaskForm } from './EditTaskForm';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  isEditMode: boolean;
}

export function TaskCard({ task, onToggle, onEdit, onDelete, isEditMode }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newTitle: string) => {
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  if (isEditing && isEditMode) {
    return (
      <div className={`p-4 rounded-lg shadow-sm mb-3 bg-${task.color}-50`}>
        <EditTaskForm
          initialTitle={task.title}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg shadow-sm mb-3 transition-all group
      ${task.completed ? 'bg-green-50' : `bg-${task.color}-50`}`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className="flex items-center gap-3 flex-1"
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className={`w-6 h-6 text-${task.color}-500`} />
          )}
          <span className={task.completed ? 'line-through text-gray-500' : ''}>
            {task.title}
          </span>
        </button>
        {isEditMode && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-white"
              title="Edit task"
            >
              <Pencil className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-white"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}