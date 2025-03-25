"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const FormSchema = z.object({
  title: z.string(),
  location: z.string(),
  severity: z.string(),
  status: z.string(),
  description: z.string().optional(),
  help: z.string().optional(),
});
type FormValues = z.infer<typeof FormSchema>;

const CrisisForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const apiCall = useMutation(api.crisis.CreateCrisisData);
  const viewable = false;
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      location: "",
      severity: "",
      status: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitted(true);
    
    try {
      console.log(data);
      const setData = apiCall({
        title: data.title,
        location: data.location,
        severity: data.severity,
        status: data.status,
        viewable: viewable,
        description: data.description,
        help: data.help,
      });
    } catch (error) {
      form.setError("root", {
        message: "Something went wrong",
      });
      console.log(error);
    }
  }

  useEffect(() => {
    if (isSubmitted) {
      form.reset();
      setIsSubmitted(false);
    }
  }, [isSubmitted, form.reset]);

  return (
    <div className="pb-40">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] mx-auto space-y-8"
        >
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-medium">Create crisis data.</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (

                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel className="min-w-[10%]">
                      Title <span className="text-red-600">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel className="min-w-[10%]">
                      Location <span className="text-red-600">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel className="min-w-[10%]">
                      Severity <span className="text-red-600">*</span>{" "}
                    </FormLabel>
                    <Select onValueChange= {field.onChange} defaultValue= {field.value} >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Current level of severity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="first" className="capitalize">first</SelectItem>
                        <SelectItem value="second" className="capitalize">second</SelectItem>
                        <SelectItem value="third" className="capitalize">third</SelectItem>
                    </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel className="min-w-[10%]">
                      Status <span className="text-red-600">*</span>{" "}
                    </FormLabel>
                    <Select onValueChange= {field.onChange} defaultValue= {field.value} >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Current status of crisis" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="fog" className="capitalize">fog</SelectItem>
                        <SelectItem value="flood" className="capitalize">flood</SelectItem>
                        <SelectItem value="landslide" className="capitalize">landslide</SelectItem>
                        <SelectItem value="storm" className="capitalize">storm</SelectItem>
                        <SelectItem value="rain" className="capitalize">rain</SelectItem>
                    </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel className="min-w-[10%]">Description</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="help"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel className="min-w-[10%]">Help</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting ? "Creating.." : "Submit"}</Button>
          {form.formState.errors.root && <div>{form.formState.errors.root.message}</div>}
        </form>
      </Form>
    </div>
  );
};

export default CrisisForm;
