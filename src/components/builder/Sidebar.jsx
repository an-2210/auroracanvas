import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import componentRegistry from '../../lib/componentRegistry';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
            <h2 className="text-lg font-bold mb-4">Components</h2>
            <div className="space-y-2">
                {Object.keys(componentRegistry).map((key) => {
                    const { id, defaultProps } = componentRegistry[key];
                    return <DraggableItem key={id} id={id} label={defaultProps.label || key} />;
                })}
            </div>
        </div>
    );
};

const DraggableItem = ({ id, label }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="p-2 bg-white border border-gray-300 rounded shadow cursor-pointer"
        >
            {label}
        </div>
    );
};

export default Sidebar;