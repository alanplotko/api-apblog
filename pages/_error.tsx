import { WarningIcon } from '@chakra-ui/icons';
import { Box, useColorModeValue } from '@chakra-ui/react';
import type { NextPageContext } from 'next';
import ReturnLink from '@/components/ReturnLink';
import TitleHeader from '@/components/TitleHeader';

interface ErrorComponentProps {
	statusCode?: number;
}

function ErrorComponent({ statusCode }: ErrorComponentProps) {
  const textColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue('teal.600', 'teal.300');
  const gradient = useColorModeValue('linear(to-r, teal.400, teal.500, teal.600)', 'linear(to-r, teal.100, teal.200, teal.300)');

  return (
    <>
      <main>
        <Box textAlign='center' py={10} px={6}>
          <WarningIcon boxSize={'50px'} color={iconColor} />
          <TitleHeader gradient={gradient} title={`Error ${statusCode}`} />
          <ReturnLink textColor={textColor} gradient={gradient} />
        </Box>
      </main>
    </>
  );
}

ErrorComponent.getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default ErrorComponent;
