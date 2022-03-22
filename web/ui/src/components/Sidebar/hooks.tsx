import classNames from 'classnames';
import { Sidebar } from './Sidebar';
import { SidebarProvider } from './SidebarProvider';

/**
 * useSidebar hook. This is used to give all context to use the sidebar
 * component correctly. 
 */
export const useSidebar = () => {
  return {
    SidebarProvider,
    Sidebar,
    PageContent: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }): JSX.Element => (
      <div className={classNames('flex-auto', className)}>{children}</div>
    ),
    PageContainer: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }): JSX.Element => (
      <div className={classNames('flex', 'flex-col', 'md:flex-row', className)}>
        {children}
      </div>
    ),
  };
};

export default useSidebar;
