//CreateLink.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getClientUrl } from "@/lib/utils";
import { useCreateUrlMutation } from "@/services/url";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LinkSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  original_url: Yup.string().url("Invalid URL").required("URL is required"),
  custom_url: Yup.string(),
});

const CreateLink = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [createUrl] = useCreateUrlMutation();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (longLink) {
      setOpen(true);
    }
  }, [longLink]);

  return (
    <Dialog defaultOpen={open} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">
            <span className="text-gradient">Create Link</span>
          </DialogTitle>
        </DialogHeader>
        <Formik
          validationSchema={LinkSchema}
          initialValues={{
            title: "",
            original_url: longLink || "",
            custom_url: "",
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              const short_url = values.custom_url.trim().length
                ? `${values.custom_url}`
                : `${Math.random().toString(36).substr(2, 6)}`;
              createUrl({
                original_url: values.original_url,
                short_url,
                title: values.title,
              }).unwrap();

              toast.success("Link created successfully");
              resetForm();
              setOpen(false);
              setSearchParams({});
            } catch (error) {
              toast.error("Failed to create link");
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="relative">
                  <Label htmlFor="title">Short link title</Label>
                  <Input
                    id="title"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  {errors.title && touched.title && (
                    <span className="text-red-600 text-sm">{errors.title}</span>
                  )}
                </div>
                <div className="relative">
                  <Label htmlFor="original_url">Loooong URL</Label>
                  <Input
                    type="url"
                    id="original_url"
                    name="original_url"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.original_url}
                  />
                  {errors.original_url && touched.original_url && (
                    <span className="text-red-600 text-sm">
                      {errors.original_url}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Label htmlFor="custom_url">Custom URL</Label>
                  <div className="flex gap-2 items-center">
                    <div className="relative">
                      <Card className="rounded-md shadow-none">
                        <CardContent className="p-1.5 text-sm text-slate-400">
                          {getClientUrl()}/
                        </CardContent>
                      </Card>
                    </div>
                    <div className="relative grow">
                      <Input
                        id="custom_url"
                        name="custom_url"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.custom_url}
                      />
                      {errors.custom_url && touched.custom_url && (
                        <span className="text-red-600 text-sm">
                          {errors.custom_url}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
