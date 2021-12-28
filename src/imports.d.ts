// reacty
declare const React: typeof import('react');
declare const useState: typeof import('react').useState;
declare const useMemo: typeof import('react').useMemo;
declare const useCallback: typeof import('react').useCallback;
declare const useEffect: typeof import('react').useEffect;
declare const useLayoutEffect: typeof import('react').useLayoutEffect;
declare const useRef: typeof import('react').useRef;
type ReactNode = import('react').ReactNode;
type ReactChild = import('react').ReactChild;
type ReactElement<
  P = any,
  T extends string | React.JSXElementConstructor<any> = string | React.JSXElementConstructor<any>
> = import('react').ReactElement<P, T>;
type FunctionComponent<P = {}> = import('react').FunctionComponent<P>;
// react-query
declare const useQuery: typeof import('react-query').useQuery;
declare const useMutation: typeof import('react-query').useMutation;
// react-redux
declare const useSelector: typeof import('react-redux').useSelector;
declare const shallowEqual: typeof import('react-redux').shallowEqual;
// react-router
declare const usePathParams: typeof import('react-router').useParams;
