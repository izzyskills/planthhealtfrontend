import { toast } from "sonner";

export function handleErrors(message: string | null) {
  if (message) {
    toast("Uh oh! Something went wrong.", {
      description: message,
    });
  } else {
    toast("Uh oh! Something went wrong.", {
      description: "Please try again later.",
    });
  }
}
