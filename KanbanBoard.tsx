import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, MoreVertical } from 'lucide-react';

interface Task {
  id: string;
  content: string;
  assignee?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', content: 'Implement user authentication', assignee: 'John' },
        { id: '2', content: 'Design database schema', assignee: 'Sarah' },
      ],
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      tasks: [
        { id: '3', content: 'Set up WebSocket server', assignee: 'Mike' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: '4', content: 'Project setup and configuration', assignee: 'Emma' },
      ],
    },
  ]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find((col) => col.id === destination.droppableId);
    
    if (!sourceColumn || !destColumn) return;

    const newColumns = columns.map((col) => {
      if (col.id === source.droppableId) {
        const newTasks = Array.from(col.tasks);
        const [removed] = newTasks.splice(source.index, 1);
        if (col.id === destination.droppableId) {
          newTasks.splice(destination.index, 0, removed);
        }
        return { ...col, tasks: newTasks };
      }
      if (col.id === destination.droppableId && source.droppableId !== destination.droppableId) {
        const newTasks = Array.from(col.tasks);
        const task = sourceColumn.tasks[source.index];
        newTasks.splice(destination.index, 0, task);
        return { ...col, tasks: newTasks };
      }
      return col;
    });

    setColumns(newColumns);
  };

  return (
    <div className="h-[calc(100vh-7rem)]">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 h-full">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 min-w-[300px]">
              <div className="bg-gray-100 rounded-lg p-4 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">{column.title}</h3>
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                    {column.tasks.length}
                  </span>
                </div>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-2"
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow-sm"
                            >
                              <div className="flex justify-between items-start">
                                <p className="text-sm">{task.content}</p>
                                <button className="text-gray-400 hover:text-gray-600">
                                  <MoreVertical size={16} />
                                </button>
                              </div>
                              {task.assignee && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                    {task.assignee}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <button className="w-full mt-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg flex items-center justify-center">
                        <Plus size={16} className="mr-2" />
                        Add task
                      </button>
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;