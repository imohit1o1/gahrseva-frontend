import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mb-2">
                    Page Not Found
                </p>
                <p className="text-gray-600 mb-8 max-w-md">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={() => navigate({ to: '/' })}
                        className="bg-primary hover:bg-primary/90"
                    >
                        Go Home
                    </Button>
                    <Button
                        onClick={() => navigate({ to: '/service-providers' })}
                        variant="outline"
                    >
                        Browse Services
                    </Button>
                </div>
            </div>
        </div>
    );
}
