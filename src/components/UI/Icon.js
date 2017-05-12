import React from 'react';

// defaults
const W = 12;
const H = 12;
const COLOR = 'silver';

const icons = {};

icons.x = ({ children }) => <path d="M1.41 0l-1.41 1.41.72.72 1.78 1.81-1.78 1.78-.72.69 1.41 1.44.72-.72 1.81-1.81 1.78 1.81.69.72 1.44-1.44-.72-.69-1.81-1.78 1.81-1.81.72-.72-1.44-1.41-.69.72-1.78 1.78-1.81-1.78-.72-.72z">{children}</path>

icons.tick = () => <path d="M6.41 0l-.69.72-2.78 2.78-.81-.78-.72-.72-1.41 1.41.72.72 1.5 1.5.69.72.72-.72 3.5-3.5.72-.72-1.44-1.41z" transform="translate(0 1)" />

icons.move = () => <path d="M3.5 0l-1.5 1.5h1v1.5h-1.5v-1l-1.5 1.5 1.5 1.5v-1h1.5v1.5h-1l1.5 1.5 1.5-1.5h-1v-1.5h1.5v1l1.5-1.5-1.5-1.5v1h-1.5v-1.5h1l-1.5-1.5z" />

export default ({ name, width = W, height = H, color = COLOR, ...props }) =>
    <svg {...props} fill={color} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 8 8">
        {iconWithTooltip(name)}
    </svg>

function iconWithTooltip(name) {
    const Icon = icons[name];
    return <Icon><title id="title">{name}</title></Icon>
}