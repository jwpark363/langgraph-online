import { useAtom, useSetAtom } from 'jotai';
import styled from 'styled-components';
import { AddGraphNode, GraphNodesAtom } from '../atom';
import { NewGraphConditionNode, NewGraphNode } from './langgraph';

const Box = styled.div`
  background-color: #1f2937;
  border-bottom: 1px solid #374151;
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;
const HeaderRight = styled.div`
  margin-right: 48px;
  display: flex;
  align-items: center;
  gap: 24px;
  color: white;
`;
const NodeRect = styled.div`
  position: relative;
  width: 200px;
  height: 60px;
  background-color: #959fb0;
`;
const NodeEdge = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  &:nth-child(2n){
    background-color: #1250cc;
  }
  &:nth-child(2n+1){
    background-color: #cf5143;
  }
`;
const NodeDesc = styled.div`
  height: 64%;
  font-size: 16px;
  color: white;
  margin-top: 4px;
  display: flex;
  align-items: end;
`
const HeaderLeft = styled.div`
  color: white;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const Instructions = styled.div`
  font-size: 0.875rem;
  color: #d1d5db;
  display: flex;
  gap : 18px;
  p {
    margin: 0.25rem 0;
    cursor: pointer;
    border: 1px solid gray;
    padding: 4px 8px;
    border-radius: 8px;
  }
  strong {
    font-weight: 600;
  }
`;

export default function CanvasHeader(){
    const [nodes, setNodes] = useAtom(GraphNodesAtom);

    const handle_node_add = () => {
        //노드 추가
        const new_node = NewGraphNode('new node')
        setNodes(AddGraphNode(nodes, new_node));
    }
    const handle_condition_add = () => {
        //노드 추가
        const new_node = NewGraphConditionNode('new node')
        setNodes(AddGraphNode(nodes, new_node));
    }

    return(
      <Box>
        <HeaderLeft>
          <Title>LangGraph pseudo code 작성기</Title>
          <Instructions>
            <p onClick={handle_node_add}>🤖 <strong>Node 추가</strong></p>
            <p onClick={handle_condition_add}>🧞 <strong>Condition 추가:</strong></p>
          </Instructions>
        </HeaderLeft>
        <HeaderRight>
          <NodeDesc>
            노드의 연결 포인트
          </NodeDesc>
          <NodeRect>
            <NodeEdge style={{top:'-14px', left: '44%'}}>1</NodeEdge>
            <NodeEdge style={{top:'-14px', right: '-14px'}}>2</NodeEdge>
            <NodeEdge style={{top: '32%', right: '-14px'}}>3</NodeEdge>
            <NodeEdge style={{bottom: '-14px', right: '-14px'}}>4</NodeEdge>
            <NodeEdge style={{bottom: '-14px', left: '44%'}}>5</NodeEdge>
            <NodeEdge style={{bottom: '-14px', left: '-14px'}}>6</NodeEdge>
            <NodeEdge style={{top: '32%', left: '-14px'}}>7</NodeEdge>
            <NodeEdge style={{top: '-14px', left: '-14px'}}>8</NodeEdge>
          </NodeRect>
        </HeaderRight>
      </Box>
    )
}