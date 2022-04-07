import classNames from "classnames";
import Twemoji from "react-twemoji";
import { Location } from "types/globals";
import { Badge } from "./Badge";


export const LocationBadge = (location: Location) => {
  const isConnected = location.host ? true : false;

  return <Badge color={isConnected ? 'green' : 'gray'}>
    <Twemoji noWrapper={true} options={{ folder: 'svg', ext: '.svg', className: 'mx-1 w-[14px] h-[14px]' }}>
      <span className={classNames('inline-flex rounded-full w-2 h-2 mr-1', isConnected ? 'bg-emerald-500' : 'bg-slate-500')}></span>
      <span className='flex flex-row justify-center items-center text-sm'>{isConnected ? location.host : 'Offline'}</span>
      <span className={isConnected ? 'visible' : 'hidden'}>🇫🇷</span>
    </Twemoji>
    <span></span>
  </Badge>
}