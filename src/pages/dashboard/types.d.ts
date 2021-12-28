interface GridItemSizeLimit {
  maxWidth?: number;
  minWidth?: number;
  maxHeight?: number;
  minHeight?: number;
}

interface GridItemLayout {
  left: number;
  top: number;
  width: number;
  height: number;
}

type ResponsiveValues<T> = Partial<Record<string, T>>;
type GridItemDefaultLayouts = ResponsiveValues<Partial<GridItemLayout>>;
type GridItemLayouts = ResponsiveValues<GridItemLayout>;
type GridItemSizeLimits = ResponsiveValues<GridItemSizeLimit>;

type ResonsiveGridDefaultLayouts = Partial<Record<string, GridItemDefaultLayouts>>;
type ResonsiveGridLayouts = Partial<Record<string, GridItemLayouts>>;
type ResonsiveGridSizeLimits = Partial<Record<string, GridItemSizeLimits>>;
