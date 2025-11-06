"use client";

import { IconArrowLeft } from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import toast from '@/utils/toast';
import fetchData from '@/utils/fetchData';

export default function ForgotPassword() {
  const [email, setEmail] = useState();

  async function onClick() {
    // var pNotificationID;
    // try {
    //   pNotificationID = toast.loading('loading', 'Please wait.');
    //   fetchData.PostData()
    //   const ok = await login(user, pass);
    //   if (ok) {
    //     console.log('ok');
    //     console.log(ok);
    //     toast.success('Success', 'Welcome ' + ok.firstName, pNotificationID);
    //     router.push("/");
    //   }
    //   else setMessage("Invalid credentials");
    // } catch (error) {
    //   console.log(miscUtils.getErrorMessage(error));
    //   toast.error('Failed', miscUtils.getErrorMessage(error), pNotificationID);
    // }
  }

  return (
    <Container size={460} my={30}>
      <Title ta="center">
        Forgot your password?
      </Title>
      <Text ta="center" mt="sm">
        Please enter your email address and we will email you your username and a link for you to enter a new password.
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput value={email} label="Your email" placeholder="Enter your email here" required />
        <Group justify="space-between" mt="lg" >
          <Anchor c="dimmed" size="sm" component={Link} href="/login">
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button onClick={onClick}>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
}
