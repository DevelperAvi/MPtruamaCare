export interface MenuItem {
  label: string;
  icon?: string;
  link: string;
  parentId?: number;
  children?: MenuItem[];
  roles?: string[];
}
