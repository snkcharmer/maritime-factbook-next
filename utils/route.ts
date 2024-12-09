import { ROUTES } from '@/constants';
import { TRoute, TAdminRoute } from '@/types';

type TRouteArgsWithParams = Extract<
  TRoute | TAdminRoute,
  { path: any; dynamicParams: any }
>;

export const isPathDynamic = (name: string) => {
  return name.includes('[') || name.includes(']');
};

export const formatPathName = (pathName: string) => {
  if (isPathDynamic(pathName)) {
    return pathName
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace('[', '')
      .replace(']', '')
      .split(' ')[0];
  }

  return pathName.replace(/-/g, ' ');
};

export function createPath(args: TRoute | TAdminRoute): string {
  let path: string = args.path;
  if (args.hasOwnProperty('dynamicParams')) {
    path = Object.entries((args as TRouteArgsWithParams).dynamicParams).reduce(
      (previousValue: string, [param, value]) =>
        previousValue.replace(`[${param}]`, '' + value),
      args.path
    );
  }

  if (args.hasOwnProperty('queryParams')) {
    const query = new URLSearchParams((args as any).queryParams);
    const queryString = query.toString();
    path = `${path}?${queryString}`;
  }

  return path;
}

export { ROUTES };
