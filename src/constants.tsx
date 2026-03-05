import { Twitter, Instagram, Facebook } from 'lucide-react';
export const NAV_LINKS = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Become a Provider', href: '#providers' },
];

export const SERVICE_TAGS = ['Electricians', 'Plumbers', 'Cleaning', 'Appliance Repair'];

export const CATEGORIES = [
    { label: 'Home Cleaning', icon: 'Sparkles', href: '#' },
    { label: 'Plumbing', icon: 'Droplets', href: '#' },
    { label: 'Electrical', icon: 'Zap', href: '#' },
    { label: 'Carpentry', icon: 'Hammer', href: '#' },
    { label: 'Painting', icon: 'PaintBucket', href: '#' },
    { label: 'Appliance Repair', icon: 'WashingMachine', href: '#' },
    { label: 'Pest Control', icon: 'Bug', href: '#' },
    { label: 'Gardening', icon: 'Sprout', href: '#' },
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

export const HERO_CARDS = [
    {
        title: 'Home Cleaning',
        subtitle: 'DEEP & REGULAR CLEANING',
        offer: 'Starting ₹299',
        image: '/src/assets/hero_cleaning.png',
        href: '#',
    },
    {
        title: 'Repairs & Fixes',
        subtitle: 'PLUMBING, ELECTRICAL & MORE',
        offer: 'Starting ₹199',
        image: '/src/assets/hero_repairs.png',
        href: '#',
    },
    {
        title: 'Appliance Care',
        subtitle: 'AC, WASHING MACHINE & MORE',
        offer: 'Starting ₹399',
        image: '/src/assets/hero_appliance.png',
        href: '#',
    },
];

export const SERVICES_MENU = [
    { label: 'Home Cleaning', href: '#', description: 'Deep & regular cleaning for every room' },
    { label: 'Plumbing', href: '#', description: 'Leak fixes, pipe work & installations' },
    { label: 'Electrical', href: '#', description: 'Wiring, fittings & safety checks' },
    { label: 'Carpentry', href: '#', description: 'Furniture repair, assembly & custom builds' },
    { label: 'Painting', href: '#', description: 'Interior & exterior painting services' },
    { label: 'Appliance Repair', href: '#', description: 'AC, washing machine, fridge & more' },
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