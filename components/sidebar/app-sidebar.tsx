'use client'

import * as React from 'react'

import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'
import NavComponent from './components/NavComponent'
import { navMain, navSecondary } from './configs'
import Header from './header'
import { NavUser } from './nav-user'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <Header />

      <SidebarContent>
        <NavComponent groupLabel="Main" list={navMain} />
        <NavComponent groupLabel="Secondary" list={navSecondary} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
