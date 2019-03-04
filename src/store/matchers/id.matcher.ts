interface IResource {
  id: string;
}

export const matchId = (data: IResource[], id: string): IResource | undefined =>
  data.find(element => element.id === id);
