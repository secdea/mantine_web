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

export default function AuthenticationImage() {
  const { login, status, user: userInfo } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=> {
    console.log('userInfo in useEffect');
    console.log(userInfo);
  }, [userInfo]);

  const handleLogin = async () => {
    var pNotificationID;
    try {
      pNotificationID = toast.loading('loading', 'Please wait while we log you in.');
      const ok = await login(user, pass);
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
          <Anchor component={Link} href="/forgotpassword" fw={500} >
            Forgot password?
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
