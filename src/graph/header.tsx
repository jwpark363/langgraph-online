import { useAtom, useSetAtom } from 'jotai';
import styled from 'styled-components';
import { AddGraphNode, GraphNodesAtom } from '../atom';
import { NewGraphConditionNode, NewGraphNode } from './langgraph';

const Header = styled.div`
  background-color: #1f2937;
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
  p {
    margin: 0.25rem 0;
    cursor: pointer;
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
      <Header>
        <Title>LangGraph pseudo code 작성기</Title>
        <Instructions>
          <p onClick={handle_node_add}>🤖 <strong>Node 추가</strong></p>
          <p onClick={handle_condition_add}>🧞 <strong>Condition 추가:</strong></p>
        </Instructions>
      </Header>
    )
}