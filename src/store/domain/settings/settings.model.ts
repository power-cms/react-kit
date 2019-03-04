export interface IRoute {
  id: string;
  url: string;
  title: string;
}

export interface ISettings {
  title: string;
  routes: IRoute[];
}
