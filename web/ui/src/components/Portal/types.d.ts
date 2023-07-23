type PortalProps = PortalInstance & {
  singleton?: boolean;
};

type PortalInstance = {
  // The DOM id of the portal
  portalDOMId: string;
  key?: string;
};
