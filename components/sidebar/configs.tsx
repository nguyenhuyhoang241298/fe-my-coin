import {
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react'

export const mockUser = {
  name: 'Admin',
  email: 'admin@goonus.io',
  avatar: '/onus_avatar.png',
}

export const navMain = [
  {
    title: 'Dashboard',
    url: '#',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Lifecycle',
    url: '#',
    icon: ListIcon,
  },
  {
    title: 'Analytics',
    url: '#',
    icon: BarChartIcon,
  },
  {
    title: 'Projects',
    url: '#',
    icon: FolderIcon,
  },
  {
    title: 'Team',
    url: '#',
    icon: UsersIcon,
  },
]

export const navClouds = [
  {
    title: 'Capture',
    icon: CameraIcon,
    isActive: true,
    url: '#',
    items: [
      {
        title: 'Active Proposals',
        url: '#',
      },
      {
        title: 'Archived',
        url: '#',
      },
    ],
  },
  {
    title: 'Proposal',
    icon: FileTextIcon,
    url: '#',
    items: [
      {
        title: 'Active Proposals',
        url: '#',
      },
      {
        title: 'Archived',
        url: '#',
      },
    ],
  },
  {
    title: 'Prompts',
    icon: FileCodeIcon,
    url: '#',
    items: [
      {
        title: 'Active Proposals',
        url: '#',
      },
      {
        title: 'Archived',
        url: '#',
      },
    ],
  },
]

export const navSecondary = [
  {
    title: 'Settings',
    url: '#',
    icon: SettingsIcon,
  },
  {
    title: 'Get Help',
    url: '#',
    icon: HelpCircleIcon,
  },
  {
    title: 'Search',
    url: '#',
    icon: SearchIcon,
  },
]

export const documents = [
  {
    name: 'Data Library',
    url: '#',
    icon: DatabaseIcon,
  },
  {
    name: 'Reports',
    url: '#',
    icon: ClipboardListIcon,
  },
  {
    name: 'Word Assistant',
    url: '#',
    icon: FileIcon,
  },
]
