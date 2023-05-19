import { CubeTransparentIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { BiTransfer } from 'react-icons/bi';
import { FiExternalLink } from 'react-icons/fi';
import { ImGithub } from 'react-icons/im';
import { IoMdHelpCircle } from 'react-icons/io';
import { IoAnalytics } from 'react-icons/io5';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { RiDashboardFill } from 'react-icons/ri';
import { SiDiscord } from 'react-icons/si';

export const socialsLinks = [
  { text: 'Discord', href: 'https://discord.gg/xp3vFSAMgS', Icon: SiDiscord },
  { text: 'Github', href: 'https://github.com/nymlab/vectis', Icon: ImGithub }
];

export const generalMenu = [
  { text: 'Dashboard', href: '/dashboard', Icon: RiDashboardFill },
  /*  { text: "Address Book", href: "/agenda", Icon: FaRegAddressBook }, */
  { text: 'Transactions', href: '/transactions', Icon: BiTransfer },
  { text: 'Plugins', href: '/plugins', Icon: PuzzlePieceIcon },
  { text: 'Analytics', href: '/analytics', Icon: IoAnalytics }
];

export const protectedRoutes = ['/dashboard', '/transactions', '/plugins', '/settings'];

export const toolsMenu = [
  { text: 'Guardian Explorer', href: '/guardians', Icon: RiSecurePaymentFill },
  /* { text: 'Governance', href: '#', Icon: FiExternalLink }, */
  { text: 'Help & Support', href: 'https://discord.gg/xp3vFSAMgS', Icon: IoMdHelpCircle }
];
