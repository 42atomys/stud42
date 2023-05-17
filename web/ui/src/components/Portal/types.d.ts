type PortalProps = PortalInstance & {
  singleton?: boolean;
};

type PortalInstance = {
  portalId: string;
  key?: string;
};
