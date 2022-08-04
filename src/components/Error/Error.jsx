import PropTypes from 'prop-types';
import { Message } from './Error.styled';

const Error = ({ message }) => {
  return <Message>{message}</Message>;
};

export default Error;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
