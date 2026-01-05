export const checkMicPermission = async () => {
  try {
    const result = await navigator.permissions.query({
      name: "microphone" as PermissionName,
    });
    return result.state;
  } catch {
    return "prompt";
  }
};
