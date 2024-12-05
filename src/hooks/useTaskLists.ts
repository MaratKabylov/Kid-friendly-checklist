import { useState } from 'react';
import { TaskList } from '../types';
import { generateId, getRandomColor } from '../utils/taskUtils';

const initialLists: TaskList[] = [
  {
    id: '1',
    title: 'Morning Routine',
    tasks: [
      { id: '1-1', title: 'Make my bed', completed: false, color: 'blue' },
      { id: '1-2', title: 'Brush teeth', completed: false, color: 'purple' },
      { id: '1-3', title: 'Get dressed', completed: false, color: 'pink' },
    ],
  },
  {
    id: '2',
    title: 'After School',
    tasks: [
      { id: '2-1', title: 'Do homework', completed: false, color: 'yellow' },
      { id: '2-2', title: 'Read for 20 minutes', completed: false, color: 'orange' },
      { id: '2-3', title: 'Pack backpack for tomorrow', completed: false, color: 'indigo' },
    ],
  },
];

export function useTaskLists() {
  const [taskLists, setTaskLists] = useState<TaskList[]>(initialLists);

  const addList = (title: string) => {
    const newList: TaskList = {
      id: generateId(),
      title,
      tasks: [],
    };
    setTaskLists(lists => [...lists, newList]);
  };

  const deleteList = (listId: string) => {
    setTaskLists(lists => lists.filter(list => list.id !== listId));
  };

  const deleteTask = (listId: string, taskId: string) => {
    setTaskLists(lists =>
      lists.map(list =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );
  };

  const toggleTask = (taskId: string) => {
    setTaskLists(lists =>
      lists.map(list => ({
        ...list,
        tasks: [...list.tasks]
          .map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task))
          .sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
          }),
      }))
    );
  };

  const addTask = (listId: string, title: string) => {
    const newTask = {
      id: generateId(),
      title,
      completed: false,
      color: getRandomColor(),
    };

    setTaskLists(lists =>
      lists.map(list =>
        list.id === listId
          ? {
              ...list,
              tasks: [...list.tasks, newTask].sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1;
              }),
            }
          : list
      )
    );
  };

  const editTask = (taskId: string, newTitle: string) => {
    setTaskLists(lists =>
      lists.map(list => ({
        ...list,
        tasks: list.tasks.map(task =>
          task.id === taskId ? { ...task, title: newTitle } : task
        ),
      }))
    );
  };

  const editList = (listId: string, newTitle: string) => {
    setTaskLists(lists =>
      lists.map(list =>
        list.id === listId ? { ...list, title: newTitle } : list
      )
    );
  };

  return {
    taskLists,
    addList,
    deleteList,
    deleteTask,
    toggleTask,
    addTask,
    editTask,
    editList,
  };
}