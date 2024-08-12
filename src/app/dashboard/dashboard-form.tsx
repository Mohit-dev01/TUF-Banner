"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { Switch } from "~/components/ui/switch";
import DashboardServerAction from "./dashboard-action";
import BannerServerAction from "./dashboard-action";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { before } from "node:test";
import { signOut } from "next-auth/react";
interface IData {
  description: string;
  date: Date;
  link: string;
  active: boolean;
}
import { addDays } from "date-fns";

const convertToUTC = (date: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return new Date(
      Date.UTC(
        addDays(new Date(), 1).getFullYear(),
        addDays(new Date(), 1).getMonth(),
        addDays(new Date(), 1).getDate(),
      ),
    );
  }
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
};
const schema = z.object({
  description: z.string({ required_error: "Please enter the description" }),
  date: z.date({ required_error: "Please select the date" }),
  link: z
    .string({ required_error: "Please enter the required link" })
    .url({ message: "Please enter the valid link" }),
  active: z.boolean().default(true),
});

const DashboardForm = ({
  description,
  date,
  link,
  active,
}: {
  description: string;
  date: Date;
  link: string;
  active: boolean;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: description,
      date: convertToUTC(date) || addDays(new Date(), 1),
      link: link,
      active: active,
    },
  });
  // console.log("defaultDate", date);
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("data", typeof data.date);
    const dataWithUTCDate = {
      ...data,
      date: convertToUTC(data.date),
    };
    BannerServerAction(dataWithUTCDate)
      .then((resp) => {
        toast({
          variant: "default",
          title: resp?.message,
        });
        router.push("/");
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

  const today = new Date();
  // set time to start of the day so that time will not create issue because we only want to compare the days
  today.setHours(0, 0, 0, 0);
  // setting matcher , before comes from react daypicker library which gives all the day before the particular date
  const disabledDays = [{ before: today }, today];
  return (
    <>
      <div className="px-5">
        <div className="mx-auto mt-20 w-full max-w-[350px] border-4 bg-slate-200">
          <form onSubmit={handleSubmit(onSubmit, error)}>
            <div className="flex w-full flex-col gap-2 p-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="description">Banner Description</label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <>
                        <textarea
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter the banner description"
                          className="w-full rounded-md border border-white p-1 focus:outline-none"
                        />{" "}
                        {errors.description && (
                          <p className="text-red-400">
                            {errors.description?.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                {/* <label htmlFor="date">Select Date</label> */}

                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => {
                    return (
                      <>
                        <Popover>
                          <div>
                            {field.value ? (
                              <div className="w-full rounded-md border border-white bg-white p-1 focus:outline-none">
                                {format(field.value, "PPP")}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <PopoverTrigger className="w-full">
                            <div className="flex w-full items-center rounded-md border border-white bg-slate-900 p-1 px-2 text-white focus:outline-none">
                              <span> Pick a date </span>
                              <FaCalendarAlt className="ml-auto h-4 w-4 opacity-50" />
                            </div>
                          </PopoverTrigger>
                          {errors.date && (
                            <p className="text-red-500">
                              {errors.date.message}
                            </p>
                          )}
                          <PopoverContent>
                            <Calendar
                              disabled={disabledDays}
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              className="rounded-md border"
                            />
                          </PopoverContent>
                        </Popover>
                      </>
                    );
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="link">Link to be redirected</label>
                <Controller
                  control={control}
                  name="link"
                  render={({ field }) => {
                    return (
                      <>
                        <input
                          value={field.value}
                          onChange={field.onChange}
                          type="text"
                          placeholder="Enter the link"
                          className="w-full rounded-md border border-white bg-white p-1 focus:outline-none"
                        />{" "}
                        {errors.link && (
                          <p className="text-red-500">{errors.link.message}</p>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              <div>
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => {
                    return (
                      <>
                        <div className="flex items-center gap-1">
                          {" "}
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />{" "}
                          <div>Banner Active ?</div>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
              <Button className="mt-5">Submit</Button>
            </div>
          </form>
          <div className="px-5">
            <Button
              className="w-full bg-red-500 hover:bg-red-500"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardForm;
