import styled from 'styled-components'

const ListIcon = () => {
  return <StyledListIcon src="/list.png" alt="List" />
}

const StyledListIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`

export { ListIcon }
