import styled from "styled-components";
import type { Condition, GraphNode } from "./langgraph";
import { GraphNodesAtom } from "../atom";
import { useAtom } from "jotai";
import { useState } from "react";

const Box = styled.div`
    position: relative;
    width: 100%;
    background-color: #374151;
    border: 1px solid #374151;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;
const RowBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    background-color: #374151;
`;
const RowTitle = styled.h2`
    font-size: 14px;
    font-weight: normal;
    margin-left: 12px;
`;
const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 8px;
    padding: 2px;
    background-color: #1f2937;
    div{
        display: grid;
        grid-template-columns: 3fr 2fr;
    }
`;
const Input = styled.input`
  padding: 6px 8px;
  border: 1px solid #374151;
  border-radius: 4px;
  background-color: #111827;
  color: white;
`;
const Select = styled.select`
  padding: 6px 8px;
  border: 1px solid #374151;
  border-radius: 4px;
  background-color: #111827;
  color: white;
`;
const ButtonBox = styled.div`
  position: absolute;
  display: flex;
  right: -12px;
  bottom: -64px;
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
const DelButton = styled.button`
  margin: 2px;
  padding: 2px;
  width: 50px;
  background-color: #374151;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4b5563;
  }
`;
interface CondProp{
    node: GraphNode
}
export default function ConditionDetail({node}:CondProp){
  const [nodes, setNodes] = useAtom(GraphNodesAtom);
  const [condition_key, setKey] = useState('');
  const [condition_next_id, setNextId] = useState('');
  const [condition_edge_point, setEdgePoint] = useState(0);
  const [condition_next_edge_point, setNextEdgePoint] = useState(0);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  }
  const handleNextIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNextId(e.target.value);
  }
  const handleEdgePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdgePoint(parseInt(e.target.value));
  }  
  const handleNextEdgePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextEdgePoint(parseInt(e.target.value));
  }  
  const handleAdd = () => {
    console.log('add');
    const condition_key = (document.getElementById('condition_key') as HTMLInputElement).value;
    const condition_next_id = (document.getElementById('condition_next_id') as HTMLSelectElement).value;
    const condition_edge_point = (document.getElementById('condition_edge_point') as HTMLInputElement).value;
    const condition_next_edge_point = (document.getElementById('condition_next_edge_point') as HTMLInputElement).value;
    const updated_node:GraphNode = {
    ...node,
    conditions: [...(node.conditions || []),
            {
                    key: condition_key,
                    nextNodeId: condition_next_id,
                    nextEdgePoint: condition_next_edge_point ? parseInt(condition_next_edge_point) : 0,
                    edgePoint: condition_edge_point ? parseInt(condition_edge_point) : 0
            }
        ]
    }
    setNodes(prev_nodes => 
        prev_nodes.map(n => n.id === updated_node.id ? updated_node : n));
  }
  const handleDelete = (index:number) => {
    //해당 인덱스 conditin 삭제
    console.log(index);
    const updated_node:GraphNode = {
        ...node,
        conditions: [...(node.conditions === undefined ? [] :
                        node.conditions.filter((_,i) => i !==index))]
    }
    console.log(updated_node);
    setNodes(prev_nodes => 
        prev_nodes.map(n => n.id === updated_node.id ? updated_node : n));
  }

//   console.log(nodes);
//   console.log(node);
    return(
        <Box>
            <RowBox>
                <Row>
                    <RowTitle>key</RowTitle>
                    <div>
                        <Input type="text" id="condition_key" value={condition_key}
                            onChange={handleKeyChange} name="condition_key"/>
                        <Input type="number" id="condition_edge_point" value={condition_edge_point}
                            onChange={handleEdgePointChange} name="condition_edge_point"
                        placeholder="Edge Point (1~8)" max={8} min={0}/>
                    </div>
                </Row>
                <Row>
                    <RowTitle>path</RowTitle>
                    <div>
                        <Select id="condition_next_id" value={condition_next_id}
                            onChange={handleNextIdChange} name="condition_next_id">
                            {nodes.filter(n => n.type !== 'start' && n.id !== node.id).map(
                                (n,i) => (
                                    <option key={i} value={n.id}>{n.name}</option>
                                )
                            )}
                        </Select>
                        <Input type="number" id="condition_next_edge_point"
                            onChange={handleNextEdgePointChange} value={condition_next_edge_point} name="condition_next_edge_point"
                        placeholder="Edge Point (1~8)" max={8} min={0}/>
                    </div>
                </Row>
            </RowBox>
            {node.conditions?.map((cond, i)=>(
            <RowBox key={i}>
                <Row>
                    <RowTitle>key</RowTitle>
                    <div>{cond.key} ({cond.edgePoint})</div>
                </Row>
                <Row>
                    <RowTitle>path</RowTitle>
                    <div>
                        {nodes.find(n => n.id===cond.nextNodeId).name}
                        ({cond.nextEdgePoint})
                        <DelButton onClick={() => handleDelete(i)}>Del</DelButton>
                    </div>
                </Row>
            </RowBox>
            ))}
            <ButtonBox>
                <Button onClick={() => handleAdd('add')}>Condition Add</Button>
            </ButtonBox>
        </Box>
    )
}