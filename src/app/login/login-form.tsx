"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Controller } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";
import Link from "next/link";
import { revalidatePath } from "next/cache";
// import { authOptions } from "~/server/auth";
const schema = z.object({
  email: z
    .string({ required_error: "Please enter the email" })
    .email("Invalid email format"),
  password: z.string({ required_error: "Please enter the password" }),
});
const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const session = useSession();
  console.log(session);

  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof schema>) => {
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (signInData?.error) {
      toast({
        variant: "destructive",
        title: "Error while login",
      });

      console.log(signInData.error);
    } else {
      console.log("login ");
      toast({
        variant: "default",
        title: "Login Successfully",
      });
      router.replace("/dashboard");
      router.refresh();
    
    }

    reset;
  };
  const error = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <div className="px-5">
        <div className="mx-auto mt-20 w-full max-w-[350px] border-4 bg-slate-200">
          <form onSubmit={handleSubmit(onSubmit, error)}>
            <div className="flex w-full flex-col gap-2 p-5">
              <div className="flex w-full flex-col gap-1">
                <label>Email</label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <>
                        <input
                          className="w-full rounded-md border border-white p-1 focus:outline-none"
                          value={field.value}
                          onChange={field.onChange}
                          type="text"
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <p className="text-red-400">
                            {errors.email?.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Password</label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <>
                        <input
                          value={field.value}
                          onChange={field.onChange}
                          type="password"
                          placeholder="Enter your password"
                          className="w-full rounded-md border border-white p-1 focus:outline-none"
                        />
                        {errors.password && (
                          <p className="text-red-400">
                            {errors.password?.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              <Link className="text-center text-blue-400" href="/register">
                Create Account
              </Link>

              <Button className="mt-2">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
