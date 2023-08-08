/**
 * This module defines types and interfaces for dashboard components, including headers and sidebars.
 * It provides structures for header icons, header links, sidebar items, and sidebar sections.
 */

/**
 * Represents an icon in the dashboard's header.
 */
export type HeaderIcon = {
  /** The name or path of the icon. */
  icon: string;
  /** The callback function to be executed when the icon is clicked. */
  onClick: (...args: any[]) => void;
}

/**
 * Represents a link in the dashboard's header.
 */
export type HeaderLink = {
  /** The label of the link. */
  label: string;
  /** The callback function to be executed when the link is clicked. */
  onClick: (...args: any[]) => void;
}

/**
 * Represents an individual item in the dashboard's sidebar.
 */
export type SidebarItem = {
  /** The icon component associated with the sidebar item. This is optional. */
  icon?: React.ReactNode;
  /** The text label of the sidebar item. */
  text: string;
  /** The callback function to be executed when the sidebar item is clicked. */
  onClick: (...args: any[]) => void;
}

/**
 * Represents a section in the dashboard's sidebar.
 * Each section can contain multiple sidebar items.
 */
export interface SidebarSection {
  /** The title of the sidebar section. */
  title: string;
  /** An array of items within the sidebar section. */
  items: SidebarItem[];
}
