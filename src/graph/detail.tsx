import styled from "styled-components";
import type { GraphNode } from "./langgraph"
import { useAtom } from "jotai";
import { GraphNodesAtom } from "../atom";
import { useState } from "react";
import ConditionDetail from "./condition_detail";

const MainBox = styled.div<{$x?:number, $y?:number}>`
  position: fixed;
  top: ${props => props.$y ? `${props.$y + 200}px` : '50%'};
  left: ${props => props.$x ? `${props.$x + 100}px` : '50%'};;
  transform: translateY(-50%);
  background-color: #1f2937;
  color: white;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  min-width: 150px;
  z-index: 1000;
`;
const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 12px;
  border-bottom: 2px solid #374151;
  padding-bottom: 8px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 16px;
  margin-bottom: 8px;
  font-size: 14px;
`;
const Label = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  color: #9ca3af;
`;
const Value = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: bold;
`;
const Button = styled.button`
  margin: 12px 12px;
  padding: 8px 12px;
  background-color: #374151;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4b5563;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #374151;
  border-radius: 4px;
  background-color: #111827;
  color: white;
`;
const Select = styled.select`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #374151;
  border-radius: 4px;
  background-color: #111827;
  color: white;
`;
interface NodeProps{
    node: GraphNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
}
export default function NodeInfo({node, onClick}:NodeProps){
  const [node_name, setNodeName] = useState(node.name);
  const [parent_id, setParentId] = useState(node.parentId);
  const [edge_point, setEdgePoint] = useState(node.rect.edgePoint);
  const [parent_edge_point, setParentEdgePoint] = useState(node.rect.parentEdgePoint);
  const [nodes, setNodes] = useAtom(GraphNodesAtom);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(e.target.value);
  }
  const handleParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParentId(e.target.value);
  }
  const handleEdgePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdgePoint(parseInt(e.target.value));
  }
  const handleParentEdgePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParentEdgePoint(parseInt(e.target.value));
  }

  const handleUpdate = () => {
      //노드 업데이트
      console.log('update node');
      const node_name = (document.getElementById('node_name') as HTMLInputElement).value;
      const parent_id = (document.getElementById('parent_id') as HTMLSelectElement).value;
      const edge_point = (document.getElementById('edge_point') as HTMLInputElement).value;
      const parent_edge_point = (document.getElementById('parent_edge_point') as HTMLInputElement).value;
      console.log('edge_point', edge_point);
      console.log('parent_edge_point', parent_edge_point);
      const updated_node:GraphNode = {
        ...node,
        name: node_name,
        parentId: parent_id,
        rect: {
          ...node.rect,
          edgePoint: edge_point ? parseInt(edge_point) : 0,
          parentEdgePoint: parent_edge_point ? parseInt(parent_edge_point) : 0,
        }
      }
      setNodes(prev_nodes => {
        return prev_nodes.map(n => n.id === updated_node.id ? updated_node : n);
      });
  }
  const parentNodeName = (parent_id:string | undefined) => {
    if(!parent_id) return 'not connected';
    const parent_node = nodes.find(n => n.id === parent_id);
    return parent_node ? parent_node.name : 'not connected';
  }  
  return(
        <MainBox $x={node.rect.x} $y={node.rect.y}>
          <Title>{node.name} 정보</Title>
          <Row>
            <Label>ID:</Label>
            <Value>{node.id.substring(0,15)}...</Value>
          </Row>
          <Row>
            <Label>(- Edge Point)</Label>
            <Input type="number" id="edge_point" name="edge_point" value={edge_point}
              onChange={handleEdgePointChange}
              placeholder="My Edge Point (1~8)" max={8} min={0}/>
          </Row>
          <Row>
            <Label>Parent:</Label>
            { node.type === 'start' ? <Value>START NODE</Value> :

              <Select value={parent_id} id='parent_id' onChange={handleParentChange}>
                <option value={undefined}>not connected</option>
                {
                  nodes.filter(n => n.id !== node.id && n.type !== 'end').map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))
                }
              </Select>
            }
          </Row>
          <Row>
            <Label>(- Edge Point)</Label>
            <Input type="number" id="parent_edge_point" name="parent_edge_point" value={parent_edge_point}
              onChange={handleParentEdgePointChange}
              placeholder="Parent Edge Point (1~8)" max={8} min={0}/>
          </Row>
          <Row>
            <Label>Type:</Label>
            <Value>{node.type}</Value>
          </Row>
          <Row>
            <Label>Name:</Label>
            <Input type="text" id="node_name" name="node_name"
              onChange={handleNameChange}
              value={node_name} disabled={(node.type === 'start' || node.type === 'end')}/>
          </Row>
          {node.type === 'condition' && (
            <Row>
              <Label>조건부 :</Label>
              <Value>{node.conditions && <ConditionDetail conditions={node.conditions} />}</Value>
            </Row>
          )}
          <Button onClick={onClick}> Close </Button>
          <Button onClick={handleUpdate}> Update </Button>
        </MainBox>
    )
}