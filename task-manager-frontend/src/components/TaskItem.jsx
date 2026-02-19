import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };

  const statusColors = {
    pending: "bg-gray-100 text-gray-800 border-gray-200",
    in_progress: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-purple-100 text-purple-800 border-purple-200",
  };

  const handleSave = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow-lg border-2 border-indigo-300">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2"
          rows="2"
        />
        <div className="flex gap-2">
          <select
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({ ...editedTask, priority: e.target.value })
            }
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 flex-1"
          >
            <option value="low">🔵 Baixa</option>
            <option value="medium">🟡 Média</option>
            <option value="high">🔴 Alta</option>
          </select>
          <select
            value={editedTask.status}
            onChange={(e) =>
              setEditedTask({ ...editedTask, status: e.target.value })
            }
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 flex-1"
          >
            <option value="pending">⏳ Pendente</option>
            <option value="in_progress">🔄 Em Progresso</option>
            <option value="completed">✅ Concluída</option>
          </select>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Salvar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/20"
    >
      <div className="flex items-start gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move text-gray-400 hover:text-indigo-600 mt-1"
        >
          ⋮⋮
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-gray-800">
              {task.title}
            </h3>
            <div className="flex gap-2">
              <span
                className={`px-2 py-1 rounded-lg text-xs font-semibold border ${priorityColors[task.priority]}`}
              >
                {task.priority === "low"
                  ? "🔵 Baixa"
                  : task.priority === "medium"
                    ? "🟡 Média"
                    : "🔴 Alta"}
              </span>
              <span
                className={`px-2 py-1 rounded-lg text-xs font-semibold border ${statusColors[task.status]}`}
              >
                {task.status === "pending"
                  ? "⏳ Pendente"
                  : task.status === "in_progress"
                    ? "🔄 Em Progresso"
                    : "✅ Concluída"}
              </span>
            </div>
          </div>

          {task.description && (
            <p className="text-gray-600 mt-1">{task.description}</p>
          )}

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            {task.category && (
              <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg border border-indigo-200">
                # {task.category}
              </span>
            )}
            {task.dueDate && (
              <span className="flex items-center gap-1">
                <span>📅</span>
                {new Date(task.dueDate).toLocaleDateString("pt-BR")}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-indigo-600 hover:text-indigo-800 p-1"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
