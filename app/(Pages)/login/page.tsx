"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './AuthenticationImage.module.css';
import toast from "@/utils/toast";
import miscUtils from "@/utils/miscUtils";
import Link from "next/link";
import useDelayedFalse from "@/hooks/useDelayedFalse";
import { useForm } from '@mantine/form';

export default function AuthenticationImage() {
  const { login, status, user: userInfo } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useDelayedFalse();

  const mForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      baseUrl: '',
      password: ''
    }
  });

  useEffect(() => {
    console.log('userInfo in useEffect');
    console.log(userInfo);
  }, [userInfo]);

  async function onSubmit(vValues: any) {
    var pNotificationID;
    try {
      setLoading(true);
      pNotificationID = toast.loading('loading', 'Please wait while we log you in.');
      const ok = await login(vValues.username, vValues.password);
      if (ok) {
        console.log('ok');
        console.log(ok);
        toast.success('Success', 'Welcome ' + ok.firstName, pNotificationID);
        router.push("/");
      }
      else setMessage("Invalid credentials");
    } catch (error) {
      console.log(miscUtils.getErrorMessage(error));
      toast.error('Failed', miscUtils.getErrorMessage(error), pNotificationID);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Welcome back to Mantine!
        </Title>

        <form onSubmit={mForm.onSubmit(onSubmit)}>
          <TextInput label="Username" placeholder="Your username"
            key={mForm.key('username')}
            {...mForm.getInputProps('username')}
            size="md" radius="md" />
          <PasswordInput label="Password" key={mForm.key('password')}
              {...mForm.getInputProps('password')} 
              placeholder="Your password"  mt="md" size="md" radius="md" />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button type='submit' loading={loading} fullWidth mt="xl" size="md" radius="md">
            Login
          </Button>
        </form>
        <Text ta="center" mt="md">
          <Anchor component={Link} href="/forgotpassword" fw={500} >
            Forgot password?
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
