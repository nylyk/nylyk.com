import { FC } from 'react';
import { Instance as InstanceType } from '../data/instances';

const Instance: FC<{ instance: InstanceType }> = ({ instance }) => {
  return (
    <a href={instance.url} className="w-screen sm:w-[35rem] border-inherit">
      <div className="flex items-center gap-3 sm:gap-5 mx-6 rounded-lg px-4 py-3 border-2 border-inherit hover:scale-105 transition-transform duration-200">
        <img src={instance.icon} className="h-11 sm:h-14" />
        <div className="flex flex-col">
          <span className="text-lg font-bold">{instance.name}</span>
          <span>{instance.url}</span>
        </div>
      </div>
    </a>
  );
};

export default Instance;
