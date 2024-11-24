'use client';
import { useLogin } from '@/app/hooks';
import { loginSchema } from '@/app/validations';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import { useFormik } from 'formik';

export default function Login() {
  const { login, loading, error } = useLogin();
  const { classes } = useStyles();

  const { handleSubmit, values, handleBlur, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        try {
          const res = await login(values);
          console.log('logged in:', res);
        } catch (e) {
          console.log(e);
        }
      },
    });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="you@email.com"
            required
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
          />

          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}
        </form>
      </Paper>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `"Greycliff CF", ${theme.fontFamily}`,
    fontWeight: 900,
  },
}));
