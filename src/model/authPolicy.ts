const PERMISSIONS = {
  viewer: ["view:post"],
  editor: ["view: post", "create:post", "edit:post"],
  admin: ["view: post", "create:post", "edit:post", "delete:post"],
};
export const checkPermission = (user, action, resource) => {
  const permissions = PERMISSIONS[user.role];
  if (!permissions) return false;
  return permissions.includes(`${action}:${resource}`);
};
export default checkPermission;