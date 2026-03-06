import { useAuth } from '../../hooks/useAuth';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../ui/dialog';
import { LOGO } from '../../constants';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export function AuthDialog() {
    const {
        isAuthDialogOpen,
        closeAuthDialog,
        authDialogView,
        setAuthDialogView,
    } = useAuth();

    const isLogin = authDialogView === 'login';

    return (
        <Dialog open={isAuthDialogOpen} onOpenChange={(open) => !open && closeAuthDialog()}>
            <DialogContent className="sm:max-w-[420px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                <div className="relative bg-background">
                    {/* Header/Banner Area */}
                    <div className="h-28 bg-primary/10 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
                        </div>
                        <img src={LOGO.full} alt="GharSeva" className="h-10 w-32 object-cover relative z-10" />
                    </div>

                    <div className="p-6">
                        <DialogHeader className="space-y-1 mb-6">
                            <DialogTitle className="text-2xl font-extrabold tracking-tight text-center">
                                {isLogin ? 'Welcome Back!' : 'Join GharSeva'}
                            </DialogTitle>
                            <DialogDescription className="text-center text-sm text-muted-foreground">
                                {isLogin
                                    ? 'Sign in to access your account and bookings.'
                                    : 'Create an account to get started with home services.'}
                            </DialogDescription>
                        </DialogHeader>

                        {isLogin ? <LoginForm /> : <RegisterForm />}

                        <div className="mt-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                                <button
                                    onClick={() => setAuthDialogView(isLogin ? 'register' : 'login')}
                                    className="text-primary font-bold hover:underline underline-offset-4"
                                >
                                    {isLogin ? 'Sign up free' : 'Sign in here'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
