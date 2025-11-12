import styled from "styled-components";
import type { Condition } from "./langgraph";

const Box = styled.div`
    width: 98%;
    background-color: #1f2937;
    border: 1px solid #374151;
    padding: 16px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
const Title = styled.h2`
    font-size: 18px;
    margin-bottom: 12px;
    border-bottom: 2px solid #374151;
    padding-bottom: 8px;
`;
const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 16px;
`;
interface CondProp{
    conditions: Condition[]
}
export default function ConditionDetail({conditions}:CondProp){
    return(
        <Box>
            <Row>
                <Title>key</Title>
                <Title>path</Title>
            </Row>
            {conditions.map((cond, index)=>(
                <Row key={index}>
                    <div>{cond.key}</div>
                    <div>{cond.nextNodeId}</div>
                </Row>
            ))}
        </Box>
    )
}