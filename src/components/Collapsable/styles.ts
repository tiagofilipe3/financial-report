import styled from 'styled-components'

type TStyledArrow = {
  $show: boolean
}

const StyledArrow = styled.img<TStyledArrow>`
  width: 12px;
  height: 12px;
  margin-right: 10px;
  cursor: pointer;
  transform: ${(props) => (props.$show ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease-in-out;
`

export { StyledArrow }
