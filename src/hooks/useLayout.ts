// import { useMediaQuery, Theme } from '@material-ui/core';

export function getLayout(size: number) {
  if (size < 960) return 'mobile';
  if (size >= 1280) return 'desktop';
  return 'tablet';
}

declare global {
  type Layout = ReturnType<typeof getLayout>;
}

export default function useLayout() {
  // const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  // const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  // if (isMobile) return 'mobile';
  // if (isDesktop) return 'desktop';
  // return 'tablet';

  const [layout, setLayout] = useState<Layout>(getLayout(window.innerWidth));
  useEffect(() => {
    const callback = () => setLayout(getLayout(window.innerWidth));
    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);
  return layout;
}
