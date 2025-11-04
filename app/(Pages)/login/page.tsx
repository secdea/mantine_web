"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function AuthenticationImage() {
  const { login, status } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    var pNotificationID;
    try {
      pNotificationID = toast.loading('loading', 'Please wait while we log you in.');
      const ok = await login(user, pass);
      if (ok) {
        toast.success('Success', 'Welcome', pNotificationID);
        router.push("/");
      }
      else setMessage("Invalid credentials");
    } catch (error) {
      console.log(miscUtils.getErrorMessage(error));
      toast.error('Failed', miscUtils.getErrorMessage(error), pNotificationID);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Welcome back to Mantine!
        </Title>

        <TextInput label="Username" placeholder="Your username" value={user} onChange={(e) => setUser(e.currentTarget.value)} size="md" radius="md" />
        <PasswordInput label="Password" placeholder="Your password" value={pass} onChange={(e) => setPass(e.currentTarget.value)} mt="md" size="md" radius="md" />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button onClick={handleLogin} fullWidth mt="xl" size="md" radius="md">
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
