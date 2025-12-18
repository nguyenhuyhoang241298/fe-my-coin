import { allSidebarItems } from './configs'

export const isActiveSideBar = ({
  pathname,
  sidebarUrl,
}: {
  pathname: string
  sidebarUrl: string
}) =>
  !!pathname &&
  !!sidebarUrl &&
  (pathname === sidebarUrl || pathname.startsWith(sidebarUrl))

export const getActiveSidebar = ({ pathname }: { pathname: string }) => {
  const activeSidebar = allSidebarItems.find((sidebar) =>
    isActiveSideBar({ pathname, sidebarUrl: sidebar.url }),
  )

  return activeSidebar ? activeSidebar.name : 'Onus'
}
