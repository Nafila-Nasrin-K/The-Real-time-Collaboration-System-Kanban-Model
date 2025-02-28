import React from 'react';
import { Todo } from '../../store/todoStore';

interface PriorityBadgeProps {
  priority: Todo['priority'];
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityStyles()}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;