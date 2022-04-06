import classNames from "classnames";
import { Location } from "types/globals";
import { Badge } from "./Badge";


export const LocationBadge = (location: Location) => {
  const isConnected = location.host ? true : false;

  return <Badge color={isConnected ? 'green' : 'gray'}>
    <span className={classNames('inline-flex rounded-full w-2 h-2 mr-1', isConnected ? 'bg-emerald-500' : 'bg-slate-500')}></span>
    <span className='text-sm'>{isConnected ? location.host : 'Offline'}</span>
  </Badge>
}