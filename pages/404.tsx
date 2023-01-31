import { WarningIcon } from '@chakra-ui/icons';
import { Box, useColorModeValue } from '@chakra-ui/react';
import ReturnLink from '@/components/ReturnLink';
import TitleHeader from '@/components/TitleHeader';

// Reuse generic error page (_error.tsx) for 404 error page as an optimization
// See https://nextjs.org/docs/messages/custom-error-no-custom-404
export default function Error404Component() {
  const textColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue('teal.600', 'teal.300');
  const gradient = useColorModeValue('linear(to-r, teal.400, teal.500, teal.600)', 'linear(to-r, teal.100, teal.200, teal.300)');

  return (
    <>
      <main>
        <Box textAlign='center' py={10} px={6}>
          <WarningIcon boxSize={'50px'} color={iconColor} />
          <TitleHeader gradient={gradient} title="Error 404: Not Found" />
          <ReturnLink textColor={textColor} gradient={gradient} />
        </Box>
      </main>
    </>
  );
}
