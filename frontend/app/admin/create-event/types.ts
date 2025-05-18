import { z } from "zod";
import { formSchema } from "./page";

export interface Branch {
    branch_id: number;
    branch_name: string;
  }
export type FormValues = z.infer<typeof formSchema>;
