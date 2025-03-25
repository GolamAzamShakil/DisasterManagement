"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "../ui/switch";
import { CrisisDataModelAdmin } from "@/model/dataInterfaces";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

interface CrisisFormProps<TData> {
  value: TData[];
}
export const FormSchemaA = z.object({
  _id: z.any(),
  title: z.string(),
  location: z.string(),
  severity: z.string(),
  status: z.string(),
  description: z.string().optional(),
  help: z.string().optional(),
  viewable: z.string(),
});
export type FormValuesA = z.infer<typeof FormSchemaA>;

function AdminCrisisForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const apiCall = useMutation(api.crisis.CreateCrisisData);
  const apiCallUpdate = useMutation(api.crisis.UpdateViewableField)
  let viewable: boolean = false;
  const form = useForm<FormValuesA>({
    resolver: zodResolver(FormSchemaA),
    defaultValues: {
      title: "",
      location: "",
      severity: "",
      status: "",
    },
  });

  function onSubmit(data: FormValuesA) {
    //setIsSubmitted(true);
    let boolValue: boolean = false;
    if(data.viewable === "true") {
      boolValue = true
    }
    if(data.viewable === "false") {
      boolValue = false
    }

    try {
      console.log(boolValue);
      const updateData = apiCallUpdate({
        _id: data._id,
        viewable: boolValue
      });
    } catch (error) {
      form.setError("root", {
        message: "Something went wrong",
      });
      console.log(error);
    }
    //console.log(data)
  }

  useEffect(() => {
    if (isSubmitted) {
      form.reset(); 
      setIsSubmitted(false);
    }
  }, [isSubmitted, form.reset]);



  return (
    <div className="mx-auto">
      <div>
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <div className="flex flex-col">
                  <h3 className="mb-4 text-lg font-medium">
                    Edit crisis data.
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="_id"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="min-w-[10%]">
                            ID <span className="text-red-600">*</span>{" "}
                          </FormLabel>
                          <FormDescription>Copy full ID from above table and paste here.</FormDescription>
                          <FormControl>
                            <Input
                              className="max-w-[60%]"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="viewable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="min-w-[10%] capitalize">
                            viewable <span className="text-red-600">*</span>{" "}
                          </FormLabel>
                          <FormDescription>To be viewed or not.</FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="min-w-[60%]">
                                <SelectValue placeholder="Viewable status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="true" className="capitalize">
                                true
                              </SelectItem>
                              <SelectItem value="false" className="capitalize">
                                false
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                  </div>
                </div>
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting ? "Creating.." : "Submit"}
                </Button>
                {form.formState.errors.root && (
                  <div>{form.formState.errors.root.message}</div>
                )}
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter className="flex flex-row justify-end">
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}

export default AdminCrisisForm;
