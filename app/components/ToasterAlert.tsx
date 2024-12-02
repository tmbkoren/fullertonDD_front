import { forwardRef, useImperativeHandle } from 'react';
import { useToast } from '@chakra-ui/react';

const ToasterAlert = forwardRef((_, ref) => {
  const toast = useToast();

  useImperativeHandle(ref, () => ({
    showToast: (message: string, status: 'success' | 'error' | 'info' | 'warning') => {
      toast({
        title: message,
        status,
        isClosable: true,
      });
    },
  }));

  return null;
});

ToasterAlert.displayName = 'ToasterAlert';

export default ToasterAlert;
