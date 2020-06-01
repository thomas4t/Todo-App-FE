import React from "react";
import IconButton from "@material-ui/core/IconButton";
import RestoreIcon from "@material-ui/icons/Restore";
import styled from "styled-components";

const StyledClearBtn = styled(IconButton)`
  span {
    color: black;
  }
  :hover {
    span {
      color: #22558c;
    }
  }
`;

export default function (props) {
  return (
    <StyledClearBtn onClick={() => props.clearTodos()}>
      <RestoreIcon fontSize="default" />
    </StyledClearBtn>
  );
}
