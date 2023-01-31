import { Box, useColorModeValue } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import ReturnLink from '@/components/ReturnLink';
import TitleHeader from '@/components/TitleHeader';

export default function Home() {
  const textColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue('teal.600', 'teal.300');
  const gradient = useColorModeValue('linear(to-r, teal.400, teal.500, teal.600)', 'linear(to-r, teal.100, teal.200, teal.300)');

  return (
    <>
      <Box textAlign='center' py={10} px={6}>
        <CheckCircleIcon boxSize={'50px'} color={iconColor} />
        <TitleHeader gradient={gradient} title="API Online" />
        <ReturnLink textColor={textColor} gradient={gradient} />
      </Box>
    </>
  );
}
