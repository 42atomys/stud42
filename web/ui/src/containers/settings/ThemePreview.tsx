import classNames from 'classnames';

export const ThemePreview = ({
  themeName,
  active = false,
}: {
  themeName: 'auto' | 'dark' | 'light';
  active?: boolean;
}) => {
  const themes = {
    dark: {
      body: 'text-slate-400 bg-slate-800/60',
      sidebar: 'text-slate-400 bg-slate-900/80',
      subSidebar: 'bg-slate-800/40',
      content: '',
      placeholder: 'bg-slate-600',
    },
    light: {
      body: 'text-slate-600 bg-slate-100',
      sidebar: 'text-slate-600 bg-slate-200',
      subSidebar: 'bg-slate-100/60',
      content: '',
      placeholder: 'bg-slate-400',
    },
  };

  let autoTheme: 'dark' | 'light' = 'dark'; // Fallback to dark theme if auto theme is not available
  if (themeName === 'auto' && typeof window !== 'undefined') {
    autoTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  const theme = themeName === 'auto' ? themes[autoTheme] : themes[themeName];

  return (
    <div
      className={classNames(
        'rounded-md overflow-hidden group border transition-all ring cursor-pointer',
        'border-slate-300 dark:border-slate-700',
        active
          ? 'ring-indigo-500'
          : 'ring-transparent hover:ring-1 hover:ring-indigo-500 hover:border-indigo-500',
      )}
    >
      <div className={classNames({ 'bg-slate-900': themeName !== 'light' })}>
        <div className={classNames('flex w-[200px] h-[100px]', theme.body)}>
          <div className={classNames('flex flex-row', theme.sidebar)}>
            <div
              className={classNames('w-[15px] h-[100px]', theme.sidebar)}
            ></div>
            <div
              className={classNames('w-[30px] h-[100px]', theme.subSidebar)}
            ></div>
          </div>
          <div
            className={classNames('flex-1 flex space-x-4 p-4', theme.content)}
          >
            <div className="flex-1 space-y-4 py-1">
              <div className="flex space-x-4 items-center">
                <div
                  className={classNames('w-4 h-4 rounded', theme.placeholder)}
                ></div>
                <div
                  className={classNames('w-4 h-4 rounded', theme.placeholder)}
                ></div>
                <div
                  className={classNames(
                    'h-2 rounded flex-1',
                    theme.placeholder,
                  )}
                ></div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={classNames(
                      'h-2 rounded col-span-2',
                      theme.placeholder,
                    )}
                  ></div>
                  <div
                    className={classNames(
                      'h-2 rounded col-span-1',
                      theme.placeholder,
                    )}
                  ></div>
                </div>
                <div
                  className={classNames('h-2 rounded', theme.placeholder)}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start items-center p-2">
        {(active && (
          <i
            key="theme-preview-active"
            className="fa-regular fa-circle-check fa-fw text-indigo-500 pr-2"
          ></i>
        )) || (
          <i
            key="theme-preview-inactive"
            className="fa-regular fa-circle fa-fw group-hover:text-indigo-500 pr-2"
          ></i>
        )}
        <p className="first-letter:capitalize text-sm">{themeName} theme</p>
      </div>
    </div>
  );
};
