import {v4 as uuidv4} from 'uuid';

type NodeType = "start" | "node" | "condition" | "end";
// 0번 없음, 1번 상단 중앙, 2번 우상단, 3번 우측 중악, 4번 우하단, 5번 하단 중앙, 6번 좌하단, 7번 좌측 중앙, 8번 좌상단
type EdgePoint = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
interface RectInfo{
    x: number;
    y: number;
    width: number;
    height: number;
    parentEdgePoint?: EdgePoint;
    edgePoint?: EdgePoint;
}
interface Condition{
    key: string;
    nextNodeId: string;
    nextEdgePoint?: number;
    edgePoint?: number;
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
        rect: {x:100, y:100, width:120, height:40, edgePoint:0, parentEdgePoint:0},
    }
}
const NewGraphConditionNode = (name:string):GraphNode => {
    // Condition Node
    return {
        id: uuidv4(),
        name,
        type : "condition",
        conditions: [],
        rect: {x:100, y:100, width:160, height:48, edgePoint:0, parentEdgePoint:0},
    }
}

const NodeEdgePoint = (node: GraphNode, type:EdgePoint): {x:number,y:number} => {
    // 노드의 x,y 좌표 계산
    const point = { // 8 좌상단
        x: node.rect.x,
        y: node.rect.y,
    };
    switch(type){
        case 1:
            point.x += node.rect.width / 2;
            break;
        case 2:
            point.x += node.rect.width;
            break;
        case 3:
            point.x += node.rect.width;
            point.y += node.rect.height / 2;
            break;
        case 4:
            point.x += node.rect.width;
            point.y += node.rect.height;
            break;
        case 5:
            point.x += node.rect.width / 2;
            point.y += node.rect.height;
            break;
        case 6:
            point.y += node.rect.height;
            break;
        case 7:
            point.y += node.rect.height / 2;
            break;
        case 8:
            //좌상단
            break;
    }   
    return point;
}

export type { NodeType, GraphNode, Condition };
export { NewGraphNode, NewGraphConditionNode, NodeEdgePoint };