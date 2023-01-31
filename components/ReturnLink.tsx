import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Text, Button, Link } from "@chakra-ui/react";

export default function ReturnLink({ textColor, gradient }: any) {
  return (
    <>
      <Text color={textColor} fontSize='xl' mb={6}>
        Feeling lost? You can get back to the main site here!
      </Text><Link href={process.env.NEXT_PUBLIC_MAIN_SITE_URL}>
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme='teal'
          bgGradient={gradient}
          variant='solid'
          size='lg'
        >
          Return
        </Button>
      </Link>
    </>
  );
}
