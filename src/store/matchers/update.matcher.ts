interface IResource {
  id: string;
}

export const updateOrInsert = <T>(data: Array<IResource & T>, element: IResource & T): Array<IResource & T> => {
  const foundIndex = data.findIndex((el: IResource & T) => el.id === element.id);
  const index = foundIndex === -1 ? data.length : foundIndex;

  return [...data.slice(0, index), element, ...data.slice(index + 1)];
};
