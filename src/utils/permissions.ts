export interface UserPermissions {
  canViewDashboard: boolean;
  canViewAnalytics: boolean;
  canViewCustomers: boolean;
  canEditCustomers: boolean;
  canViewDistributors: boolean;
  canEditDistributors: boolean;
  canViewInventory: boolean;
  canEditInventory: boolean;
  canViewOrders: boolean;
  canEditOrders: boolean;
  canViewLogistics: boolean;
  canEditLogistics: boolean;
  canViewIntelligence: boolean;
  canExportData: boolean;
  canManageUsers: boolean;
  canViewSettings: boolean;
}

export const ROLE_PERMISSIONS: Record<string, UserPermissions> = {
  admin: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewCustomers: true,
    canEditCustomers: true,
    canViewDistributors: true,
    canEditDistributors: true,
    canViewInventory: true,
    canEditInventory: true,
    canViewOrders: true,
    canEditOrders: true,
    canViewLogistics: true,
    canEditLogistics: true,
    canViewIntelligence: true,
    canExportData: true,
    canManageUsers: true,
    canViewSettings: true
  },
  manager: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewCustomers: true,
    canEditCustomers: true,
    canViewDistributors: true,
    canEditDistributors: true,
    canViewInventory: true,
    canEditInventory: true,
    canViewOrders: true,
    canEditOrders: true,
    canViewLogistics: true,
    canEditLogistics: true,
    canViewIntelligence: true,
    canExportData: true,
    canManageUsers: false,
    canViewSettings: true
  },
  analyst: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewCustomers: true,
    canEditCustomers: false,
    canViewDistributors: true,
    canEditDistributors: false,
    canViewInventory: true,
    canEditInventory: false,
    canViewOrders: true,
    canEditOrders: false,
    canViewLogistics: true,
    canEditLogistics: false,
    canViewIntelligence: true,
    canExportData: true,
    canManageUsers: false,
    canViewSettings: true
  },
  user: {
    canViewDashboard: true,
    canViewAnalytics: false,
    canViewCustomers: true,
    canEditCustomers: false,
    canViewDistributors: true,
    canEditDistributors: false,
    canViewInventory: true,
    canEditInventory: false,
    canViewOrders: true,
    canEditOrders: false,
    canViewLogistics: false,
    canEditLogistics: false,
    canViewIntelligence: false,
    canExportData: false,
    canManageUsers: false,
    canViewSettings: true
  },
  trial: {
    canViewDashboard: true,
    canViewAnalytics: false,
    canViewCustomers: true,
    canEditCustomers: false,
    canViewDistributors: true,
    canEditDistributors: false,
    canViewInventory: false,
    canEditInventory: false,
    canViewOrders: false,
    canEditOrders: false,
    canViewLogistics: false,
    canEditLogistics: false,
    canViewIntelligence: false,
    canExportData: false,
    canManageUsers: false,
    canViewSettings: false
  }
};

export function getUserPermissions(role: string): UserPermissions {
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.user;
}

export function canAccessPage(role: string, page: string): boolean {
  const permissions = getUserPermissions(role);

  const pagePermissionMap: Record<string, keyof UserPermissions> = {
    dashboard: 'canViewDashboard',
    analytics: 'canViewAnalytics',
    crm: 'canViewCustomers',
    distributors: 'canViewDistributors',
    inventory: 'canViewInventory',
    logistics: 'canViewLogistics',
    intelligence: 'canViewIntelligence',
    settings: 'canViewSettings'
  };

  const permissionKey = pagePermissionMap[page];
  return permissionKey ? permissions[permissionKey] : true;
}
