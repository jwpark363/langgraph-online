import styled from "styled-components";
import type { NodeType } from "../graph/langgraph";

const BaseLine = {
    fill:{
        start:'blue',
        end:'green',
        node:'gray',
        condition:'tomato'
    },
    round:10,
    stroke:'#fff'
}

interface RectProps{
    $dragging: boolean;
    $nodetype: NodeType;
    $fill?: string;
    $stroke?: string;
}

const Rect = styled.rect<RectProps>`
    rx:${BaseLine.round};
    ry:${BaseLine.round};
    cursor: ${props => props.$dragging ? 'grabbing' : 'grab'};
    opacity: ${props => props.$dragging ? 0.7 : 1};
    transition: opacity 0.1s;
    fill: ${props => props.$fill ? props.$fill : BaseLine.fill[props.$nodetype]};
    stroke:${props => props.$stroke ? props.$stroke : BaseLine.stroke};
    stroke-width:2;
`;
const Text = styled.text`
    pointer-events: none;
    user-select: none;
    text-anchor: middle;
    fill:white;
    font-size:14;
    font-weight:bold;
    dominant-baseline:middle;
`;
const Polygon = styled.polygon<RectProps>`
    cursor: ${props => props.$dragging ? 'grabbing' : 'grab'};
    opacity: ${props => props.$dragging ? 0.7 : 1};
    transition: opacity 0.1s;
    fill: ${props => props.$fill ? props.$fill : BaseLine.fill.condition};
    stroke:${props => props.$stroke ? props.$stroke : BaseLine.stroke};
    stroke-width:2;
`;
export {Rect, Text, Polygon}