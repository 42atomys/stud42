import { NoticeColor, useReadNoticeMutation } from '@graphql.d';
import classNames from 'classnames';
import { useState } from 'react';
import { NoticeProps } from './types';

export const Notice: React.FC<NoticeProps> = ({ notice }) => {
  const { message, icon: iconClassName, color } = notice;
  const [readed, setReaded] = useState(false);
  const [readNotice] = useReadNoticeMutation({
    variables: { noticeID: notice.id },
  });

  const setAsRead = async (read: boolean) => {
    if (read) {
      // send read notice mutation to the server on background
      // to avoid delay on UI
      readNotice({ refetchQueries: ['Me'] });
    }
    setReaded(read);
  };

  if (readed) {
    return null;
  }

  const colorsClassname = {
    INFO: 'from-indigo-500 to-indigo-600',
    WARNING: 'from-orange-500 to-orange-600',
    DANGER: 'from-red-500 to-red-600',
    SUCCESS: 'from-green-500 to-teal-600',
    BLACK: 'from-black to-slate-950',
  } satisfies { [key in NoticeColor]: string };

  return (
    <div
      className={classNames(
        'w-[call(100%_-_0.5rem)] bg-gradient-to-r text-white z-50 m-1 px-4 py-2 rounded-md',
        colorsClassname[color || NoticeColor.BLACK]
      )}
    >
      <div className="container mx-auto flex justify-between">
        <span className="flex items-center justify-center">
          {iconClassName && (
            <i className={classNames('fa-light fa-fw', iconClassName)}></i>
          )}
          <span className="ml-3">{message}</span>
        </span>
        <button onClick={() => setAsRead(true)} className="text-white">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
