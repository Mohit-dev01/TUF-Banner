"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Controller } from "react-hook-form";
import { Button } from "~/components/ui/button";
import RegisterAction from "./register-action";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
const schema = z
  .object({
    email: z
      .string({ required_error: "Please enter the email" })
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Please enter the password" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({
      required_error: "Please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { toast } = useToast();
const router = useRouter()
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    RegisterAction(data)
      .then((resp) => {
        toast({
          variant: "default",
          title: resp?.message,
        });
        router.push("/login")
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
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
                <label className="">Email</label>
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

              <div className="flex flex-col gap-1">
                <label>Confirm Password</label>
                <Controller
                  control={control}
                  name="confirmPassword"
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
                        {errors.confirmPassword && (
                          <p className="text-red-500">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              <Link className="text-center text-blue-400" href="/login">Login</Link>

              <Button className="mt-2">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default RegisterForm;
