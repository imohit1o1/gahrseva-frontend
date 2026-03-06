import { HERO } from '../../../constants'

export function LeftIllustration() {
    return (
        <div className="pointer-events-none absolute left-0 top-1/2 hidden h-full w-[45%] -translate-y-1/2 lg:block">
            <img
                src={HERO.left_blob}
                alt=""
                className="absolute left-[-22%] top-[42%] h-[80%] w-full -translate-y-1/2 object-contain z-[-1]"
            />
            <img
                src={HERO.left_illustration}
                alt="Cleaning Services"
                className="absolute left-[-20%] top-[42%] h-[65%] w-full -translate-y-1/2 object-contain"
            />
        </div>
    );
}
