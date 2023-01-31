import { Heading } from "@chakra-ui/react";

export default function PageHeader({ gradient, title }: any) {
  return (
    <Heading as='h2' size='xl' bgGradient={gradient} backgroundClip='text' mt={6} mb={2}>
      {title}
    </Heading>
  );
}
