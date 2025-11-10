import { atom } from "jotai";
import {v4 as uuidv4} from 'uuid';
import type { GraphNode } from "./graph/langgraph";

// 기본 노드
const DefaultNodes:GraphNode[] = [{
        id: uuidv4(),
        name:'START',
        type : "start",
        rect: {x:250, y:100, width:120, height:40, fill:'lightgray'},
    },{
        id: uuidv4(),
        name: 'END',
        type : "end",
        rect: {x:250, y:300, width:120, height:40, fill:'lightgray'},
    }
];

const AddGraphNode = (nodes:GraphNode[], new_node:GraphNode):GraphNode[] => {
    return [...nodes, new_node];
}
const RemoveGraphNode = (nodes:GraphNode[], node_id:string):GraphNode[] => {
    return nodes.filter(node => node.id !== node_id);
}
const UpdateGraphNode = (nodes:GraphNode[], updated_node:GraphNode):GraphNode[] => {
    return nodes.map(node => node.id === updated_node.id ? updated_node : node);
}

const GraphNodesAtom = atom<GraphNode[]>(DefaultNodes);
export { GraphNodesAtom, AddGraphNode, RemoveGraphNode, UpdateGraphNode };