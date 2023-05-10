import React from 'react';
import clsx from 'clsx';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const Hamburguer: React.FC<Props> = ({ isOpen, toggle }) => {
  return (
    <div
      className={clsx(
        'group flex h-[20px] w-[20px] origin-center transform cursor-pointer flex-col justify-between transition-all duration-300',
        { '-rotate-[45deg]': isOpen }
      )}
      onClick={toggle}
    >
      <div
        className={clsx('h-[3px] w-1/2 origin-right transform rounded-lg bg-black transition-all delay-75 duration-300', {
          '!h-[2px] -translate-y-[1px] -rotate-90': isOpen
        })}
      />
      <div className={clsx('h-[2px] rounded-lg bg-black', isOpen ? 'h-[1px]' : '')} />
      <div
        className={clsx('group h-[3px] w-1/2 origin-left transform self-end rounded-lg bg-black transition-all delay-75 duration-300', {
          '!h-[2px] translate-y-[1px] -rotate-90': isOpen
        })}
      ></div>
    </div>
  );
};

export default Hamburguer;
