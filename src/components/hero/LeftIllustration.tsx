import heroCleaning from '../../assets/hero_cleaning.png';

export function LeftIllustration() {
    return (
        <div className="pointer-events-none absolute left-0 top-1/2 hidden h-full w-[45%] -translate-y-1/2 lg:block">
            <img
                src={heroCleaning}
                alt="Cleaning Services"
                className="absolute left-[-20%] top-[42%] h-[90%] w-full -translate-y-1/2 object-contain"
            />
        </div>
    );
}
