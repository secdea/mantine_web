"use client";

import { IconArrowLeft } from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Notification,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import toast from '@/utils/toast';
import fetchData from '@/utils/fetchData';
import { useForm, hasLength, isEmail } from '@mantine/form';
import useDelayedFalse from '@/hooks/useDelayedFalse';
import miscUtils from '@/utils/miscUtils';

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useDelayedFalse();
  const mForm = useForm({
    mode: 'uncontrolled',
    validate: {
      email: isEmail('Invalid email'),
    },
  });

  async function onSubmit(vValues: any) {
    var pNotificationID;
    setSuccess(false);
    try {
      setLoading(true);
      pNotificationID = toast.loading('loading', 'Please wait.');
      var pResult = await fetchData.PostData('/api/Login/AccountRecovery', {
        email: vValues.email
      })
      setSuccess(true);
      toast.success('Success', 'Please enter your email address and we will email you your username and a link for you to enter a new password.', pNotificationID);
    } catch (error) {
      console.log(miscUtils.getErrorMessage(error));
      toast.error('Failed', miscUtils.errorToListOrMessage(error), pNotificationID);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container size={460} my={30}>
      <Title ta="center">
        Forgot your password?
      </Title>
      <Text ta="center" mt="sm">
        Please enter your email address and we will email you your username and a link for you to enter a new password.
      </Text>

      <Paper withBorder shadow="md" p="xl" radius="md" my="xl">
        {success &&
          <Notification withCloseButton={false} hidden={true} title="Success" mb="lg">
            Your password recovery request was submitted successfully. Please check your email inbox for instructions.
          </Notification>
        }

        <form onSubmit={mForm.onSubmit(onSubmit)}>
          <TextInput key={mForm.key('email')}
            {...mForm.getInputProps('email')} label="Your email" placeholder="Enter your email here" required />
          <Group justify="space-between" mt="lg" >
            <Anchor c="dimmed" size="sm" component={Link} href="/login">
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button type='submit' loading={loading}>Reset password</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
