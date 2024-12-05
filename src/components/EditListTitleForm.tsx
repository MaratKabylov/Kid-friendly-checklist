import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface EditListTitleFormProps {
  initialTitle: string;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
}

export function EditListTitleForm({ initialTitle, onSave, onCancel }: EditListTitleFormProps) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && title.trim() !== initialTitle) {
      onSave(title.trim());
    } else {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xl font-bold"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Save"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}