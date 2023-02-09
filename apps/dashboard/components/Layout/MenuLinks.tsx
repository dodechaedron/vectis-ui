import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useVectis } from 'providers';
import { generalMenu, toolsMenu } from 'utils/links';
import Link from 'next/link';

import { FiExternalLink } from 'react-icons/fi';

interface Props {
  closeMenu: () => void;
}

const MenuLinks: React.FC<Props> = ({ closeMenu }) => {
  const { pathname } = useRouter();
  const { account, userAddr } = useVectis();
  const links = useMemo(
    () =>
      generalMenu.filter((l) => {
        const dashboard = l.href === '/dashboard';
        if (!dashboard) return true;
        return account?.controller_addr === userAddr;
      }),
    [userAddr, account]
  );

  return (
    <div className="flex w-full flex-col p-4">
      <p className="mb-4 text-xs font-medium text-gray-400">General</p>
      <ul className="w-full space-y-1" aria-label="Sidebar">
        {links.map((item) => {
          const path = pathname.slice(1);
          const isActive = item.href === pathname || path.includes(item.href);
          return (
            <li key={item.text}>
              <Link
                href={item.href}
                onClick={closeMenu}
                className={clsx(
                  isActive ? 'bg-gray-100 text-kashmir-blue-500' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium'
                )}
              >
                <item.Icon
                  className={clsx(
                    isActive ? 'text-kashmir-blue-500' : 'text-gray-400 group-hover:text-kashmir-blue-500',
                    '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.text}</span>
                {item.href.includes('plugins') && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-kashmir-blue-100 px-2.5 py-0.5 text-xs font-medium text-kashmir-blue-800">
                    Soon
                  </span>
                )}
              </Link>
            </li>
          );
        })}
        <li>
          <a
            className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            target="_blank"
            href="https://dao.vectis.xyz"
            onClick={closeMenu}
            rel="noreferrer"
          >
            <FiExternalLink className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-kashmir-blue-500" aria-hidden="true" />
            <span className="truncate">Governance</span>
          </a>
        </li>
      </ul>
      <span className="my-5 h-[1px] w-full bg-gray-300" />
      <p className="mb-4 text-xs font-medium text-gray-400">Tools</p>
      <ul className="w-full space-y-1" aria-label="Sidebar">
        {toolsMenu.map((item) => {
          const isActive = pathname.includes(item.href);
          return (
            <li key={item.text}>
              <Link
                href={item.href}
                target="_blank"
                onClick={closeMenu}
                className={clsx(
                  isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.Icon
                  className={clsx(isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-1 mr-3 h-6 w-6 flex-shrink-0')}
                  aria-hidden="true"
                />
                <span className="truncate">{item.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuLinks;
