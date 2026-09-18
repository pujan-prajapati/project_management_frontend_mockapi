import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { registerFormSchema } from "@/schema/RegisterSchem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomFormField } from "../commom-components/CustomFormField";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof registerFormSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("fullName", data.fullName);
      form.reset();
      navigate({ to: "/" });
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="overflow-hidden p-0 shadow-lg shadow-red-50">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            id="resgisterForm"
            className="p-6 md:p-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="text-balance text-muted-foreground">
                  Register for your TaskFlow account
                </p>
              </div>
              <CustomFormField
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
                disabled={isLoading}
                required
              />
              <CustomFormField
                control={form.control}
                name="password"
                label="Password"
                disabled={isLoading}
                type="password"
                required
              />
              <Field>
                <Button
                  size={"lg"}
                  type="submit"
                  className={"h-10"}
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="https://imgs.search.brave.com/Uh2a6wjc5I6IA2yLtsZGFZjxjNQj0-QaKt8Xc4gbi9M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2JsdWUtcHVy/cGxlLWdsb3NzeS1z/cXVhcmVzLWFic3Ry/YWN0LXRlY2gtYmFj/a2dyb3VuZC12ZWN0/b3ItZ2VvbWV0cmlj/LWRlc2lnbl84ODM0/My02NzY2LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
