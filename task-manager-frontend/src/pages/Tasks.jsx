import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import api from "../services/api";
import { TaskItem } from "../components/TaskItem";
import { useToast } from "../context/ToastContext";

export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    dueDate: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    loadTasks();
  }, []);

  // Verificar tarefas próximas do vencimento
  useEffect(() => {
    if (tasks.length > 0) {
      checkUpcomingTasks();
    }
  }, [tasks]);

  const checkUpcomingTasks = () => {
    const now = new Date();
    const checkedToday = JSON.parse(
      localStorage.getItem("checkedTasks") || "{}",
    );
    const today = new Date().toDateString();

    tasks.forEach((task) => {
      if (task.dueDate && task.status !== "completed") {
        const dueDate = new Date(task.dueDate);
        const diffTime = dueDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const taskKey = `${task.id}-${today}`;

        // Evitar mostrar a mesma notificação várias vezes no mesmo dia
        if (checkedToday[taskKey]) return;

        // Tarefa atrasada
        if (diffTime < 0) {
          toast.error(
            `⚠️ Tarefa atrasada: "${task.title}" deveria ter sido concluída há ${Math.abs(diffDays)} dias`,
            8000,
          );
          checkedToday[taskKey] = true;
        }
        // Vence hoje
        else if (diffDays === 0) {
          toast.warning(`📅 Vence hoje: "${task.title}"`, 6000);
          checkedToday[taskKey] = true;
        }
        // Vence amanhã
        else if (diffDays === 1) {
          toast.task(`⏰ Vence amanhã: "${task.title}"`, 5000);
          checkedToday[taskKey] = true;
        }
        // Vence em 2 dias
        else if (diffDays === 2) {
          toast.info(`📌 Vence em 2 dias: "${task.title}"`, 4000);
          checkedToday[taskKey] = true;
        }
      }
    });

    localStorage.setItem("checkedTasks", JSON.stringify(checkedToday));
  };

  const loadTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);

      if (response.data.length === 0) {
        toast.info("👋 Bem-vindo! Comece criando sua primeira tarefa", 4000);
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    // Validações
    if (!newTask.title.trim()) {
      toast.error("O título é obrigatório");
      return;
    }

    if (!newTask.dueDate) {
      toast.error("A data de vencimento é obrigatória");
      return;
    }

    try {
      const response = await api.post("/tasks", newTask);
      setTasks([...tasks, response.data]);
      setShowForm(false);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        category: "",
        dueDate: "",
      });

      toast.success(
        `✅ Tarefa "${response.data.title}" criada com sucesso!`,
        3000,
      );
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      toast.error("❌ Erro ao criar tarefa. Tente novamente.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));

      toast.task(`🗑️ Tarefa "${task.title}" removida`, 3000);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      toast.error("Erro ao deletar tarefa");
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));

      if (updates.status === "completed") {
        toast.congrats(
          `🎉 Parabéns! Você concluiu "${response.data.title}"`,
          5000,
        );
      } else {
        toast.success(`✅ Tarefa atualizada`, 2000);
      }
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      toast.error("Erro ao atualizar tarefa");
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
          <div className="text-xl text-indigo-600">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20 p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
              TM
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="bg-white/80 hover:bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200/50 shadow-sm transition duration-200 flex items-center gap-2"
          >
            <span>🚪</span>
            Sair
          </button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Botão Nova Tarefa */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 transition duration-200 transform hover:scale-105"
          >
            <span className="text-lg">{showForm ? "✕" : "+"}</span>
            {showForm ? "Cancelar" : "Nova Tarefa"}
          </button>
        </div>

        {/* Formulário de Nova Tarefa */}
        {showForm && (
          <form
            onSubmit={handleCreateTask}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl mb-6 border border-white/20"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                  📝
                </span>
                Nova Tarefa
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Campo Título */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Título <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-400 ml-2">
                    {newTask.title.length}/50
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Estudar React, Fazer compras, etc"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      title: e.target.value.slice(0, 50),
                    })
                  }
                  className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50"
                  required
                  maxLength="50"
                />
              </div>

              {/* Campo Descrição */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Descrição
                  <span className="text-xs text-gray-400 ml-2">
                    {newTask.description.length}/200
                  </span>
                </label>
                <textarea
                  placeholder="Descreva os detalhes da tarefa..."
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      description: e.target.value.slice(0, 200),
                    })
                  }
                  className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50"
                  rows="3"
                  maxLength="200"
                />
              </div>

              {/* Linha Prioridade e Categoria */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Prioridade
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50"
                  >
                    <option value="low">🔵 Baixa</option>
                    <option value="medium">🟡 Média</option>
                    <option value="high">🔴 Alta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Trabalho, Estudos"
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50"
                    list="categorias"
                  />
                  <datalist id="categorias">
                    <option value="Trabalho" />
                    <option value="Estudos" />
                    <option value="Pessoal" />
                    <option value="Casa" />
                    <option value="Saúde" />
                  </datalist>
                </div>
              </div>

              {/* Campo Data */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Data de vencimento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  📅 Escolha uma data para concluir esta tarefa
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>✓</span> Criar Tarefa
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-white/50 transition duration-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Lista de Tarefas */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {tasks.length === 0 ? (
                <div className="text-center text-gray-500 py-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
                  <p className="text-lg">Nenhuma tarefa encontrada.</p>
                  <p className="text-sm">
                    Clique em "Nova Tarefa" para começar!
                  </p>
                </div>
              ) : (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onUpdate={handleUpdateTask}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
