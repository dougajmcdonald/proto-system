import styled from 'styled-components'

const BaseButton = styled.button`
  cursor: 'pointer';
  font-weight: 'bold';
  padding: ${({ theme }) => theme.size.base.m};
`

const VariantButton = styled(BaseButton)`  
  background-color: ${({theme, variant}) => theme.color.background.button[variant]};
  border: 2px solid ${({theme, variant}) => theme.color.border.button[variant]};   
  color: ${({theme, variant}) => theme.color.font.button[variant]};  
`


export default VariantButton