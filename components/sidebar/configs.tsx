import {
  BarChartIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  MessageSquare,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react'

export const DEFAULT_USER = {
  name: 'User',
  email: '',
  avatar: '/onus_avatar.png',
}

export const navMain = [
  {
    name: 'Dashboard',
    url: '#',
    icon: LayoutDashboardIcon,
  },
  {
    name: 'Chat',
    url: '/chat',
    icon: MessageSquare,
  },
  {
    name: 'Analytics',
    url: '#',
    icon: BarChartIcon,
  },
  {
    name: 'Projects',
    url: '#',
    icon: FolderIcon,
  },
  {
    name: 'Team',
    url: '#',
    icon: UsersIcon,
  },
]

export const navSecondary = [
  {
    name: 'Settings',
    url: '/settings',
    icon: SettingsIcon,
  },
  {
    name: 'Get Help',
    url: '#',
    icon: HelpCircleIcon,
  },
  {
    name: 'Search',
    url: '#',
    icon: SearchIcon,
  },
]

export const allSidebarItems = [...navMain, ...navSecondary]
