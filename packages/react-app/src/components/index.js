import styled from "styled-components";

export const Header = styled.header`
  /* background-color: #282c34; */
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;

export const Body = styled.div`
  align-items: center;
  /* background-color: #282c34; */
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  /* justify-content: center; */
  min-height: calc(100vh - 70px);
`;


