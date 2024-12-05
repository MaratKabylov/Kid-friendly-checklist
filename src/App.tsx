import React, { useState } from 'react';
import { CheckSquare, Edit2, Eye } from 'lucide-react';
import { TaskList } from './components/TaskList';
import { AddListForm } from './components/AddListForm';
import { useTaskLists } from './hooks/useTaskLists';
import { AppState } from './types';

function App() {
  const {
    taskLists,
    addList,
    deleteList,
    deleteTask,
    toggleTask,
    addTask,
    editTask,
    editList,
  } = useTaskLists();
  const [appState, setAppState] = useState<AppState>({ isEditMode: false });

  const toggleEditMode = () => {
    setAppState((prev) => ({ ...prev, isEditMode: !prev.isEditMode }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CheckSquare className="w-10 h-10 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">My Daily Tasks</h1>
          </div>
          <button
            onClick={toggleEditMode}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            {appState.isEditMode ? (
              <>
                <Eye className="w-5 h-5" />
                <span>View Mode</span>
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5" />
                <span>Edit Mode</span>
              </>
            )}
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {taskLists.map((list) => (
            <TaskList
              key={list.id}
              list={list}
              onToggleTask={toggleTask}
              onAddTask={addTask}
              onEditTask={editTask}
              onEditList={editList}
              onDeleteTask={deleteTask}
              onDeleteList={deleteList}
              isEditMode={appState.isEditMode}
            />
          ))}
          <AddListForm onAddList={addList} />
        </div>
      </div>
    </div>
  );
}

export default App;