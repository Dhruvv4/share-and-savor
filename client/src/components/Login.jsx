import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { loginSchema } from "@/lib/schemas";

function Login() {
  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  function onSubmit(values) {
    // TODO: Once authentication is implemented, this will be the place to call the API to login the user.
    console.log(values);
  }

  return (
    <div className="flex flex-col h-full p-28 items-center gap-10">
      <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border-2 p-4 rounded-xl w-full max-w-lg"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                {!form?.formState?.errors?.email && (
                  <FormDescription>Enter your email</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                {!form?.formState?.errors?.password && (
                  <FormDescription>Enter your password</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <span className="text-sm">
              Don't have an account?{" "}
              <Link className="text-blue-400" to={"/register"}>
                Register
              </Link>
            </span>
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
