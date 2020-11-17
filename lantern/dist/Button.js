import styled from 'styled-components';
const BaseButton = styled.button`
  cursor: 'pointer';
  font-weight: 'bold';
`;

const getVariantStyles = ({
  theme,
  variant
}) => {
  let variantStyles;

  switch (variant) {
    case 'primary':
      variantStyles = theme => `
            background-color: ${theme.color.background.button.primary};
            border: 2px solid ${theme.color.border.button.primary};   
            color: ${theme.color.font.button.primary};      
          `;

      break;

    case 'secondary':
      variantStyles = theme => `
            background-color: ${theme.color.background.button.secondary};
            border: 2px solid ${theme.color.border.button.secondary};   
            color: ${theme.color.font.button.secondary};    
          `;

      break;

    case 'tertiary':
      variantStyles = theme => `
            background-color: ${theme.color.background.button.tertiary};
            border: 2px solid ${theme.color.border.button.tertiary};   
            color: ${theme.color.font.button.tertiary};
          `;

      break;

    default:
      break;
  }

  return variantStyles;
};

const VariantButton = styled(BaseButton)`
  ${props => getVariantStyles(props.theme, props.variant)};
`;
export default VariantButton;