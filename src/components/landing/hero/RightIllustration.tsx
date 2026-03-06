import { HERO } from '../../../constants'

export function RightIllustration() {
    return (
        <div className="pointer-events-none absolute right-0 top-1/2 hidden h-full w-[45%] -translate-y-1/2 lg:block">
            <img
                src={HERO.right_blob}
                alt=""
                className="absolute right-[-12%] top-[8%] h-[90%] w-auto object-contain z-[-1]"
            />
            <img
                src={HERO.right_illustration_1}
                alt="Repairs"
                className="absolute right-[-12%] top-[8%] h-[65%] w-auto object-contain z-0"
            />
            <img
                src={HERO.right_illustration_2}
                alt="Appliance Care"
                className="absolute bottom-[12%] right-[-20%] h-[75%] w-auto z-10 object-contain"
            />
        </div>
    );
}
