'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isActiveSideBar } from '../helper'

type NavComponentProps = {
  groupLabel: string
  list: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}

const NavComponent = ({ groupLabel, list }: NavComponentProps) => {
  const pathName = usePathname()
  const isActive = (url: string) =>
    isActiveSideBar({ pathname: pathName, sidebarUrl: url })

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {list.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton isActive={isActive(item.url)} asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavComponent
