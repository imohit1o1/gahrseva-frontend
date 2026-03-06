import { Twitter, Instagram, Facebook, LayoutDashboard, LogOut } from 'lucide-react';

export const LOGO = {
    icon: '/src/assets/logo/gharseva-logo.webp',
    full: '/src/assets/logo/full-gharseva-logo.webp'
};

export const HERO = {
    left_illustration: '/src/assets/hero/left_illustrations/hero_cleaning.webp',
    left_blob: '/src/assets/hero/left_illustrations/left_blob.webp',
    right_illustration_1: '/src/assets/hero/right_illustrations/hero_repairs.webp',
    right_illustration_2: '/src/assets/hero/right_illustrations/hero_appliance.webp',
    right_blob: '/src/assets/hero/right_illustrations/right_blob.webp',
}

export const CATEGORIES_LIST = [
    { label: 'Home Cleaning' },
    { label: 'Plumbing' },
    { label: 'Electrical' },
    { label: 'Carpentry' },
    { label: 'Painting' },
    { label: 'Appliance Repair' },
    { label: 'Pest Control' },
    { label: 'Gardening' },
];

export const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/service-categories' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];
export const CTA = [
    { label: 'Become a Service Provider', href: '/register/service-provider' },
    { label: 'Browse Services', href: '/service-providers' },
    { label: 'Dashboard', href: '/dashboard' }
];

export const PROFILE_DROPDOWN = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={14} /> },
    { label: 'Logout', href: '/', icon: <LogOut size={14} />, variant: 'destructive' }
];

export const SERVICE_TAGS = ['Electricians', 'Plumbers', 'Cleaning', 'Appliance Repair'];

export const CATEGORIES = [
    { label: 'Home Cleaning', image: '/src/assets/categories/cat_cleaning.webp', href: '/service-providers' },
    { label: 'Plumbing', image: '/src/assets/categories/cat_plumbing.webp', href: '/service-providers' },
    { label: 'Electrical', image: '/src/assets/categories/cat_electrical.webp', href: '/service-providers' },
    { label: 'Carpentry', image: '/src/assets/categories/cat_carpentry.webp', href: '/service-providers' },
    { label: 'Painting', image: '/src/assets/categories/cat_painting.webp', href: '/service-providers' },
    { label: 'Appliance Repair', image: '/src/assets/categories/cat_appliance.webp', href: '/service-providers' },
    { label: 'Pest Control', image: '/src/assets/categories/cat_pest_control.webp', href: '/service-providers' },
    { label: 'Gardening', image: '/src/assets/categories/cat_gardening.webp', href: '/service-providers' },
];

export const PROBLEM_POINTS = [
    { label: 'Hidden pricing', description: 'Unexpected costs creeping in after the job is done.', icon: 'EyeOff' },
    { label: 'Unverified professionals', description: 'Strangers in your home without background checks.', icon: 'ShieldAlert' },
    { label: 'Delayed services', description: 'Professionals arriving late or constantly rescheduling.', icon: 'Clock' },
];

export const SOLUTION_POINTS = [
    { label: 'Verified professionals', description: 'Every worker is strictly vetted and background-checked.', icon: 'UserCheck' },
    { label: 'Transparent pricing', description: 'Know the exact cost before the job begins. No surprises.', icon: 'CreditCard' },
    { label: 'Secure payments', description: 'Pay safely online or after the service is completed.', icon: 'ShieldCheck' },
    { label: 'Service guarantee', description: 'Not satisfied? We will redo the work free of charge.', icon: 'ThumbsUp' },
];

export const HOW_IT_WORKS = [
    { title: 'Choose Service', description: 'Select from our wide range of professional home services.', icon: 'MousePointerClick' },
    { title: 'Select Time Slot', description: 'Pick a date and time that fits your schedule perfectly.', icon: 'CalendarDays' },
    { title: 'Professional Visits', description: 'Sit back and relax while our expert gets the job done.', icon: 'Home' },
];

export const SOCIAL_PROOF = [
    { stat: '4.8/5', label: 'Rating from 2,000+ customers', icon: 'Star' },
    { stat: '500+', label: 'Verified professionals', icon: 'UserCheck' },
    { stat: '10,000+', label: 'Services completed', icon: 'CheckCircle2' },
];

export const TRUST_BADGES = [
    { label: 'Verified Professionals' },
    { label: 'Transparent Pricing' },
    { label: 'Same Day Service' },
];

export const CATEGORIES_MENU = [
    {
        title: 'Home Maintenance',
        items: [
            { label: 'Plumbing', href: '/service-providers?category=Plumbing', description: 'Fix leaks, taps, and pipes' },
            { label: 'Electrical', href: '/service-providers?category=Electrical', description: 'Wiring, shocks, and installations' },
            { label: 'Carpentry', href: '/service-providers?category=Carpentry', description: 'Furniture repair and assembly' },
        ]
    },
    {
        title: 'Cleaning & Pest',
        items: [
            { label: 'Home Cleaning', href: '/service-providers?category=Home+Cleaning', description: 'Deep and regular house cleaning' },
            { label: 'Pest Control', href: '/service-providers?category=Pest+Control', description: 'Termite and bug treatments' },
            { label: 'Gardening', href: '/service-providers?category=Gardening', description: 'Lawn care and maintenance' },
        ]
    },
    {
        title: 'Appliance & Others',
        items: [
            { label: 'Appliance Repair', href: '/service-providers?category=Appliance+Repair', description: 'AC, Fridge, Washing Machine' },
            { label: 'Painting', href: '/service-providers?category=Painting', description: 'Interior and exterior painting' },
        ]
    }
];


export const FOOTER_LINKS = {
    Services: ['Home Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting'],
    Company: ['About Us', 'Careers', 'Press', 'Blog'],
    Support: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
};

export const SOCIAL_LINKS = [
    { label: 'Twitter / X', href: '#', icon: <Twitter size={18} /> },
    { label: 'Instagram', href: '#', icon: <Instagram size={18} /> },
    { label: 'Facebook', href: '#', icon: <Facebook size={18} /> },
];

export const MOCK_SERVICE_PROVIDERS = [
    {
        id: '1',
        name: 'John Doe',
        category: 'Plumbing',
        rating: 4.8,
        reviews: 124,
        experience: '8 years',
        price: '₹199',
        image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=200&h=200&auto=format&fit=crop',
        is_featured: true,
        is_available: true,
        location: 'Sector 62, Noida',
        description: 'Expert plumber specializing in leak repairs and pipe installations.',
        reviews_list: [
            { user: 'Sanjay K.', rating: 5, text: 'Very professional, fixed my sink in an hour.' },
            { user: 'Amit R.', rating: 4, text: 'Good service.' }
        ]
    },
    {
        id: '2',
        name: 'Jane Smith',
        category: 'Home Cleaning',
        rating: 4.9,
        reviews: 210,
        experience: '5 years',
        price: '₹299',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&h=200&auto=format&fit=crop',
        is_featured: true,
        is_available: true,
        location: 'Alpha 2, Greater Noida',
        description: 'Professional cleaner for residential and commercial spaces.',
        reviews_list: [
            { user: 'Priya M.', rating: 5, text: 'Absolutely spotless cleaning! Highly recommended.' }
        ]
    },
    {
        id: '3',
        name: 'Mike Johnson',
        category: 'Electrical',
        rating: 4.7,
        reviews: 89,
        experience: '10 years',
        price: '₹249',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&h=200&auto=format&fit=crop',
        is_featured: true,
        is_available: false,
        location: 'Indirapuram, Ghaziabad',
        description: 'Licensed electrician for all home wiring and safety checks.',
        reviews_list: [
            { user: 'Rahul V.', rating: 4, text: 'Very knowledgeable and followed all safety protocols.' }
        ]
    },
    {
        id: '4',
        name: 'Sarah Wilson',
        category: 'Painting',
        rating: 4.6,
        reviews: 156,
        experience: '6 years',
        price: '₹499',
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=200&h=200&auto=format&fit=crop',
        is_featured: true,
        is_available: true,
        location: 'Sector 18, Noida',
        description: 'Creative painter with an eye for detail and color harmony.',
        reviews_list: [
            { user: 'Anita S.', rating: 5, text: 'Beautiful paint job in my living room.' }
        ]
    },
    {
        id: '5',
        name: 'Ravi Kumar',
        category: 'Appliance Repair',
        rating: 4.8,
        reviews: 67,
        experience: '4 years',
        price: '₹349',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=200&h=200&auto=format&fit=crop',
        is_featured: false,
        is_available: true,
        location: 'Crossing Republik, Ghaziabad',
        description: 'Specialist in AC and washing machine repairs.',
        reviews_list: [
            { user: 'Vikram B.', rating: 5, text: 'Fixed my AC promptly during peak summer.' }
        ]
    },
    {
        id: '6',
        name: 'Sunita Sharma',
        category: 'Pest Control',
        rating: 4.5,
        reviews: 42,
        experience: '7 years',
        price: '₹599',
        image: 'https://images.unsplash.com/photo-1584820927508-ea24cc8562d5?q=80&w=200&h=200&auto=format&fit=crop',
        is_featured: false,
        is_available: true,
        location: 'Omega 1, Greater Noida',
        description: 'Effective and safe pest control services for your entire home.',
        reviews_list: [
            { user: 'Neha Gupta', rating: 4, text: 'Good service, no more ants in the kitchen.' }
        ]
    }
];

export const TESTIMONIALS = [
    {
        review: "The plumber arrived within 30 minutes and fixed our leaking pipe perfectly. Very professional and tidy!",
        user: "Anjali Gupta",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
        location: "Noida, Sector 62"
    },
    {
        review: "Spotless cleaning! My house looks brand new. The team was punctual and used eco-friendly products.",
        user: "Vikram Malhotra",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
        location: "Gurugram, Phase 5"
    },
    {
        review: "Highly skilled electrician. He explained the issue clearly and fixed our wiring fault in no time. Great value!",
        user: "Priya Sharma",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        location: "South Delhi, GK"
    },
    {
        review: "Excellent painting service. They helped us choose the right colors and the finish is absolutely smooth.",
        user: "Arjun Reddy",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
        location: "Alpha 2, Greater Noida"
    },
    {
        review: "Finding a reliable carpenter was so hard until I used GharSeva. Fixed all my broken furniture in one go!",
        user: "Sneha Kapoor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
        location: "Indirapuram, Ghaziabad"
    }
];

export const FAQS = [
    {
        question: "What is GharSeva?",
        answer: "GharSeva is a premier home services platform that connects verified professionals with homeowners for services like cleaning, plumbing, electrical work, and more."
    },
    {
        question: "How do I book a service?",
        answer: "You can book a service by selecting a category, choosing a professional based on ratings and reviews, and picking a convenient time slot."
    },
    {
        question: "Are the professionals verified?",
        answer: "Yes, every professional on GharSeva undergoes a strict vetting process, including background checks and skill assessments, to ensure your safety and quality of service."
    },
    {
        question: "What if I am not satisfied with the service?",
        answer: "We offer a 100% satisfaction guarantee. If you're not happy with the work, we'll send someone to redo it at no extra cost."
    },
    {
        question: "How do I pay for the services?",
        answer: "You can pay securely online through our platform or opt for cash on delivery after the service is completed."
    }
];