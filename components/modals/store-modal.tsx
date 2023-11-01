"use client";

import * as z from "zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, "Tên tối thiểu phải có 2 ký tự!"),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);
      toast.success("Thêm mới thành công!");
      window.location.assign(`/${response.data.id}`);
    } catch (err) {
      toast.error("Lỗi không thể thêm sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm mới"
      description="Thêm mới vào danh mục sản phẩm của bạn"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tên danh mục sản phẩm của bạn"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center w-full pt-6 space-x-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={loading}
                >
                  Thoát
                </Button>
                <Button disabled={loading} type="submit">
                  Tiếp tục
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
