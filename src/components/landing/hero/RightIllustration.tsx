import { HERO } from '../../../constants'

export function RightIllustration() {
    return (
        <div className="pointer-events-none absolute right-0 top-1/2 hidden h-full w-[45%] -translate-y-1/2 lg:block">
            <img
                src={HERO.right_blob}
                alt=""
                className="absolute right-[-20%] top-[16%] h-[90%] w-auto object-contain z-[-1]"
            />
            <img
                src={HERO.right_illustration_1}
                alt="Repairs"
                className="absolute right-[-35%] top-[8%] h-[65%] w-auto object-contain z-0"
            />
            <img
                src={HERO.right_illustration_2}
                alt="Appliance Care"
                className="absolute bottom-[4%] right-[-40%] h-[75%] w-auto z-10 object-contain"
            />
        </div>
    );
}
