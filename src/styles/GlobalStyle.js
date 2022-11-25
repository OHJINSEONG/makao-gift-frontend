import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    list-style-type: none;
    text-decoration: none;
  }

  button {
    border : none;
  }

  a{
    color: black;
  }
`;

export default GlobalStyle;
