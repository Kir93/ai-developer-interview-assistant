import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import GoogleLoginButton from '@components/auth/GoogleLoginButton';

export default function Login() {
  const t = useTranslations('login');
  return (
    <Box maxW="md" mx="auto" mt="20" p="8" borderRadius="lg" boxShadow="md" bg="white">
      <VStack gap="6">
        <Heading size="lg" textAlign="center">
          {t('title')}
        </Heading>
        <Text textAlign="center" color="gray.600">
          {t('description')}
        </Text>
        <GoogleLoginButton />
      </VStack>
    </Box>
  );
}
