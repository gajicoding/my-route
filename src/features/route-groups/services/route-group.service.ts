export const routeGroupService = {
  sortGroups: <T extends { sortOrder: number }>(groups: T[]): T[] => {
    return [...groups].sort((a, b) => a.sortOrder - b.sortOrder);
  },
};
