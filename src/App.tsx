import styled from "styled-components"
import Logo from "./components/logo";
import Canvas from "./graph/canvas";

const MainBox = styled.div`
  width: 100hw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
const Title = styled.div`
  width: 100%;
  height: 100px;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
const FunctionBtns = styled.div`
  width: 30%;
  height: 80px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 24px;
  font-size: 14px;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    border: 1px solid darkgreen;
    border-radius: 18px;
    background-color: darkolivegreen;
    color: white;
    cursor: pointer;
    &:hover {
      color: lightseagreen;
    }
  }
`;
function App() {
  return (
    <MainBox>
      <Title>
        <Logo />
        LangGraph Online
        <FunctionBtns>
          <div>Python</div>
        </FunctionBtns>
      </Title>
      <Canvas />
    </MainBox>
  )
}

export default App

