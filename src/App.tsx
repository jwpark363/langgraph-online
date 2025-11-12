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
  font-size: 28px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin: 20px 0px;
`;
function App() {
  return (
    <MainBox>
      <Title>
        <Logo />
        LangGraph Online
      </Title>
      <Canvas />
    </MainBox>
  )
}

export default App

