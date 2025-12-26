import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import ProminentAppBar from './ProminentAppBar';
import Tabs from './Tabs';

const AppContainer = ({ children, showTabs = true }) => {
  return (
    <Box>
      <Container
        maxWidth='lg'
        disableGutters
        sx={{
          px: { xs: 0, sm: 2, md: 3 },
        }}
      >
        <ProminentAppBar />
        {showTabs && <Tabs />}
      </Container>
      <Container
        maxWidth='lg'
        disableGutters
        sx={{
          px: { xs: 0, sm: 2, md: 3 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showTabs: PropTypes.bool,
};

export default AppContainer;
