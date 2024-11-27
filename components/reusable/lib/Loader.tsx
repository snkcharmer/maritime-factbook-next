import { LoadingOverlay } from '@mantine/core';
import React from 'react';

const Loader = () => {
  return (
    <LoadingOverlay
      visible={true}
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
    />
  );
};

export default Loader;
