import { Link } from '@tanstack/react-router';
import { LOGO, NAV_LINKS } from '../../../constants';

export function NavLogo() {
    return (
        <Link to={NAV_LINKS[0].href} className="flex shrink-0 items-center">
            <img
                src={LOGO.full}
                alt="GharSeva"
                className="h-10 w-32 object-cover"
            />
        </Link>
    );
}
