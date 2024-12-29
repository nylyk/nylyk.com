import { FC } from 'react';
import { Instance as InstanceType } from '../data/instances';
import useStatus from '../hooks/useStatus';
import clsx from 'clsx';

const Instance: FC<{ instance: InstanceType }> = ({ instance }) => {
  const status = useStatus(instance.healthUrl ?? instance.url);

  let title = 'unknown status 🧐';
  if (status === 'up') {
    title = 'online 😎';
  } else if (status === 'down') {
    title = "it's offline 😢";
  }

  return (
    <a
      href={instance.redirectUrl ?? instance.url}
      className="w-screen sm:w-[38rem] border-inherit"
    >
      <div className="flex items-center gap-3 sm:gap-5 mx-3 rounded-lg px-4 py-3 border-2 border-inherit hover:scale-105 transition-transform duration-200">
        <img src={instance.icon} className="h-11 sm:h-14" />
        <div className="flex flex-col gap-1 mr-auto">
          <span className="sm:text-lg font-bold">{instance.name}</span>
          <span className="text-sm sm:text-base sm:text-text">
            {instance.url}
          </span>
        </div>
        <div className="p-2 group" title={title}>
          <div
            className={clsx(
              'w-[0.85rem] h-[0.85rem] rounded-full shadow group-hover:animate-pulse',
              {
                'bg-green': status === 'up',
                'bg-red': status === 'down',
                'bg-overlay2': status === 'unknown',
              },
            )}
          />
        </div>
      </div>
    </a>
  );
};

export default Instance;
