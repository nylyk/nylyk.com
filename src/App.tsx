import clsx from 'clsx';
import { MouseEvent, useEffect, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { themes } from './data/themes';
import { instances } from './data/instances';
import Instance from './components/Instance';
import Achievement from './components/Achievement';

const App = () => {
  const [themeIndex, setThemeIndex] = useLocalStorage('themeIndex', 0);
  const [themesVisited, setThemesVisited] = useLocalStorage<number[]>(
    'themesVisited',
    new Array(themes.length).fill(0),
  );

  const [achievementGoal, setAchievementGoal] = useLocalStorage(
    'achievementGoal',
    1,
  );
  const [achievementVisible, setAchievementVisible] = useState(false);

  const onClick = (event: MouseEvent) => {
    const element = event.target as HTMLHeadingElement;
    if (!element.classList.contains('animate-spin-once')) {
      setThemeIndex((index) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * themes.length);
        } while (
          newIndex === index ||
          themesVisited[newIndex] >= achievementGoal * 2
        );
        return newIndex;
      });

      element.classList.add('animate-spin-once');
      setTimeout(() => {
        element.classList.remove('animate-spin-once');
      }, 500);
    }
  };

  useEffect(() => {
    const newThemesVisited = [...themesVisited];
    newThemesVisited[themeIndex] += 1;
    setThemesVisited(newThemesVisited);
  }, [themeIndex]);

  useEffect(() => {
    if (themesVisited.findIndex((visits) => visits < achievementGoal) === -1) {
      setAchievementGoal(achievementGoal * 2);

      setAchievementVisible(true);
      setTimeout(() => setAchievementVisible(false), 5000);
    }
  }, [themesVisited]);

  return (
    <div
      className={clsx(
        'w-screen h-screen flex justify-center items-center font-mono font-medium transition-colors duration-500',
        themes[themeIndex],
      )}
    >
      <div className="w-screen max-h-screen overflow-y-auto flex flex-col items-center border-inherit">
        <h1
          className="mt-8 mb-5 text-5xl tracking-tight ease-in-out"
          onClick={onClick}
        >
          nylyk
        </h1>
        <div className="mb-10 flex gap-2">
          ohh, there is something here now
          <div className="text-2xl leading-none hover:-scale-x-100">🧐</div>
        </div>
        <div className="pb-10 flex flex-col gap-4 sm:gap-5 border-inherit">
          {instances.map((instance, i) => (
            <Instance instance={instance} key={i} />
          ))}
        </div>
      </div>
      <Achievement
        visible={achievementVisible}
        achievement={achievementGoal / 2}
      />
    </div>
  );
};

export default App;
