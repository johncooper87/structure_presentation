let hasTopbarChildTreeRenders = false;
let lastTopbarHeight = null;
let lastFabContainerHeight = null;

function updateTopbar() {
  const fabContainerHeight = document.getElementById('fab-container').clientHeight;
  if (lastFabContainerHeight !== fabContainerHeight) {
    lastFabContainerHeight = fabContainerHeight;
    const topbarExtraHeight = fabContainerHeight / 2;
    document.body.style.setProperty('--topbar-extra-height', topbarExtraHeight + 'px');
  }

  const { height: topbarHeight } = document.getElementById('topbar').getBoundingClientRect();
  if (lastTopbarHeight !== topbarHeight) {
    lastTopbarHeight = topbarHeight;
    document.body.style.setProperty('--topbar-base-height', topbarHeight + 'px');
  }
}

const _updateTopbar = () => {
  if (hasTopbarChildTreeRenders) {
    hasTopbarChildTreeRenders = false;
    updateTopbar();
  }
};

function useTopbarUpdater() {
  hasTopbarChildTreeRenders = true;
  useLayoutEffect(_updateTopbar);
}

export default useTopbarUpdater;
