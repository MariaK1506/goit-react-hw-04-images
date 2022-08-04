import PropTypes from 'prop-types';

import { WrapperContainer } from './Container.styled';

export const Container = ({ children }) => {
  return <WrapperContainer>{children}</WrapperContainer>;
};

Container.propTypes = {
  children: PropTypes.node,
};
