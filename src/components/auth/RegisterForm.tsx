import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { useAuth } from "@/hooks/useAuth"
import { registerSchema, type RegisterValues } from "@/schemas/auth"

export function RegisterForm() {
    const { register, isLoading, error } = useAuth()

    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: RegisterValues) => {
        await register(values.email, values.password)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium text-center">
                    {error}
                </div>
            )}

            <Field orientation="vertical">
                <FieldLabel required>Email Address</FieldLabel>
                <FieldContent>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                        <Input
                            placeholder="john@example.com"
                            className="pl-10 h-11 bg-muted/50 border-transparent focus:bg-background transition-all rounded-xl"
                            {...form.register("email")}
                        />
                    </div>
                    <FieldError errors={[form.formState.errors.email]} />
                </FieldContent>
            </Field>

            <Field orientation="vertical">
                <FieldLabel required>Password</FieldLabel>
                <FieldContent>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-11 bg-muted/50 border-transparent focus:bg-background transition-all rounded-xl"
                            {...form.register("password")}
                        />
                    </div>
                    <FieldError errors={[form.formState.errors.password]} />
                </FieldContent>
            </Field>

            <Button
                type="submit"
                className="w-full h-11 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        Create Account
                        <ArrowRight className="ml-2 size-4" />
                    </>
                )}
            </Button>
        </form>
    )
}
