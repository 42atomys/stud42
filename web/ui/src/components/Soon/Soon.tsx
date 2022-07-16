/**
 * Soon is a component that shows a soon animation for part not yet implemented
 */
export const Soon = () => {
  return (
    <div className="text-4xl flex flex-col justify-center items-center w-full h-full bg-grid-400">
      <h1 className="flex font-extrabold justify-center items-center mb-2 z-10">
        <i
          className="fa-duotone fa-forklift fa-bounce fa-2x"
          style={
            {
              '--fa-animation-duration': '1000ms',
              '--fa-primary-color': '#6366f1',
              '--fa-secondary-color': '#6366f1',
            } as React.CSSProperties
          }
        ></i>

        <span className="ml-4 text-indigo-500/50">Under construction</span>
      </h1>
      <small className="text-sm text-slate-500/60 text-center">
        This part is not developed yet. Will be available during the beta phase.{' '}
        <br />
        You can help us by contributing to the idea on Discord.
      </small>
      <a
        href="https://discord.gg/5f864c6hyj"
        target="_blank"
        rel="noopener noreferrer"
        className="my-10 py-4 px-6 rounded-lg text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
      >
        Talk about it on Discord
      </a>
    </div>
  );
};
