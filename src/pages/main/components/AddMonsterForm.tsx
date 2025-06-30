import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "../../../components/Card";
import { cn } from "@/lib/utils";
import { monsterForm, monsterFormSchema } from "../schema";
import { monsterImages } from "@/pages/utils/images";

const defaultValues = {
  name: "",
  image: "",
  health: 0,
  attack: 0,
  defense: 0,
  speed: 0,
}

export default function AddMonsterForm({
  handleSubmit,
  hasMonster = false
}: {
  handleSubmit?: (values: monsterForm) => void;
  hasMonster?: boolean;
}) {
  const form = useForm<monsterForm>({
    resolver: zodResolver(monsterFormSchema),
    defaultValues
  });

  function onSubmit(values: monsterForm) {
    const data = monsterFormSchema.safeParse(values);


    if (!data.success) {
      return;
    }


    form.reset(defaultValues);
    handleSubmit(values);
  }

  return (
    <Card className={cn("w-[600px] h-[500px] mx-auto", hasMonster ? "w-[500px]" : "")}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Monster</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monster Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter monster name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monster Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter monster image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="health"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Health Points</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      min={0}
                      max={100}
                      placeholder="Enter health (0-100)"
                      {...field}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Health value between 0 and 100</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attack</FormLabel>
                  <FormControl>
                    <Input
                      type="text"

                      placeholder="Enter attack value"
                      {...field}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="defense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Defense</FormLabel>
                  <FormControl>
                    <Input
                      type="text"

                      placeholder="Enter defense value"
                      {...field}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speed</FormLabel>
                  <FormControl>
                    <Input
                      type="text"

                      placeholder="Enter speed value"
                      {...field}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Add Monster
          </Button>
        </form>
      </Form>
    </Card>
  );
}
