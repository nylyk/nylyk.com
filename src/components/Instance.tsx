import { FC, useEffect, useRef } from 'react';
import { Instance as InstanceType } from '../data/instances';
import useStatus from '../hooks/useStatus';
import clsx from 'clsx';

const Instance: FC<{ instance: InstanceType; color: string }> = ({
  instance,
  color,
}) => {
  const iconRef = useRef<HTMLObjectElement>(null);

  const status = useStatus(instance.healthUrl ?? instance.url);

  let title = 'unknown status 🧐';
  if (status === 'up') {
    title = 'online 😎';
  } else if (status === 'down') {
    title = "it's offline 😢";
  }

  const setIconColor = (first: boolean) => {
    if (iconRef.current) {
      const svg = iconRef.current.getSVGDocument();
      if (svg) {
        if (!first) {
          svg.documentElement.style.transition = 'fill 0.5s';
        }
        svg.documentElement.style.fill = color;
      }
    }
  };

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.onload = () => {
        setIconColor(true);
      };
    }
  }, [iconRef.current]);

  useEffect(() => {
    setIconColor(false);
  }, [color]);

  return (
    <a
      href={instance.redirectUrl ?? instance.url}
      className="w-screen sm:w-[38rem] border-inherit"
    >
      <div className="flex items-center gap-3 sm:gap-5 mx-5 rounded-lg px-4 py-3 border-2 border-inherit hover:scale-105 transition-transform duration-200">
        <object
          className="h-11 sm:h-14"
          type="image/svg+xml"
          data={instance.icon}
          ref={iconRef}
        />
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
