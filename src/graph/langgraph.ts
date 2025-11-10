import {v4 as uuidv4} from 'uuid';

type NodeType = "start" | "node" | "condition" | "end";
interface RectInfo{
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
}
interface Condition{
    key: string;
    nextNodeId: string;
}
interface GraphNode{
    id: string;
    name: string;
    type: NodeType;
    parentId?: string;
    conditions?:Condition[]; // type이 condition일 때만 사용
    rect: RectInfo
}
const NewGraphNode = (name:string):GraphNode => {
    // Basic Node
    return {
        id: uuidv4(),
        name,
        type : "node",
        rect: {x:100, y:100, width:120, height:40, fill:'lightgray'},
    }
}
const NewGraphConditionNode = (name:string):GraphNode => {
    // Condition Node
    return {
        id: uuidv4(),
        name,
        type : "condition",
        conditions: [],
        rect: {x:100, y:100, width:120, height:40, fill:'lightgray'},
    }
}
export type { NodeType, GraphNode, Condition };
export { NewGraphNode, NewGraphConditionNode };