import styled from "styled-components";
import { Button } from "reactstrap";
import { AiFillFile, AiOutlineFileText, AiTwotoneEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";

export const HeaderContainer = styled.div`
  background-color: #293241;
  border-radius: 5px;
  padding: 10px;
`;

export const LabelInput = styled.label`
  padding: 4px;
  border-radius: 5px;
  color: white;
`;

export const Btn = styled(Button)`
  background-color: #586d8a;
  border: none;
  &&:hover {
    transition: 1s;
    background-color: #557093;
  }
`;

export const HeaderCard = styled.div`
  width: 100%;
  height: 60px;
  background-color: #293241;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px 3px 0 0;
`;

export const IconFile = styled(AiFillFile)`
  width: 20px;
  height: 20px;
  margin-left: 3px;
`;

export const IconTextFile = styled(AiOutlineFileText)`
  width: 20px;
  height: 20px;
`;

export const IconEdit = styled(AiTwotoneEdit)`
  width: 20px;
  height: 20px;
`;

export const IconTrash = styled(FiTrash)`
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
`;
