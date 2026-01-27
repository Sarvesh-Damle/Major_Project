import { Link, useLocation } from 'react-router-dom';
import { HiChevronRight, HiHome } from 'react-icons/hi';

const routeLabels = {
  hostels: 'Hostels',
  pgs: 'PGs',
  flats: 'Flats',
  map: 'Map View',
  profile: 'Profile',
  contact: 'Contact',
  team: 'Team',
  signin: 'Sign In',
  signup: 'Sign Up',
  list: 'List Property',
  owner: 'Property Owner',
  students: 'Students',
  dashboard: 'Dashboard',
  users: 'Users',
  'edit-user': 'Edit User',
  'edit-hostel': 'Edit Hostel',
  'edit-pg': 'Edit PG',
  'edit-flat': 'Edit Flat',
  'reset-password': 'Reset Password',
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;

    // Use route label or capitalize the segment (for dynamic IDs, show a short version)
    const label = routeLabels[segment] || (
      segment.length > 20 ? segment.slice(0, 8) + '...' : segment
    );

    return { label, path, isLast };
  });

  return (
    <nav aria-label='Breadcrumb' className='w-full px-6 py-3 bg-gray-50 border-b border-gray-200'>
      <ol className='flex items-center gap-1 text-sm max-w-7xl mx-auto flex-wrap'>
        <li>
          <Link
            to='/'
            className='flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors'
            aria-label='Home'
          >
            <HiHome className='w-4 h-4' />
            <span>Home</span>
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.path} className='flex items-center gap-1'>
            <HiChevronRight className='w-4 h-4 text-gray-400' aria-hidden='true' />
            {crumb.isLast ? (
              <span className='text-gray-900 font-medium' aria-current='page'>
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className='text-gray-500 hover:text-blue-600 transition-colors'
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
