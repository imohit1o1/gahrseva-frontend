import heroRepairs from '../../assets/hero_repairs.png';
import heroAppliance from '../../assets/hero_appliance.png';

export function RightIllustration() {
    return (
        <div className="pointer-events-none absolute right-0 top-1/2 hidden h-full w-[45%] -translate-y-1/2 lg:block">
            <img
                src={heroRepairs}
                alt="Repairs"
                className="absolute right-[-22%] top-[-6%] h-[90%] w-auto object-contain z-0"
            />
            <img
                src={heroAppliance}
                alt="Appliance Care"
                className="absolute bottom-[1%] right-[-22%] h-[95%] w-auto z-10 object-contain"
            />
        </div>
    );
}
