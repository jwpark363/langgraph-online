import styled from "styled-components";
import type { GraphNode } from "./langgraph"

const MainBox = styled.div<{$x?:number, $y?:number}>`
  position: fixed;
  top: ${props => props.$y ? `${props.$y + 200}px` : '50%'};
  right: ${props => props.$x ? `${props.$x}px` : '50%'};;
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
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
`;
const Label = styled.span`
  color: #9ca3af;
`;
const Value = styled.span`
  font-weight: bold;
`;
const Button = styled.button`
  margin-top: 12px;
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
interface NodeProps{
    node: GraphNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
}
export default function NodeInfo({node, onClick}:NodeProps){
    return(
        <MainBox $x={node.rect.x} $y={node.rect.y}>
          <Title>Rect {node.id} 정보</Title>
          <Row>
            <Label>ID:</Label>
            <Value>{node.id}</Value>
          </Row>
          <Row>
            <Label>X 좌표:</Label>
            <Value>{node.rect.x.toFixed(1)}</Value>
          </Row>
          <Row>
            <Label>Y 좌표:</Label>
            <Value>{node.rect.y.toFixed(1)}</Value>
          </Row>
          <Row>
            <Label>너비:</Label>
            <Value>{node.rect.width}</Value>
          </Row>
          <Row>
            <Label>높이:</Label>
            <Value>{node.rect.height}</Value>
          </Row>
          <Button onClick={onClick}> 닫기 </Button>
        </MainBox>
    )
}