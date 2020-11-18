import styled from 'styled-components'

const StyledButton = styled.button`
  color: ${({ theme }) => theme.color.base.gray[800] };
  border: 2px solid ${({ theme }) => theme.color.base.gray[800]};
  background: ${({ theme }) => theme.color.brand.primary};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`

export default StyledButton